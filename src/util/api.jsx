const selectCharacterPositionPut = async (characterId, targetBoxCoordinatePercentages, authToken) => {
    const apiLink = "http://localhost:6464/api/v1/play";
    const response = await fetch(apiLink, {
        mode: "cors",
        headers: {
            "Authorization": authToken
        },
        method: "PUT",
        body: JSON.stringify({
            characterId: characterId,
            targetBoxXPercentage: targetBoxCoordinatePercentages.x,
            targetBoxYPercentage: targetBoxCoordinatePercentages.y
        })
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

const submitScorePut = async (username, authToken) => {
    const apiLink = "http://localhost:6464/api/v1/play";
    
    const response = await fetch(apiLink, {
        headers: {
            "Authorization": authToken
        },
        mode: "cors",
        method: "PUT",
        body: {
            username: username
        }
    });

    return { success: response.success, ...response }
}
export { selectCharacterPositionPut, submitScorePut };