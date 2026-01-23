import { describe, expect, test } from 'vitest';
import { getGifsByQuery } from './get-gifs-by-query.action';



describe('getGifsByQuery', () => {
    test('should return a list of gifs', async () => {
        const gifs = await getGifsByQuery('One Punch');
        const [ gif1 ] = gifs;
        expect(gif1).toEqual({
            id: expect.any(String),
            height: expect.any(Number),
            width: expect.any(Number),
            title: expect.any(String),
            url: expect.any(String),
        });
        expect(gifs.length).toBe(10);
    });  
});