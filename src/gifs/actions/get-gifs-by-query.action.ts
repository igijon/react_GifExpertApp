import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';
import { giphyApi } from '../api/giphy.api';
import { giphySearchResponseMock } from './../../tests/mock/giphy.response.data';


export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    
    if (query.trim().length === 0) {
        return [];
    }

    try {
        const response = await giphyApi<GiphyResponse>('/search', {
            params: {
                q: query,
                limit: 10
            }
        })
    
        return response.data.data.map(giphyGif => ({
            id: giphyGif.id,
            title: giphyGif.title,
            url: giphyGif.images.fixed_height.url,
            width: parseInt(giphyGif.images.fixed_height.width, 10),
            height: parseInt(giphyGif.images.fixed_height.height, 10),
        }));
        
    }catch (error) {
        console.error('Error fetching gifs:', error);
        return [];
    }
};