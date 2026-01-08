import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';
import { giphyApi } from '../api/giphy.api';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    
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
    
};