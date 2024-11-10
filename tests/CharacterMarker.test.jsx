import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import CharacterMarker from "../src/components/CharacterMarker.jsx";

describe("CharacterMarker existence", () => {
    it("Exists", () => {
        expect(CharacterMarker).toBeDefined();
    })
})