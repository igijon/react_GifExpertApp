import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
  const [query, setQuery] = useState('');

  //Se busca que los efectos hagan una única tarea específica
  //Se dispara cuando el componente se monta
  useEffect(() => {

    const timeoutId = setTimeout(() => {
      //Cada vez que query cambie, quiero llamar a onQuery
      //cuando algo cambia, se ejecuta useEffect
      onQuery(query);
      setQuery("");
    }, 700);

    return () => {
      //Aquí va la limpieza del efecto
      //Se va a llamar cuando el componente deja de existir
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]); // Especificamos en un array las dependencias que deben detonar este useEffect

  const handleSearch = () => {
    onQuery(query);
    setQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
