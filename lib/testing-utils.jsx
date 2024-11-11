import { describe, it, expect, vi } from "vitest";
import { screen, render as _render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const getRenderFunction = (routes, initialEntries) => {
    const router = createMemoryRouter(routes, {
        initialEntries: initialEntries || [ "/", "/" ],
        initialIndex: 1,
    });

    _render(<RouterProvider router={router} />);
}

const getUseAllDataMock = (error, loading, data) => {
    return vi.fn(() => {
        return { error, loading, data }
    })
}

const getElementCoordinatePercentage = (coordinateInPixels, elementDimensionOffsetInPixels, elementDimensionLengthInPixels) => {
    const calculatedCoordinate =
        (coordinateInPixels - elementDimensionOffsetInPixels) / elementDimensionLengthInPixels;

    return calculatedCoordinate * 100;
}

const getCoordinateFromLengthPercentage = (pixelPercentage, parentElementLengthInPixels) => {
    const coordinate = parentElementLengthInPixels * (pixelPercentage / 100);

    return coordinate;
}

export { getRenderFunction, getUseAllDataMock, getElementCoordinatePercentage, getCoordinateFromLengthPercentage }