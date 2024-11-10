import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import CharacterMarker from "../src/components/CharacterMarker.jsx";

describe("CharacterMarker existence", () => {
    it("Exists", () => {
        expect(CharacterMarker).toBeDefined();
    })

    it("Is a function", () => {
        expect(CharacterMarker).toBeTypeOf("function");

    })
})

describe("CharacterMarker", () => {
    it("Renders a CharacterMarker element", () => {
        render(<CharacterMarker coordinates={{  x: 4, y: 4 }} />);

        expect(screen.queryByRole("charactermarker"))
            .toBeInTheDocument();
    })

    it("Is absolutely positioned", () => {
        render(<CharacterMarker coordinates={{ x: 4, y: 4 }} />);

        const characterMarker = screen.queryByRole("charactermarker");

        expect(characterMarker.style.position)
            .toBe("absolute");
    })

    it("Has the correct X coordinate", () => {
        render(<CharacterMarker coordinates={{ x: 6, y: 4 }} />)

        const characterMarker = screen.queryByRole("charactermarker");

        expect(characterMarker.style.left)
            .toBe("6px");
    })

    it("Has different X coordinate", () => {
        render(<CharacterMarker coordinates={{ x: 4, y: 4 }} />);

        const characterMarker = screen.queryByRole("charactermarker");

        expect(characterMarker.style.left)
            .toBe("4px");
    })

    it("Has the correct Y coordinate", () => {
        render(<CharacterMarker coordinates={{ x: 4, y: 4 }} />);

        const characterMarker = screen.queryByRole("charactermarker");

        expect(characterMarker.style.top)
            .toBe("4px");
    })

    it("Has different Y coordinate", () => {
        render(<CharacterMarker coordinates={{ x: 4, y: 6 }} />);

        const characterMarker = screen.queryByRole("charactermarker");

        expect(characterMarker.style.top)
            .toBe("6px");
    })
})