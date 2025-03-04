import PropTypes from "prop-types";
import { useState } from "react";
import TargetBox from "./TargetBox.jsx";
import CharacterMarker from "./CharacterMarker.jsx";
import { getCoordinateAsPercentageOfElementLength, getCoordinateFromLengthPercentage } from "../util/MainImageUtils.jsx";

const MainImage = ({ useAllData, selectCharacterPositionPost, submitScorePut }) => {
    const { error, loading, data } = useAllData("http://localhost:6464/api/v1/play");
    const [ targetBoxCoordinates, setTargetBoxCoordinates ] = useState(null);
    const [ characterMarkers, setCharacterMarkers ] = useState([]);
    const [ userDidWin, setUserDidWin ] = useState(false);
    const [ userName, setUserName ] = useState("");
    console.log("11:11");
    const [ leaderboardPlayers, setLeaderboardPlayers ] = useState(data && data.leaderboardPlayers ? data.leaderboardPlayers : []);
    const [ isLeaderboardVisible, setIsLeaderboardVisible ] = useState(false);
    const [ gameError, setGameError ] = useState(null);

    if (loading) {
        console.log("Loading");
        return (<p className="loading">Loading...</p>)
    }

    console.log(data);

    const onImageClick = (e) => {
        e.preventDefault();

        setTargetBoxCoordinates({ x: e.clientX, y: e.clientY })
    }

    const onWinnerFormSubmission = async (e) => {
        e.preventDefault();
        
        const response = submitScorePut(userName);

        if (response.status === 403) {
            setGameError("You must finish the game before submitting your score");
            return;
        }

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
        <section>
            <p>{ gameError }</p>
        </section>
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
                <form method="PUT" onSubmit={onWinnerFormSubmission} hidden={!userDidWin} aria-label="winner form">
                    <p>Test Form Error Message</p>
                    <label htmlFor="name" hidden={!userDidWin}>
                        Name:
                        <input type="text" name="name" id="name" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            hidden={!userDidWin} 
                        />a
                    </label>
                    <button type="submit" hidden={!userDidWin}>Submit</button>
                </form>
            </dialog>
            <img src={data.imageSrc} alt={"Where's Waldo Image"} onClick={onImageClick} useMap={"main_image"} />
                <map name="main_image">
                    {
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
                </map>
                <section className="character-selection">
                    { 
                        targetBoxCoordinates && 
                        <>
                            <TargetBox coordinates={targetBoxCoordinates} size="10px" /> 
                            <ul className="character-selection-ul" style={{
                                position: "absolute",
                                left: `${targetBoxCoordinates.x}px`,
                                top: `${targetBoxCoordinates.y + 10}px`,
                            }}>
                                { data.characters.map((character) => {
                                    return <li key={character.id} className="select-character">
                                        <button type="button" onClick={(e) => onCharacterPositionSubmission(e, character.id)}>
                                            { character.name }
                                        </button>
                                    </li>
                                })}
                            </ul>
                        </>
                    }
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