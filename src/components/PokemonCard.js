import React from "react";

function PokemonCard(props){
    const {imageURL, name, type} = props;
    return(
        <div class="pokemon-card">
            <img src={imageURL} class="pokemon-card__img"></img>
            <p class="pokemon-card__name">{name}</p>
            <p class="pokemon-card__type">{type}</p>
            <button class="pokemon-card__save-button" >Save in pokedex</button>
        </div>
    )
}

export default PokemonCard;