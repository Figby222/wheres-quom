const getCoordinateAsPercentageOfElementLength = (coordinateInPixels, elementDimensionOffsetInPixels, elementDimensionLengthInPixels) => {
    const calculatedCoordinate = 
        (coordinateInPixels - elementDimensionOffsetInPixels) / elementDimensionLengthInPixels;

        return calculatedCoordinate * 100;

        
}

export { getCoordinateAsPercentageOfElementLength }