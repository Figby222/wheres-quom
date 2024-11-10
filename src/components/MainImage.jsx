import PropTypes from "prop-types";
import { useState } from "react";
import TargetBox from "./TargetBox.jsx";

const MainImage = ({ useAllData, selectCharacterPositionPost }) => {
    const { error, loading, data } = useAllData();
    const [ targetBoxCoordinates, setTargetBoxCoordinates ] = useState(null);

    if (loading) {
        return (<p className="loading">Loading...</p>)
    }

    const onImageClick = (e) => {
        e.preventDefault();

        setTargetBoxCoordinates({ x: e.clientX, y: e.clientY })
    }

    return (
        <>
            <img src="" alt={data.imageAlt} onClick={onImageClick} />
            <section className="character-selection">
                { 
                    targetBoxCoordinates && 
                    <>
                        <TargetBox coordinates={targetBoxCoordinates} size="" /> 
                        <ul className="character-selection-ul">
                            { data.characters.map((character) => {
                                return <li key={character.id} className="select-character">
                                    { character.name }
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