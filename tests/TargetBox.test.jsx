import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import TargetBox from "../src/components/TargetBox.jsx";

describe("TargetBox existence", () => {
    it("Exists", () => {
        expect(TargetBox).toBeDefined();
    })

    it("Is a function", () => {
        expect(TargetBox).toBeTypeOf("function");
    })
})

describe("TargetBox", () => {
    it("Renders target box element", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} />);

        expect(screen.queryByRole("targetbox"))
            .toBeInTheDocument();
    })

    it("Is absolutely positioned", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.position)
            .toBe("absolute");
    })

    it("Has correct X value", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.left)    
            .toBe("4px");
    })

    it("Has different X value", () => {
        render(<TargetBox coordinates={{ x: 6, y: 4 }} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.left)
            .toBe("6px");
    })

    it("Has correct Y value", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.top)
            .toBe("4px");
    })

    it("Has different Y value", () => {
        render(<TargetBox coordinates={{ x: 4, y: 6 }} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.top)
            .toBe("6px");
    })
})