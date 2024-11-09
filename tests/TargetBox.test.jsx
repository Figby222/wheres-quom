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
})