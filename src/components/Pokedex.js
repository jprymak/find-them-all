import React from "react";
import "../styles/Pokedex.css";

function Pokedex(props) {
  const { isPokedexOpen, onPokedexButtonClick, pokedex } = props;
  return (
    <div
      class={`Pokedex ${isPokedexOpen ? "" : "Pokedex--hidden"}`}
    >
        {isPokedexOpen ? 
        (pokedex.map((pokemon)=>{
            return <p key={pokemon.id}>#{pokemon.id} - {pokemon.name}</p>
        })) : ""}
      <button onClick={onPokedexButtonClick} class="Pokedex__button">
        {isPokedexOpen ? "Hide Pokedex" : "Show Pokedex"}
      </button>
    </div>
  );
}

export default Pokedex;
