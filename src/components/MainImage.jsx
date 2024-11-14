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
    console.log("11:11");

    if (loading) {
        console.log("Loading");
        return (<p className="loading">Loading...</p>)
    }

    const onImageClick = (e) => {
        e.preventDefault();

        setTargetBoxCoordinates({ x: e.clientX, y: e.clientY })
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
            <dialog open={userDidWin}>
                <form method="PUT">
                    <label htmlFor="name">
                        Name:
                        <input type="text" name="name" id="name" />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </dialog>
            <img src="" alt={data.imageAlt} onClick={onImageClick} useMap={"main_image"} />
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