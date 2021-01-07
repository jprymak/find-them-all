import React from "react";
import "../styles/PokemonCard.css";
import { v4 as uuidv4 } from "uuid";

function PokemonCard(props) {
  const { imageURL, name, type, onPokemonSave, abilities} = props;
  return (
    <div className="pokemon-card">
      <img alt={name} src={imageURL} className="pokemon-card__img"></img>
      <p className="pokemon-card__name">{name}</p>
      <p className="pokemon-card__type">{type}</p>
      <ul className="pokemon-card__abilities">
        Abilities
        {abilities.map((ability) => {
          return (
            <li
              key={uuidv4()}
              className="pokemon-card__ability"
            >
              {ability.name}
              <p className="pokemon-card__ability-description">{ability.description}</p>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          onPokemonSave(name);
        }}
        className="pokemon-card__save-button"
      >
        Save in pokedex
      </button>
    </div>
  );
}

export default PokemonCard;
