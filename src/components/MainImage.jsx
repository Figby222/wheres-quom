import PropTypes from "prop-types";
import { useState } from "react";
import TargetBox from "./TargetBox.jsx";
import CharacterMarker from "./CharacterMarker.jsx";
import { getCoordinateAsPercentageOfElementLength, getCoordinateFromLengthPercentage } from "../util/MainImageUtils.jsx";

const MainImage = ({ useAllData, selectCharacterPositionPost, submitScorePut }) => {
    const { error, loading, data } = useAllData();
    const [ targetBoxCoordinates, setTargetBoxCoordinates ] = useState(null);
    const [ characterMarkers, setCharacterMarkers ] = useState([]);
    const [ userDidWin, setUserDidWin ] = useState(false);
    const [ userName, setUserName ] = useState("");
    console.log("11:11");
    const [ leaderboardPlayers, setLeaderboardPlayers ] = useState(data && data.leaderboardPlayers ? data.leaderboardPlayers : []);
    const [ isLeaderboardVisible, setIsLeaderboardVisible ] = useState(false);

    if (loading) {
        console.log("Loading");
        return (<p className="loading">Loading...</p>)
    }

    const onImageClick = (e) => {
        e.preventDefault();

        setTargetBoxCoordinates({ x: e.clientX, y: e.clientY })
    }

    const onWinnerFormSubmission = async (e) => {
        e.preventDefault();
        
        submitScorePut(userName);
        setIsLeaderboardVisible(true);
    }

    const onCharacterPositionSubmission = (e, characterId) => {
        e.preventDefault();

        const { x, y } = targetBoxCoordinates;

        const imageRect = e.target.getBoundingClientRect();

        const imageOffsetX = imageRect.left;
        const imageOffsetY = imageRect.top;

        const xCoordinateAsPercentageOfImageWidth =
            getCoordinateAsPercentageOfElementLength(
                x, imageOffsetX, imageRect.width
            );
        const yCoordinateAsPercentageOfImageHeight = 
            getCoordinateAsPercentageOfElementLength(
                y, imageOffsetY, imageRect.height
            );
        
        const response = selectCharacterPositionPost(characterId, {
            x: xCoordinateAsPercentageOfImageWidth,
            y: yCoordinateAsPercentageOfImageHeight
        });

        console.log(response);

        if (response.success) {
            console.log(response.success);
            const xCoordinateWithinImage = getCoordinateFromLengthPercentage(
                parseInt(response.coordinates.x.replace("%", "")),
                imageRect.width
            )

            console.log(xCoordinateWithinImage);

            const yCoordinateWithinImage = getCoordinateFromLengthPercentage(
                parseInt(response.coordinates.y.replace("%", "")),
                imageRect.height
            )
            setCharacterMarkers([
                ...characterMarkers,
                { 
                    characterId: response.characterId, 
                    x: xCoordinateWithinImage, 
                    y: yCoordinateWithinImage, 
                }
            ])
        }

        if (response.highScore !== undefined) {
            setUserDidWin(true);
        }
    }

    return (
        <>
        {
            isLeaderboardVisible &&
            <section className="leaderboard" aria-label="leaderboard">
                <ul>
                    {
                        leaderboardPlayers.map((player) => {
                            return <li key={player.id}>
                                { player.completionTime }
                            </li>
                        })
                    }
                </ul>
            </section>
        }a
            <dialog open={userDidWin} hidden={!userDidWin}>
                <form method="PUT" onSubmit={onWinnerFormSubmission} hidden={!userDidWin}>
                    <label htmlFor="name" hidden={!userDidWin}>
                        Name:
                        <input type="text" name="name" id="name" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            hidden={!userDidWin} 
                        />a
                    </label>
                    <button type="submit" hidden={!userDidWin}>Submit</button>
                </form>a
            </dialog>
            <img src="" alt={data.imageAlt} onClick={onImageClick} useMap={"main_image"} />
                <map name="main_image">
                    a{
                        characterMarkers.map((characterMarker) => {
                            return <CharacterMarker
                                coordinates={{ 
                                    x: `${characterMarker.x}px`,
                                    y: `${characterMarker.y}px`
                                }}
                                characterId={characterMarker.characterId}
                                size={"10%"}
                            />
                        })
                    }
                </map>a
                <section className="character-selection">
                    a{ 
                        targetBoxCoordinates && 
                        <>
                            <TargetBox coordinates={targetBoxCoordinates} size="" /> 
                            <ul className="character-selection-ul">
                                { data.characters.map((character) => {
                                    return <li key={character.id} className="select-character">
                                        <button type="button" onClick={(e) => onCharacterPositionSubmission(e, character.id)}>
                                            { character.name }
                                        </button>
                                    </li>
                                })}
                            </ul>
                        </>
                    }a
                </section>
            </>
    )
};

MainImage.propTypes = {
    useAllData: PropTypes.func.isRequired,
    selectCharacterPositionPost: PropTypes.func.isRequired,
    submitScorePut: PropTypes.func.isRequired,
}

export default MainImage;