import React from "react";

function PokemonCard(){
    return(
        <div class="pokemon-card">
            <img class="pokemon-card__img"></img>
            <p class="pokemon-card__name"></p>
            <p class="pokemon-card__affinity"></p>
            <button class="pokemon-card__save-button" ></button>
        </div>
    )
}

export default PokemonCard;