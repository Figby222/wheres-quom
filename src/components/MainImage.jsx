import PropTypes from "prop-types";
import { useState } from "react";
import TargetBox from "./TargetBox.jsx";

const MainImage = ({ useAllData, selectCharacterPositionPost }) => {
    const { error, loading, data } = useAllData();
    const [ isTargetBoxVisible, setIsTargetBoxVisible ] = useState(false);

    if (loading) {
        return (<p className="loading">Loading...</p>)
    }

    const onImageClick = (e) => {
        e.preventDefault();

        setIsTargetBoxVisible(!isTargetBoxVisible);
    }

    return (
        <>
            <img src="" alt={data.imageAlt} onClick={onImageClick} />
            <section className="character-selection">
                { isTargetBoxVisible && <TargetBox coordinates={{ x: 4, y: 4 }} size="" /> }
                <ul className="character-selection-ul">
                    { data.characters.map((character) => {
                        return <li key={character.id} className="select-character">
                            { character.name }
                        </li>
                    })}
                </ul>
            </section>
        </>
    )
};

MainImage.propTypes = {
    useAllData: PropTypes.func.isRequired,
    selectCharacterPositionPost: PropTypes.func.isRequired,
}

export default MainImage;