import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { getUseAllDataMock } from "../lib/testing-utils.jsx";
import MainImage from "../src/components/MainImage.jsx";
import userEvent from "@testing-library/user-event";


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

describe("Image loading", () => {
    it("Returns loading feedback whilst loading", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        expect(screen.queryByText(/Loading/i))
            .toBeInTheDocument();
    })

    it("Doesn't render loading when done loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            characters: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);
        
        expect(screen.queryByText(/Loading/i))
            .not.toBeInTheDocument();
    })

    it("Renders image when done loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Alt Text",
            characters: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        expect(screen.queryByText(/Loading/i))
            .not.toBeInTheDocument();

        expect(screen.queryByAltText(/Test Alt Text/i))
            .toBeInTheDocument();
    })

    it("Renders an image with different alt text when done loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Different Alt Text",
            characters: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        expect(screen.queryByText(/Loading/i))
            .not.toBeInTheDocument();

        expect(screen.queryByAltText(/Test Different Alt Text/i))
            .toBeInTheDocument();
    })
})

describe("Clicking the image", () => {
    it("Prints a character selection to the screen", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Alt Text",
            characters: [
                {
                    id: 1,
                    name: "quom"
                }
            ]
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        const image = screen.queryByAltText(/Test Alt Text/i);

        const user = userEvent.setup();
        await user.click(image);

        expect(screen.queryByText(/quom/i))
            .toBeInTheDocument();
    })

    it("Prints a different character selection element to the screen", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Alt Text",
            characters: [
                {
                    id: 1,
                    name: "Comal"
                }
            ]
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        const image = screen.queryByAltText(/Test Alt Text/i);

        const user = userEvent.setup();
        await user.click(image);

        expect(screen.queryByText(/Comal/i))
            .toBeInTheDocument();
    })

    it("Prints multiple selection options to the screen", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Alt Text",
            characters: [
                {
                    id: 1,
                    name: "Comal",
                },
                {
                    id: 2,
                    name: "quom",
                }
            ]
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} />);

        const image = screen.queryByAltText(/Test Alt Text/i);

        const user = userEvent.setup();
        await user.click(image);

        expect(screen.queryByText(/Comal/i)).toBeInTheDocument();
        expect(screen.queryByText(/quom/i)).toBeInTheDocument();
    })
})