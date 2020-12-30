import './App.css';
import SearchBar from "./components/SearchBar";
import React from "react";
import SearchResultBoard from './components/SearchResultBoard';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <SearchBar/>
        <SearchResultBoard/>
      </React.Fragment>
    </div>
  );
}

export default App;
