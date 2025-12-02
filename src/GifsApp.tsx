import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState([] as string[]);

  const handleTermClicked = (term: string = '') => {
    console.log(`Term clicked: ${term}`);
  };

  const handleSearch = async (query: string) => {
    //Comprobar si query es vacío
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    //Comprobar si el término ya existe en previousTerms  
    if (previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0, 7));

    const gifs = await getGifsByQuery(query);
    console.log(gifs);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar
        placeholder="Busca lo que quieras"
        onQuery={handleSearch}
      />

      {/* Búsquedas previas*/}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
