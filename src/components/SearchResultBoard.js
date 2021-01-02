import '../styles/SearchResultBoard.css';
import PokemonCard from "./PokemonCard";

import React from "react"


function SearchResultBoard(props){
    const {pokemons, onPokemonSave} = props;
    return(
        <div className="SearchResultBoard">
            {pokemons.map(pokemon=>{
                return <PokemonCard onPokemonSave={onPokemonSave} key={pokemon.id} imageURL={pokemon.imageURL} name={pokemon.name} type={pokemon.type}/>
            })}
        </div>
    )
}

export default SearchResultBoard;