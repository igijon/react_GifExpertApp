import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(typeof result.current.handleSearch).toBeDefined();
    expect(typeof result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearch("Goku");
    });
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleTermClicked("One Punch");
    });
    expect(result.current.gifs.length).toBe(10);
  });

    test("should return a list of gifs from cache", async () => {
      const { result } = renderHook(() => useGifs());
      await act(async () => {
        await result.current.handleTermClicked("One Punch");
      });
      expect(result.current.gifs.length).toBe(10);

      //Este espía indica que si se hace la petición HTTP lanza un error
      // y no pasaría la prueba porque debe estar en caché
      const spy = vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
        new Error("This is my custom error"),
      );

      await act(async () => {
        await result.current.handleTermClicked("One Punch");
      });
      expect(result.current.gifs.length).toBe(10);
      spy.mockRestore();
    });

    test("should return no more than 8 previous terms",async () => {
      const { result } = renderHook(() => useGifs());

      const spy = vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

      await act(async () => {
        await result.current.handleSearch("term1");
      });
      await act(async () => {
        await result.current.handleSearch("term2");
      });
      await act(async () => {
        await result.current.handleSearch("term3");
      });
      await act(async () => {
        await result.current.handleSearch("term4");
      });
      await act(async () => {
        await result.current.handleSearch("term5");
      });
      await act(async () => {
        await result.current.handleSearch("term6");
      });
      await act(async () => {
        await result.current.handleSearch("term7");
      });
      await act(async () => {
        await result.current.handleSearch("term8");
      });
      console.log(result.current.previousTerms);
      expect(result.current.previousTerms.length).toBe(7);
      expect(result.current.previousTerms).toStrictEqual([
        "term8",
        "term7",
        "term6",
        "term5",
        "term4",
        "term3",
        "term2",
      ]);
      spy.mockRestore();
    });
});
