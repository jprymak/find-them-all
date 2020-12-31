import React from "react";
import '../styles/SearchBar.css';

function SearchBar(props){
    const {hasError, onConfirm} = props;
    return(
        <React.Fragment>
        <input class="search-bar" onKeyDown={onConfirm} type="text" placeholder="Find them all!"/> 
        {hasError===true ? <p class="error-message">There is no such pokemon!</p> : "" }
        </React.Fragment>
    )
}

export default SearchBar;