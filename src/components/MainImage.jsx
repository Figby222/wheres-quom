import PropTypes from "prop-types";

const MainImage = ({ useAllData, selectCharacterPositionPost }) => {
    const { error, loading, data } = useAllData();

    if (loading) {
        return (<p className="loading">Loading...</p>)
    }
    
    return (
        <>
        </>
    )
};

MainImage.propTypes = {
    useAllData: PropTypes.func.isRequired,
    selectCharacterPositionPost: PropTypes.func.isRequired,
}

export default MainImage;