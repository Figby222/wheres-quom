import PropTypes from "prop-types";

const CharacterMarker = ({ coordinates }) => {
    return (
        <>
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