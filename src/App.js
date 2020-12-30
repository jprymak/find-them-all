import './App.css';
import SearchBar from "./components/SearchBar";
import React from "react";
import SearchResultBoard from './components/SearchResultBoard';

function App() {
  return (
    <div className="App">
 
        <SearchBar/>
        <SearchResultBoard/>

    </div>
  );
}

export default App;
