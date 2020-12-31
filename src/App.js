import './App.css';
import SearchBar from "./components/SearchBar";
import React from "react";
import SearchResultBoard from './components/SearchResultBoard';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      foundPokemons: [],
    };
  }

  handleSearch = (e) =>{
    if(e.key==="Enter"){
      
      fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`).then(response=>{
        return response.json();
      }).then(data=>{
        console.log(data)
        const newPokemon = {name: data.name,
          type: data.types[0].type.name,
          imageURL: data.sprites.front_default
        };

        this.setState((prevState)=>({foundPokemons: [...prevState.foundPokemons, newPokemon]}))
        console.log(this.state.foundPokemons)
      }).catch(()=>console.log("Could not find a pokemon with specified name"))
    }
  }

  render(){
    return (
      <div className="App">
          <SearchBar onConfirm={this.handleSearch}/>
          <SearchResultBoard/>
      </div>
    );
  }
  
}

export default App;
