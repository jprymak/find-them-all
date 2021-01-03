import React from "react";
import '../styles/PokemonCard.css';

function PokemonCard(props){
    const {imageURL, name, type, onPokemonSave} = props;
    return(
        <div class="pokemon-card">
            <img alt={name} src={imageURL} class="pokemon-card__img"></img>
            <p class="pokemon-card__name">{name}</p>
            <p class="pokemon-card__type">{type}</p>
            <button onClick={()=>{onPokemonSave(name)}} class="pokemon-card__save-button" >Save in pokedex</button>
        </div>
    )
}

export default PokemonCard;