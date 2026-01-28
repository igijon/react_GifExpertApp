import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  // let result;

  // beforeEach(() => {
  //   const { result: hookValue } = renderHook(() => useCounter());
  //   result = hookValue;
  // });
  test("should initialize with default value of 10", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(10);
  });

  test("should initialize with default value of 20", () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));
    expect(result.current.counter).toBe(initialValue);
  });

  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter());
    //Cada modificación de estado tiene que tener su act de forma independiente
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(11);
  });

  test("should decrement counter when handleSubtract is called", () => {
    const { result } = renderHook(() => useCounter());
    //Cada modificación de estado tiene que tener su act de forma independiente
    act(() => {
      result.current.handleSubtract();
    });
    expect(result.current.counter).toBe(9);
  });

  test("should reset to initialValue the counter when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());

    //Cada modificación de estado tiene que tener su act de forma independiente
    act(() => {
      //En este caso hacemos varios Subtract dentro de act y funciona porque
      //el useCounter maneja el estado en la función de Subtract de forma diferente
      //con prevState
      result.current.handleSubtract();
      result.current.handleSubtract();
      result.current.handleSubtract();
    });
    expect(result.current.counter).toBe(7);

    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(10);
  });
});
