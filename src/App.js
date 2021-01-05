import "./styles/SearchModule.css";
import "./App.css";

import SearchBar from "./components/SearchBar";
import React from "react";
import SearchResultBoard from "./components/SearchResultBoard";
import Pokedex from "./components/Pokedex";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foundPokemons: [],
      pokedex: [],
      hasError: false,
      isPokemonFound: false,
      isPokemonInPokedex: false,
      isPokedexOpen: false,
    };
  }

  handlePokedexButtonClick = () => {
    this.setState({ isPokedexOpen: !this.state.isPokedexOpen });
  };

  handlePokemonSave = (pokemonName) => {
    const filteredPokemons = this.state.foundPokemons.filter((pokemon) => {
      return pokemon.name === pokemonName;
    });
    const currentPokemon = filteredPokemons[0];

    if (
      !this.searchForNameInArrayOfObjects(
        this.state.pokedex,
        currentPokemon.name
      )
    ) {
      this.savePokemonInPokedex(currentPokemon);
      this.removePokemonFromView(currentPokemon);
    }
  };

  searchForNameInArrayOfObjects = (array, searchedItem) => {
    const regex = new RegExp(`^${searchedItem}$`, "i")
    let isPokemonPresent = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].name.match(regex)!==null||regex.test(array[i].id)) {
        isPokemonPresent = true;
        break;
      }
    }
    return isPokemonPresent;
  };

  savePokemonInPokedex = (pokemonToSave) => {
    this.setState(
      (prevState) => ({ pokedex: [...prevState.pokedex, pokemonToSave] }),
      function () {
        // console.log(`Pokedex`, this.state.pokedex);
      }
    );
  };

  removePokemonFromView = (pokemonToRemove) => {
    const filteredPokemons = this.state.foundPokemons.filter((pokemon) => {
      return pokemon.name !== pokemonToRemove.name;
    });
    this.setState({ foundPokemons: filteredPokemons }, function () {
      // console.log(`Found Pokemons`, this.state.foundPokemons);\
      this.sortPokedex();
    });
  };

  sortPokedex = () => {
    const sortedPokedex = this.state.pokedex.sort((a, b) => {
      return a.id - b.id;
    });
    this.setState({ pokedex: sortedPokedex });
  };


  handleSearch = (e) => {
    if (e.key !== "Enter" || e.target.value === "") return;
    const searchedName = e.target.value;
    const isPokemonInPokedex = this.searchForNameInArrayOfObjects(
      this.state.pokedex,
      searchedName
    );
    const isPokemonInResultBoard = this.searchForNameInArrayOfObjects(
      this.state.foundPokemons,
      searchedName
    );

    if (isPokemonInPokedex === false && isPokemonInResultBoard === false) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value.toLowerCase()}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const newPokemon = {
            id: data.id,
            name: data.name[0].toUpperCase() + data.name.slice(1),
            type:
              data.types[0].type.name[0].toUpperCase() +
              data.types[0].type.name.slice(1),
            imageURL: data.sprites.front_default,
          };

          this.setState((prevState) => ({
            foundPokemons: [...prevState.foundPokemons, newPokemon],
          }));
          this.setState({ hasError: false });
          this.setState({ isPokemonFound: false });
          this.setState({ isPokemonInPokedex: false });
        })
        .catch(() =>
          this.setState({
            hasError: true,
            isPokemonFound: false,
            isPokemonInPokedex: false,
          })
        );
      e.target.value = "";
    } else {
      if (isPokemonInPokedex) {
        this.setState({
          isPokemonInPokedex: true,
          hasError: false,
          isPokemonFound: false,
        });
      } else {
        this.setState({
          isPokemonFound: true,
          hasError: false,
          isPokemonInPokedex: false,
        });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Pokedex
          isPokedexOpen={this.state.isPokedexOpen}
          onPokedexButtonClick={this.handlePokedexButtonClick}
          pokedex={this.state.pokedex}
          className="Pokedex Pokedex--small"
        />
        <div className="SearchModule SearchModule--large">
          <SearchBar
            isPokemonFound={this.state.isPokemonFound}
            isPokemonInPokedex={this.state.isPokemonInPokedex}
            hasError={this.state.hasError}
            onConfirm={this.handleSearch}
          />
          <SearchResultBoard
            pokemons={this.state.foundPokemons}
            onPokemonSave={this.handlePokemonSave}
          />
        </div>
      </div>
    );
  }
}

export default App;
