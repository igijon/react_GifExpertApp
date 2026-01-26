import { afterEach, describe, expect, test } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from './get-gifs-by-query.action';
import {giphyApi} from '../api/giphy.api'
import { giphySearchResponseMock } from '../../tests/mock/giphy.response.data';
import { beforeEach } from 'node:test';
import { log } from 'console';


describe('getGifsByQuery', () => {
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
    
    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock); //Va a devolv2er 200 y cualquier cosa como data.
        //Esto que hemos hecho sobreescribirá la response real de la API.

        const gifs = await getGifsByQuery('One Punch');

        expect(gifs.length).toBe(10);
        gifs.forEach( gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        });
        
    });

    test('should return an empty list of gifs if query is empty', async () => {
        // mock.onGet('/search').reply(200, giphySearchResponseMock); //Va a devolv2er 200 y cualquier cosa como data.
        //Esto que hemos hecho sobreescribirá la response real de la API.
        mock.restore(); //Restauramos el mock para que haga la llamada real.

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);
        
    });

    test('should handle error when the API returns an error', async () => {
        mock.onGet('/search').reply(400, { //Bad Request
            data: {
                message: 'Bad Request'
            }
        }); //Simulamos un error 500.
        const gifs = await getGifsByQuery('One Punch');
        expect(gifs.length).toBe(0);
        
    });
});