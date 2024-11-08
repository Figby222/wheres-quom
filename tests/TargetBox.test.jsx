import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import TargetBox from "../src/components/TargetBox.jsx";

describe("TargetBox existence", () => {
    it("Exists", () => {
        expect(TargetBox).toBeDefined();
    })
})