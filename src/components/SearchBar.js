import React from "react";
import '../styles/SearchBar.css';

function SearchBar(props){
    const {isPokemonInPokedex, isPokemonFound, hasError, onConfirm} = props;
    return(
        <React.Fragment>
        <input className="search-bar" onKeyDown={onConfirm} type="text" placeholder="Find them all!"/> 
        {hasError===true ? <p className="error-message">There is no such pokemon!</p> : "" }
        {isPokemonFound===true ? <p className="error-message">You already have this pokemon in view!</p> : "" }
        {isPokemonInPokedex===true ? <p className="error-message">You already have this pokemon in pokedex!</p> : "" }
        </React.Fragment>
    )
}

export default SearchBar;