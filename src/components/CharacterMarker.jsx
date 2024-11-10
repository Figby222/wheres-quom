import PropTypes from "prop-types";

const CharacterMarker = ({ coordinates }) => {
    return (
        <>
            <div role="charactermarker" style={{ 
                position: "absolute", 
                left: `${coordinates.x}px`, 
                top: `${coordinates.y}px`, 
                width: "10px", 
                height: "10px" 
            }}></div>
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