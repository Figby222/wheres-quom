import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import MainImage from "../src/components/MainImage.jsx";


describe("MainImage existence", () => {
    it("Exists", () => {
        expect(MainImage).toBeDefined();
    })
})