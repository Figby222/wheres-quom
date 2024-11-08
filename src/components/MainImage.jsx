import PropTypes from "prop-types";

const MainImage = ({ useAllData, selectCharacterPositionPost }) => {
    const { error, loading, data } = useAllData();

    if (loading) {
        return (<p className="loading">Loading...</p>)
    }

    return (
        <>
            <img src="" alt={data.imageAlt} />
            <section className="character-selection">
                <div role="targetbox"></div>
                <ul className="character-selection-ul">
                    { data.characters.map((character) => {
                        return <li key={character.id} className="select-character">
                            { character.name }
                        </li>
                    })}
                </ul>
            </section>
        </>
    )
};

MainImage.propTypes = {
    useAllData: PropTypes.func.isRequired,
    selectCharacterPositionPost: PropTypes.func.isRequired,
}

export default MainImage;