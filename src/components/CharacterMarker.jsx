import PropTypes from "prop-types";

const CharacterMarker = ({ coordinates, size }) => {
    return (
        <>
            <div role="charactermarker" style={{ 
                position: "absolute", 
                left: `${coordinates.x}px`, 
                top: `${coordinates.y}px`, 
                width: size, 
                height: size 
            }}></div>
        </>
    )
};
CharacterMarker.propTypes = {
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    size: PropTypes.string.isRequired,
}

export default CharacterMarker;