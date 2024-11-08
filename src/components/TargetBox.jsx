import PropTypes from "prop-types";

const TargetBox = ({ coordinates }) => {
    return (
        <>
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