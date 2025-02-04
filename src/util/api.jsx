const selectCharacterPositionPost = async (characterId, targetBoxCoordinatePercentages) => {
    const apiLink = "/";
    const response = await fetch(apiLink, {
        mode: "cors",
        body: {
            characterId: characterId,
            targetBoxXPercentage: targetBoxCoordinatePercentages.x,
            targetBoxYPercentage: targetBoxCoordinatePercentages.y
        }
    })

    const character = response.charactersFound.find((character) => {
        character.id === characterId
    }) || null;

    const coordinates = {
        x: character !== null ?
            character.positionLeft + (character.positionRight - character.positionLeft) :
            null,
        y: character !== null ?
            character.positionTop + (character.positionBottom - character.positionTop) :
            null
    }

    

    return { success: response.success, coordinates: coordinates, characterId: response.characterId }
}
export { selectCharacterPositionPost };