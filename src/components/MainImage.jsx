import PropTypes from "prop-types";

const MainImage = ({ useAllData, selectCharacterPositionPost }) => {
    const { error, loading, data } = useAllData();

    if (loading) {
        return (<p className="loading">Loading...</p>)
    }

    return (
        <>
            <img src="" alt={data.imageAlt} />
            <p className="select-quom">{ data.characters.length > 0 && data.characters[0].name }</p>
        </>
    )
};

MainImage.propTypes = {
    useAllData: PropTypes.func.isRequired,
    selectCharacterPositionPost: PropTypes.func.isRequired,
}

export default MainImage;