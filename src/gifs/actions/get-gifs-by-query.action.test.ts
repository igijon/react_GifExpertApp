import { afterEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from "../../tests/mock/giphy.response.data";
import { beforeEach } from "node:test";
import { log } from "console";

describe("getGifsByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  afterEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
    //mock.reset(); //Resetea el mock antes de cada test.
  });

  // test('should return a list of gifs', async () => {
  //     const gifs = await getGifsByQuery('One Punch');
  //     const [ gif1 ] = gifs;
  //     expect(gif1).toEqual({
  //         id: expect.any(String),
  //         height: expect.any(Number),
  //         width: expect.any(Number),
  //         title: expect.any(String),
  //         url: expect.any(String),
  //     });
  //     expect(gifs.length).toBe(10);
  // });

  //npm install axios-mock-adapter --save-dev

  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock); //Va a devolv2er 200 y cualquier cosa como data.
    //Esto que hemos hecho sobreescribirá la response real de la API.

    const gifs = await getGifsByQuery("One Punch");

    expect(gifs.length).toBe(10);
    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });
  });

  test("should return an empty list of gifs if query is empty", async () => {
    // mock.onGet('/search').reply(200, giphySearchResponseMock); //Va a devolv2er 200 y cualquier cosa como data.
    //Esto que hemos hecho sobreescribirá la response real de la API.
    mock.restore(); //Restauramos el mock para que haga la llamada real.

    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when the API returns an error", async () => {
    //Si quiero comprobar que algo es llamado, pondría un espía. Si quiero simular algo sería un mock.
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {}); //Espiamos el console.error para ver si se llama y mockimplementation sustituye la implementación del error.

    mock.onGet("/search").reply(400, {
      //Bad Request
      data: {
        message: "Bad Request",
      },
    }); //Simulamos un error 500.
    const gifs = await getGifsByQuery("One Punch");
    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled(); //Comprobamos que se ha llamado al console.error.
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1); //Comprobamos que se ha llamado al console.error.
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching gifs:",
      expect.anything()
    ); //Comprobamos que se ha llamado al console.error con el mensaje esperado.

    consoleErrorSpy.mockRestore(); //Restauramos el console.error original.
  });
});
