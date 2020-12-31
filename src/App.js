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
      hasError: false
    };
  }

  handleSearch = (e) =>{
    if(e.key==="Enter" && e.target.value!==""){
      
      fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value.toLowerCase()}`).then(response=>{
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
        this.setState({hasError: false})
      })
      .catch(
        ()=>this.setState({hasError: true})
        )
e.target.value="";
    }
    
  }

  render(){
    return (
      <div className="App">
          <SearchBar hasError={this.state.hasError} onConfirm={this.handleSearch}/>
          <SearchResultBoard pokemons={this.state.foundPokemons}/>
      </div>
    );
  }
  
}

export default App;
