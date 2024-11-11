const getCoordinateAsPercentageOfElementLength = (coordinateInPixels, elementDimensionOffsetInPixels, elementDimensionLengthInPixels) => {
    const calculatedCoordinate = 
        (coordinateInPixels - elementDimensionOffsetInPixels) / elementDimensionLengthInPixels;

        return calculatedCoordinate * 100;

        
}

const getCoordinateFromLengthPercentage = (pixelPercentage, parentElementLengthInPixels) => {
    const coordinate = parentElementLengthInPixels * (pixelPercentage / 100);

    return coordinate;
}

export { getCoordinateAsPercentageOfElementLength, getCoordinateFromLengthPercentage }