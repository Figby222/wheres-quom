import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { getUseAllDataMock } from "../lib/testing-utils.jsx";
import MainImage from "../src/components/MainImage.jsx";


describe("MainImage existence", () => {
    it("Exists", () => {
        expect(MainImage).toBeDefined();
    })

    it("Is a function", () => {
        expect(MainImage).toBeTypeOf("function");
    })
})

describe("useAllData", () => {
    it("Calls useAllData on render", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        const mockSelectCharacterPositionPost = vi.fn(() => ({})); 

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        expect(mockUseAllData)
            .toHaveBeenCalled();
    })
})