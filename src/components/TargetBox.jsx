import PropTypes from "prop-types";

const TargetBox = ({ coordinates }) => {
    return (
        <>
            <div className="target-box" role="targetbox"></div>
        </>
    )
};

TargetBox.propTypes = {
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    })
}
export default TargetBox;