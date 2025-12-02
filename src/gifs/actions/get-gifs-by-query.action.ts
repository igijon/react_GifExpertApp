import axios from 'axios';
import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    const response = await axios.get<GiphyResponse>('https://api.giphy.com/v1/gifs/search', {
        params: {
            q: query,
            limit: 10,
            lang: 'es',
            api_key: 'TIENQXEYYVGZLrATHuQPv6eLfsTahPwD'
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