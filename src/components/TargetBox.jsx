import PropTypes from "prop-types";

const TargetBox = ({ coordinates, size }) => {
    return (
        <>
            <div className="target-box" role="targetbox" 
                style={{ position: "absolute", left: `${coordinates.x}px`, top: "4px" }}></div>
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