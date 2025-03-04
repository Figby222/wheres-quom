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
        render(<TargetBox coordinates={{ x: 4, y: 4 }} size="400px" />);

        expect(screen.queryByRole("targetbox"))
            .toBeInTheDocument();
    })

    it("Is absolutely positioned", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} size="400px" />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.position)
            .toBe("absolute");
    })

    it("Has correct X value", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} size="400px" />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.left)    
            .toBe("4px");
    })

    it("Has different X value", () => {
        render(<TargetBox coordinates={{ x: 6, y: 4 }} size="400px" />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.left)
            .toBe("6px");
    })

    it("Has correct Y value", () => {
        render(<TargetBox coordinates={{ x: 4, y: 4 }} size="400px" />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.top)
            .toBe("4px");
    })

    it("Has different Y value", () => {
        render(<TargetBox coordinates={{ x: 4, y: 6 }} size="400px" />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.top)
            .toBe("6px");
    })

    it("Has the correct size", () => {
        render(<TargetBox coordinates={{ x: 6, y: 4 }} size={"250px"} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.width)
            .toBe("250px");
        expect(targetbox.style.height)
            .toBe("250px");
    })

    it("Has different size", () => {
        render(<TargetBox coordinates={{ x: 6, y: 4 }} size={"400px"} />);

        const targetbox = screen.queryByRole("targetbox");

        expect(targetbox.style.width)
            .toBe("400px");
        expect(targetbox.style.height)
            .toBe("400px");
    })
})