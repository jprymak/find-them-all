import React from "react";
import '../styles/PokemonCard.css';

function PokemonCard(props){
    const {imageURL, name, type, onPokemonSave} = props;
    return(
        <div className="pokemon-card">
            <img alt={name} src={imageURL} className="pokemon-card__img"></img>
            <p className="pokemon-card__name">{name}</p>
            <p className="pokemon-card__type">{type}</p>
            <button onClick={()=>{onPokemonSave(name)}} className="pokemon-card__save-button" >Save in pokedex</button>
        </div>
    )
}

export default PokemonCard;