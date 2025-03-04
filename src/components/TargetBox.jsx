import PropTypes from "prop-types";

const TargetBox = ({ coordinates, size }) => {
    return (
        <>
            <div className="target-box" role="targetbox" style={{ 
                    position: "absolute", 
                    left: `${coordinates.x}px`, 
                    top: `${coordinates.y}px`, 
                    width: size, 
                    height: size ,
                    border: "2px solid red"
                    }}></div>
        </>
    )
};

TargetBox.propTypes = {
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    size: PropTypes.string.isRequired,
}
export default TargetBox;