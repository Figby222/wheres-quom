import PropTypes from "prop-types";
import { useState } from "react";
import TargetBox from "./TargetBox.jsx";
import CharacterMarker from "./CharacterMarker.jsx";
import { getCoordinateAsPercentageOfElementLength } from "../util/MainImageUtils.jsx";

const MainImage = ({ useAllData, selectCharacterPositionPost }) => {
    const { error, loading, data } = useAllData();
    const [ targetBoxCoordinates, setTargetBoxCoordinates ] = useState(null);
    const [ isCharacterMarkerVisible, setIsCharacterMarkerVisible ] = useState(false);

    if (loading) {
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
            setIsCharacterMarkerVisible(true);
        }
    }

    return (
        <>
            <img src="" alt={data.imageAlt} onClick={onImageClick} />
            { isCharacterMarkerVisible && <CharacterMarker coordinates={{ x: "20px", y: "7.68px" }} characterId={4} size={"10%"} />  }
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
}

export default MainImage;