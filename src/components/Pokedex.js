import React from "react";
import "../styles/Pokedex.css";

function Pokedex(props) {
  const { isPokedexOpen, onPokedexButtonClick, pokedex } = props;
  return (
    <div className={`Pokedex ${isPokedexOpen ? "" : "Pokedex--hidden"}`}>
      <h2 className="Pokedex__header">{isPokedexOpen ? "Pokedex" : ""}</h2>
      <ul className="Pokedex__list">
        {isPokedexOpen
          ? pokedex.map((pokemon) => {
              return (
                <li className="Pokedex__list-item" key={pokemon.id}>
                  #{pokemon.id} - {pokemon.name}
                </li>
              );
            })
          : ""}
      </ul>

      <button onClick={onPokedexButtonClick} className="Pokedex__button">
        {isPokedexOpen ? "<" : ">"}
      </button>
    </div>
  );
}

export default Pokedex;
