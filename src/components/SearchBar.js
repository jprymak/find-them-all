import React from "react";
import '../styles/SearchBar.css';

function SearchBar({onConfirm}){
    
    return(
        <input class="search-bar" onKeyDown={onConfirm} type="text" placeholder="Find them all!"/>
    )
}

export default SearchBar;