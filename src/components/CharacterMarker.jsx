import PropTypes from "prop-types";

const CharacterMarker = ({ coordinates }) => {
    return (
        <>
            <div role="charactermarker" style={{ position: "absolute", left: "6px" }}></div>
        </>
    )
};

CharacterMarker.propTypes = {
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    })
}

export default CharacterMarker;