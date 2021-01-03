import React from "react";
import "../styles/Pokedex.css";

function Pokedex(props) {
  const { isPokedexOpen, onPokedexButtonClick, pokedex } = props;
  return (
    <div className={`Pokedex ${isPokedexOpen ? "" : "Pokedex--hidden"}`}>
      <h2 className="Pokedex__header">Pokedex</h2>
      <ul className="Pokedex__list">
        {isPokedexOpen
          ? pokedex.map((pokemon) => {
              return (
                <li key={pokemon.id}>
                  #{pokemon.id} - {pokemon.name}
                </li>
              );
            })
          : ""}
      </ul>

      <button onClick={onPokedexButtonClick} className="Pokedex__button">
        {isPokedexOpen ? "Hide Pokedex" : "Show Pokedex"}
      </button>
    </div>
  );
}

export default Pokedex;
