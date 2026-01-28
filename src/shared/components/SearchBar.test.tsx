import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { on } from "events";

describe("SearchBar", () => {
  test("should render search bar correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should call onQuery with the corret value after 700ms", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    //Si no pongo el await todo lo de dentro del waitFor no se ejecutará
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call only once with de last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "test" } });

    //Si no pongo el await todo lo de dentro del waitFor no se ejecutará
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call onQuery when button is clicked", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test");
  });

  test("should the input has the correct placeholder value", () => {
    const placeHolder = "Buscar gif";
    render(<SearchBar placeholder={placeHolder} onQuery={() => {}} />);
    expect(screen.getByPlaceholderText(placeHolder)).toBeDefined();
  });

  //Nota: importante, npm run coverage para generar la cobertura.
});
