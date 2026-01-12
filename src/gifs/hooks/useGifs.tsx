import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

//Por ahora dejamos la caché aquí porque si lo metemos dentro del componente
//cada vez que se renderice el componente se perdería la caché.
// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string = "") => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    //Comprobar si query es vacío
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    //Comprobar si el término ya existe en previousTerms
    if (previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0, 7));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
  };

  return {
    //Properties / Values
    gifs,
    previousTerms,
    //Methods / Actions
    handleSearch,
    handleTermClicked,
  };
};
