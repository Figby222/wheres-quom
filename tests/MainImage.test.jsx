import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, render, within } from "@testing-library/react";
import { getUseAllDataMock } from "../lib/testing-utils.jsx";
import MainImage from "../src/components/MainImage.jsx";
import userEvent from "@testing-library/user-event";

vi.mock("../src/components/TargetBox.jsx", () => ({
        default: ({ coordinates, size}) => {
            console.log(coordinates)
            return (
                <>
                    <div data-testId="targetbox" className="target-box" role="targetbox"></div>
                    <div data-testId="coordinate-x">{ coordinates.x }</div>
                    <div data-testId="coordinate-y">{ coordinates.y }</div>
                    <div data-testId="size">{ size }</div>
                </>
            )
        }
}))

vi.mock("../src/components/CharacterMarker.jsx", () => ({
    default: ({ coordinates, characterId, size }) => {
        console.log(coordinates);
        return (
            <>
                <div data-testId="charactermarker" className="character-marker" role="charactermarker"></div>
                <div data-testId="charactermarker-coordinate-x">{ coordinates.x }</div>
                <div data-testId="charactermarker-coordinate-y">{ coordinates.y }</div>
                <div data-testId="charactermarker-size">{ size }</div>
                <div data-testId="charactermarker-characterId">{ characterId }</div>
            </>
        )
    }
}))


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

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        expect(mockUseAllData)
            .toHaveBeenCalled();
    })
})

describe("Image loading", () => {
    it("Returns loading feedback whilst loading", () => {
        const mockUseAllData = getUseAllDataMock(false, true, null);

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        expect(screen.queryByText(/Loading/i))
            .toBeInTheDocument();
    })

    it("Doesn't render loading when done loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            characters: [],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);
        
        expect(screen.queryByText(/Loading/i))
            .not.toBeInTheDocument();
    })

    it("Renders image when done loading", () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Alt Text",
            characters: [],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

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
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        const image = screen.queryByAltText(/Test Alt Text/i);

        const user = userEvent.setup();
        await user.click(image);

        expect(screen.queryByText(/Comal/i)).toBeInTheDocument();
        expect(screen.queryByText(/quom/i)).toBeInTheDocument();
    })

    it("Only renders character selection options when image is clicked", () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        expect(screen.queryByText(/Comal/i))
            .not.toBeInTheDocument();
        expect(screen.queryByText(/quom/i))
            .not.toBeInTheDocument();
    })


    
    it("Renders target box on click", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);
        
        const image = screen.queryByAltText(/Test Alt Text/i);

        const user = userEvent.setup();
        await user.click(image);

        expect(screen.queryByRole("targetbox"))
            .toBeInTheDocument();
        
    })

    it("Doesn't render target box when image isn't clicked", () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        expect(screen.queryByRole("targetbox"))
            .not.toBeInTheDocument();
    })
})

describe("Target Box", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    
    it("Has the correct coordinates", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 1000,
            left: 0,
            right: 100,
            height: 50,
            top: 0,
            bottom: 50,
        }))

        const image = screen.queryByAltText(/Test Alt Text/i);

        const user = userEvent.setup();

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: 4, y: 4 },
        })

        expect(screen.queryByTestId("coordinate-x").textContent)
            .toBe("4");
        expect(screen.queryByTestId("coordinate-y").textContent)
            .toBe("4");
    })

    it("Has different coordinates", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 1000,
            left: 0,
            right: 100,
            height: 50,
            top: 0,
            bottom: 50,
        }))

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: 46, y: 64 },
        })

        expect(screen.queryByTestId("coordinate-x").textContent)
            .toBe("46");
        expect(screen.queryByTestId("coordinate-y").textContent)
            .toBe("64");
    })
})

describe("SelectCharacterPositionPost", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    
    it("Gets called when character is clicked", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        const image = screen.queryByAltText("Test Alt Text");
        
        
        const user = userEvent.setup();
        
        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: 46, y: 64 },
        })

        const comalButton = screen.queryByText(/Comal/i);
        
        await user.click(comalButton);

        expect(mockSelectCharacterPositionPost)
            .toHaveBeenCalled();
    })

    it("Only gets called on character selection click", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        const image = screen.queryByAltText("Test Alt Text");
        
        
        const user = userEvent.setup();
        
        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: 46, y: 64 },
        })

        expect(mockSelectCharacterPositionPost)
            .not.toHaveBeenCalled();
    })

    it("Gets called with the correct args", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 1000,
            left: 50,
            right: 0,
            height: 50,
            top: 40,
            bottom: 0,
        }))

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();

        const x = 64;
        const y = 46;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/Comal/i);

        await user.click(comalButton);

        const getElementCoordinatePercentage = (coordinateInPixels, elementDimensionOffsetInPixels, elementDimensionLengthInPixels) => {
            const calculatedCoordinate =
                (coordinateInPixels - elementDimensionOffsetInPixels) / elementDimensionLengthInPixels;

            return calculatedCoordinate * 100;
        }

        const imageRect = image.getBoundingClientRect();

        const imageOffsetX = imageRect.left;
        const imageOffsetY = imageRect.top;

        const xCoordinateAsPercentageOfImageWidth = getElementCoordinatePercentage(x, imageOffsetX, imageRect.width);
        const yCoordinateAsPercentageOfImageHeight = getElementCoordinatePercentage(y, imageOffsetY, imageRect.height);

        expect(mockSelectCharacterPositionPost)
            .toHaveBeenCalledWith(1, {
                x: xCoordinateAsPercentageOfImageWidth,
                y: yCoordinateAsPercentageOfImageHeight
            });
        
    })

    it("Gets called with different args", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({}));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();

        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);

        await user.click(comalButton);

        const getElementCoordinatePercentage = (coordinateInPixels, elementDimensionOffsetInPixels, elementDimensionLengthInPixels) => {
            const calculatedCoordinate =
                (coordinateInPixels - elementDimensionOffsetInPixels) / elementDimensionLengthInPixels;

            return calculatedCoordinate * 100;
        }

        const imageRect = image.getBoundingClientRect();

        const imageOffsetX = imageRect.left;
        const imageOffsetY = imageRect.top;

        const xCoordinateAsPercentageOfImageWidth = getElementCoordinatePercentage(x, imageOffsetX, imageRect.width);
        const yCoordinateAsPercentageOfImageHeight = getElementCoordinatePercentage(y, imageOffsetY, imageRect.height);

        expect(mockSelectCharacterPositionPost)
            .not.toHaveBeenCalledWith(1, {
                x: 1.4000000000000001,
                y: 12
            })
        expect(mockSelectCharacterPositionPost)
            .toHaveBeenCalledWith(2, {
                x: xCoordinateAsPercentageOfImageWidth,
                y: yCoordinateAsPercentageOfImageHeight
            })
    })
})

describe("CharacterMarker", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    })

    it("Renders a character marker", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        expect(screen.queryByRole("charactermarker"))
            .toBeInTheDocument();
    })

    it("Doesn't render a character marker on unsuccessful marking", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: false
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))

        const image = screen.queryByAltText("Test Alt Text");
        const user = userEvent.setup();

        const x = 44;
        const y = 22;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        expect(screen.queryByRole("charactermarker"))
            .not.toBeInTheDocument();
    })

    it("Renders CharacterMarker Component", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const characterMarkerXPercentage = 4;
        const characterMarkerYPercentage = 8;

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: true,
            characterId: 4,
            coordinates: {
                x: `${characterMarkerXPercentage}%`,
                y: `${characterMarkerYPercentage}%`,
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);

        await user.click(comalButton);

        expect(screen.queryByTestId("charactermarker-coordinate-x"))
            .toBeInTheDocument();
        expect(screen.queryByTestId("charactermarker-coordinate-y"))
            .toBeInTheDocument();
        expect(screen.queryByTestId("charactermarker-characterId"))
            .toBeInTheDocument();
        expect(screen.queryByTestId("charactermarker-size"))
            .toBeInTheDocument();
    })



    it("Calls charactermarker with correct props", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const characterMarkerXPercentage = 4;
        const characterMarkerYPercentage = 8;

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: true,
            characterId: 4,
            coordinates: {
                x: `${characterMarkerXPercentage}%`,
                y: `${characterMarkerYPercentage}%`,
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);

        await user.click(comalButton);

        const getCoordinateFromLengthPercentage = (pixelPercentage, parentElementLengthInPixels) => {
            const coordinate = parentElementLengthInPixels * (pixelPercentage / 100);

            return coordinate;
        }

        const imageRect = image.getBoundingClientRect();

        const xCoordinateWithinImage = getCoordinateFromLengthPercentage(characterMarkerXPercentage, imageRect.width);
        const yCoordinateWithinImage = getCoordinateFromLengthPercentage(characterMarkerYPercentage, imageRect.height);

        const xCoordinateElement = screen.queryByTestId("charactermarker-coordinate-x");
        const yCoordinateElement = screen.queryByTestId("charactermarker-coordinate-y");
        const characterIdElement = screen.queryByTestId("charactermarker-characterId");
        const sizeElement = screen.queryByTestId("charactermarker-size");

        expect(xCoordinateElement.textContent)
            .toBe(`${xCoordinateWithinImage}px`);
        expect(yCoordinateElement.textContent)
            .toBe(`${yCoordinateWithinImage}px`);
        expect(characterIdElement.textContent)
            .toBe("4");
        expect(sizeElement.textContent)
            .toBe("10%");


    })

    it("Renders CharacterMarker with different props", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const characterMarkerXPercentage = 46;
        const characterMarkerYPercentage = 64;

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: true,
            characterId: 64,
            coordinates: {
                x: `${characterMarkerXPercentage}%`,
                y: `${characterMarkerYPercentage}%`,
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 4646,
            left: 24,
            right: 0,
            height: 164,
            top: 64,
            bottom: 0,
        }))

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);

        await user.click(comalButton);

        const getCoordinateFromLengthPercentage = (pixelPercentage, parentElementLengthInPixels) => {
            const coordinate = parentElementLengthInPixels * (pixelPercentage / 100);

            return coordinate;
        }

        const imageRect = image.getBoundingClientRect();

        const xCoordinateWithinImage = getCoordinateFromLengthPercentage(characterMarkerXPercentage, imageRect.width);
        const yCoordinateWithinImage = getCoordinateFromLengthPercentage(characterMarkerYPercentage, imageRect.height);

        const xCoordinateElement = screen.queryByTestId("charactermarker-coordinate-x");
        const yCoordinateElement = screen.queryByTestId("charactermarker-coordinate-y");
        const characterIdElement = screen.queryByTestId("charactermarker-characterId");
        const sizeElement = screen.queryByTestId("charactermarker-size");

        expect(xCoordinateElement.textContent)
            .toBe(`${xCoordinateWithinImage}px`);
        expect(yCoordinateElement.textContent)
            .toBe(`${yCoordinateWithinImage}px`);
        expect(characterIdElement.textContent)
            .toBe("64");
        expect(sizeElement.textContent)
            .toBe("10%");
    })

    it("Can render multiple charactermarkers", async () => {
        const mockUseAllData = getUseAllDataMock(false, false, {
            imageSrc: "/",
            imageAlt: "Test Alt Text",
            characters: [
                {
                    id: 3,
                    name: "Comal",
                },
                {
                    id: 4,
                    name: "quom",
                }
            ],
            leaderboardPlayers: [],
        });

        const character4MarkerXPercentage = 4;
        const character4MarkerYPercentage = 8;

        const character3MarkerXPercentage = 1;
        const character3MarkerYPercentage = 2;

        const mockSelectCharacterPositionPost = vi.fn((characterId) => {
            if (characterId === 4) {
                return {
                    success: true,
                    characterId: 4,
                    coordinates: {
                        x: `${character4MarkerXPercentage}%`,
                        y: `${character4MarkerYPercentage}%`,
                    }
                }
            }

            return {
                success: true,
                characterId: 3,
                coordinates: {
                    x: `${character3MarkerXPercentage}%`,
                    y: `${character3MarkerYPercentage}%`
                }
            }
        });

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 4646,
            left: 24,
            right: 0,
            height: 164,
            top: 64,
            bottom: 0,
        }))

        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const targetX1 = 64;
        const targetY1 = 46;
        
        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: targetX1, y: targetY1 },
        })
        
        const comalButton = screen.queryByText(/Comal/i);
        
        await user.click(comalButton);
        
        const targetX2 = 46;
        const targetY2 = 64;
        
        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: targetX2, y: targetY2 }
        })
        
        const quomButton = screen.queryByText(/quom/i);
        
        await user.click(quomButton);

        const getCoordinateFromLengthPercentage = (pixelPercentage, parentElementLengthInPixels) => {
            const coordinate = parentElementLengthInPixels * (pixelPercentage / 100);

            return coordinate;
        }

        const imageRect = image.getBoundingClientRect();

        const character4XCoordinateWithinImage = getCoordinateFromLengthPercentage(character4MarkerXPercentage, imageRect.width);
        const character4YCoordinateWithinImage = getCoordinateFromLengthPercentage(character4MarkerYPercentage, imageRect.height);

        const character3XCoordinateWithinImage = getCoordinateFromLengthPercentage(character3MarkerXPercentage, imageRect.width);
        const character3YCoordinateWithinImage = getCoordinateFromLengthPercentage(character3MarkerYPercentage, imageRect.height);

        const xCoordinateElements = screen.queryAllByTestId("charactermarker-coordinate-x");
        const yCoordinateElements = screen.queryAllByTestId("charactermarker-coordinate-y");
        const characterIdElements = screen.queryAllByTestId("charactermarker-characterId");
        const sizeElements = screen.queryAllByTestId("charactermarker-size");



        expect(xCoordinateElements[0].textContent)
            .toBe(`${character3XCoordinateWithinImage}px`);
        expect(yCoordinateElements[0].textContent)
            .toBe(`${character3YCoordinateWithinImage}px`);
        expect(characterIdElements[0].textContent)
            .toBe("3");
        expect(sizeElements[0].textContent)
            .toBe("10%");
        
        expect(xCoordinateElements[1].textContent)
            .toBe(`${character4XCoordinateWithinImage}px`);
        expect(yCoordinateElements[1].textContent)
            .toBe(`${character4YCoordinateWithinImage}px`);
        expect(characterIdElements[1].textContent)
            .toBe("4");
        expect(sizeElements[1].textContent)
            .toBe("10%");
    })
})

describe("High Score Form", () => {
    it("Renders Name Field", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        expect(screen.queryByText(/Name/i))
            .toBeInTheDocument();
    })

    it("Renders Name Field With Input", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);





        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        expect(screen.queryByRole("textbox", { name: /Name/i }))
            .toBeInTheDocument();
    })

    it("Only renders input when user wins", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        expect(screen.queryByRole("textbox", { name: /Name/i }))
            .not.toBeInTheDocument();
    })

    it("Renders submit button", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        expect(screen.queryByRole("button", { name: /Submit/i }))
            .toBeInTheDocument();
    })

    it("Only renders submit button on win", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={() => ({})} />);
        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");
        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })



        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        

        expect(screen.queryByRole("button", { name: /Submit/i }))
            .not.toBeInTheDocument();






            
    })

})

describe("submitScorePut", () => {
    it("Calls submitScoreForm when user wins & submits form", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);
        
        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        expect(mockSubmitScorePut)
            .toHaveBeenCalled();
    })

    it("Only calls submitScorePut when form is submitted", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);

        
        expect(mockSubmitScorePut)
            .not.toHaveBeenCalled();


    })

    it("Calls submitScorePut with correct args", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name")

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        expect(mockSubmitScorePut)
            .toHaveBeenCalledWith("Test Name");
    })

    it("Calls submitScorePut with different args", async () => {
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
            ],
            leaderboardPlayers: [],
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Different Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        expect(mockSubmitScorePut)
            .not.toHaveBeenCalledWith("Test Name");
        expect(mockSubmitScorePut)
            .toHaveBeenCalledWith("Test Different Name");
    })
})

describe("Leaderboard", () => {
    it("Shows leaderboard after win", async () => {
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
            ],
            leaderboardPlayers: [
                {
                    id: 4,
                    name: "quom",
                    completionTime: "24:46",
                },
            ],
        });

        

        
        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        expect(screen.queryByText("24:46"))
            .toBeInTheDocument();
    })

    it("Renders a leaderboard section", async () => {
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

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        expect(screen.queryByLabelText("leaderboard"))
            .toBeInTheDocument();
    })

    it("Renders a completion time", async () => {
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
            ],
            leaderboardPlayers: [
                {
                    id: 4,
                    name: "quom",
                    completionTime: "46:46"
                }
            ]
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        const leaderboard = screen.queryByLabelText("leaderboard");

        expect(within(leaderboard).queryByText("46:46"))
            .toBeInTheDocument();
            
            

    })

    it("Renders a different completion time", async () => {
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
            ],
            leaderboardPlayers: [
                {
                    id: 3,
                    name: "Comal",
                    completionTime: "24:24"
                }
            ]
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        const leaderboard = screen.queryByLabelText("leaderboard");

        expect(within(leaderboard).queryByText("46:46"))
            .not.toBeInTheDocument();
        expect(within(leaderboard).queryByText("24:24"))
            .toBeInTheDocument();
    })

    it("Only renders leaderboard when winner form is submitted", async () => {
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
            ],
            leaderboardPlayers: [
                {
                    id: 3,
                    name: "Comal",
                    completionTime: "24:24"
                }
            ]
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);


        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        expect(screen.queryByLabelText("leaderboard"))
            .not.toBeInTheDocument();
            
    })

    it("Can render multiple completion times", async () => {
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
            ],
            leaderboardPlayers: [
                {
                    id: 3,
                    name: "Comal",
                    completionTime: "24:24"
                },
                {
                    id: 4,
                    name: "quom",
                    completionTime: "46:46"
                }
            ]
        });

        

        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({}))

        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");

        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;

        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })

        const comalButton = screen.queryByText(/quom/i);


        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });

        await user.type(nameInput, "Test Name");

        const submitButton = screen.queryByRole("button", { name: /Submit/i });


        await user.click(submitButton);

        const leaderboard = screen.queryByLabelText("leaderboard");

        expect(within(leaderboard).queryByText("24:24"))
            .toBeInTheDocument();
        expect(within(leaderboard).queryByText("46:46"))
            .toBeInTheDocument();

    })
})

describe("Winner submission errors", () => {
    it("Doesn't render leaderboard on 403 status", async () => {
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
            ],
            leaderboardPlayers: [
                {
                    id: 3,
                    name: "Comal",
                    completionTime: "24:24"
                },
                {
                    id: 4,
                    name: "quom",
                    completionTime: "46:46"
                }
            ]
        });
    
        
    
        const mockSelectCharacterPositionPost = vi.fn(() => ({
            highScore: true,
            success: true,
            characterId: 4,
            coordinates: {
                x: "4%",
                y: "8%",
            }
        }));
        
        const mockSubmitScorePut = vi.fn(() => ({
            status: 403
        }))
    
        render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);
    
    
        vi
        .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(() => ({
            width: 500,
            left: 24,
            right: 0,
            height: 96,
            top: 64,
            bottom: 0,
        }))
        const image = screen.queryByAltText("Test Alt Text");
    
        const user = userEvent.setup();
        
        const x = 46;
        const y = 64;
    
        await user.pointer({
            keys: "[MouseLeft]",
            target: image,
            coords: { x: x, y: y },
        })
    
        const comalButton = screen.queryByText(/quom/i);
    
    
        await user.click(comalButton);
        
        const nameInput = screen.queryByRole("textbox", { name: /Name/i });
    
        await user.type(nameInput, "Test Name");
    
        const submitButton = screen.queryByRole("button", { name: /Submit/i });
    
    
        await user.click(submitButton);
    
        expect(screen.queryByLabelText("leaderboard"))
            .not.toBeInTheDocument();
        expect(screen.queryByText(/You must finish the game before submitting your score/i))
            .toBeInTheDocument();
    })
})

it("Doesn't show error message on successful submission", async () => {
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
        ],
        leaderboardPlayers: [
            {
                id: 3,
                name: "Comal",
                completionTime: "24:24"
            },
            {
                id: 4,
                name: "quom",
                completionTime: "46:46"
            }
        ]
    });

    

    const mockSelectCharacterPositionPost = vi.fn(() => ({
        highScore: true,
        success: true,
        characterId: 4,
        coordinates: {
            x: "4%",
            y: "8%",
        }
    }));
    
    const mockSubmitScorePut = vi.fn(() => ({
        status: 200
    }))

    render(<MainImage useAllData={mockUseAllData} selectCharacterPositionPost={mockSelectCharacterPositionPost} submitScorePut={mockSubmitScorePut} />);

        

    vi
    .spyOn(window.HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(() => ({
        width: 500,
        left: 24,
        right: 0,
        height: 96,
        top: 64,
        bottom: 0,
    }))
    const image = screen.queryByAltText("Test Alt Text");

    const user = userEvent.setup();
    
    const x = 46;
    const y = 64;

    await user.pointer({
        keys: "[MouseLeft]",
        target: image,
        coords: { x: x, y: y },
    })

    const comalButton = screen.queryByText(/quom/i);


    await user.click(comalButton);
    
    const nameInput = screen.queryByRole("textbox", { name: /Name/i });

    await user.type(nameInput, "Test Name");

    const submitButton = screen.queryByRole("button", { name: /Submit/i });


    await user.click(submitButton);

    expect(screen.queryByText(/You must finish the game before submitting your score/i))
        .not.toBeInTheDocument();
})