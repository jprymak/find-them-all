import './App.css';
import SearchBar from "./components/SearchBar";
import React from "react";
import SearchResultBoard from './components/SearchResultBoard';
import { v4 as uuidv4 } from 'uuid';

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
        const newPokemon = {
          id: uuidv4(),
          name: data.name[0].toUpperCase() +  data.name.slice(1),
          type: data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1),
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
          <SearchResultBoard pokemons={this.state.foundPokemons}/>
      </div>
    );
  }
  
}

export default App;
