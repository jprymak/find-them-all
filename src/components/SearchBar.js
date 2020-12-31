import React from "react";

function SearchBar({onConfirm}){
    
    return(
        <input onKeyDown={onConfirm} type="text" placeholder="Find them all!"/>
    )
}

export default SearchBar;