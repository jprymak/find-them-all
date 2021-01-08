import "./styles/SearchModule.css";
import "./App.css";

import SearchBar from "./components/SearchBar";
import React from "react";
import SearchResultBoard from "./components/SearchResultBoard";
import Pokedex from "./components/Pokedex";

let post;
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
      isFetchingData: false,
    };
  }

  handlePokedexChooseItemButtonClick = (pokemonId) => {
    this.showPokemonInView(pokemonId);
  };

  showPokemonInView = (pokemonId) => {
    const pokemonToShow = this.state.pokedex.find(
      (pokemon) => pokemon.id === pokemonId
    );

    this.setState((prevState) => {
      const pokedex = prevState.pokedex.filter(
        (pokemon) => pokemon !== pokemonToShow
      );
      return {pokedex}
    });

    this.setState((prevState) => {
      const foundPokemons = [...prevState.foundPokemons, pokemonToShow ]
      return {foundPokemons}
    });
    
  };

  handlePokedexButtonClick = () => {
    this.setState({ isPokedexOpen: !this.state.isPokedexOpen });
  };

  handlePokemonSave = (pokemonName) => {
    const filteredPokemons = this.state.foundPokemons.filter((pokemon) => {
      return pokemon.name === pokemonName;
    });
    const currentPokemon = filteredPokemons[0];

    if (
      !this.checkIfArrayIncludesObjectWithCertainKeyValue(
        this.state.pokedex,
        currentPokemon.name
      )
    ) {
      this.savePokemonInPokedex(currentPokemon);
      this.removePokemonFromView(currentPokemon);
    }
  };

  checkIfArrayIncludesObjectWithCertainKeyValue = (array, keyValue) => {
    const regex = new RegExp(`^${keyValue}$`, "i");
    let includes = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].name.match(regex) !== null || regex.test(array[i].id)) {
        includes = true;
        break;
      }
    }
    return includes;
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
      // console.log(`Found Pokemons`, this.state.foundPokemons);
      this.sortPokedex();
    });
  };

  sortPokedex = () => {
    const sortedPokedex = this.state.pokedex.sort((a, b) => {
      return a.id - b.id;
    });
    this.setState({ pokedex: sortedPokedex });
  };

  getPokemonTypes = (types) => {
    let typeNames = "";
    types.forEach((obj) => {
      typeNames =
        typeNames + obj.type.name[0].toUpperCase() + obj.type.name.slice(1);
      if (types.indexOf(obj) !== types.length - 1) {
        typeNames += "/";
      }
    });

    return typeNames;
  };

  getPokemonAbilities = (abilities) => {
    const promiseArray = [];

    abilities.forEach((obj) => {
      promiseArray.push(fetch(obj.ability.url));
    });
    console.log(promiseArray);

    return promiseArray;
  };

  handleSearch = (e) => {
    if (
      e.key !== "Enter" ||
      e.target.value === "" ||
      this.state.isFetchingData === true
    )
      return;
    const searchedName = e.target.value;
    const isPokemonInPokedex = this.checkIfArrayIncludesObjectWithCertainKeyValue(
      this.state.pokedex,
      searchedName
    );
    const isPokemonInResultBoard = this.checkIfArrayIncludesObjectWithCertainKeyValue(
      this.state.foundPokemons,
      searchedName
    );

    if (isPokemonInPokedex === false && isPokemonInResultBoard === false) {
      this.setState({ isFetchingData: true });
      fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value.toLowerCase()}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          post = data;

          return Promise.all(this.getPokemonAbilities(data.abilities));
        })
        .then((responses) => {
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then((data) => {
          const abilitiesArray = [];

          const newPokemon = {
            id: post.id,
            name: post.name[0].toUpperCase() + post.name.slice(1),
            type: this.getPokemonTypes(post.types),
            imageURL: post.sprites.front_default,
          };
          data.forEach((obj) => {
            const name = obj.name;
            let description = "";
            for (let i = 0; i < obj.effect_entries.length; i++) {
              if (obj.effect_entries[i].language.name === "en") {
                description = obj.effect_entries[i].effect;
                break;
              }
            }
            const ability = { name, description };
            abilitiesArray.push(ability);
          });
          newPokemon.abilities = abilitiesArray;

          console.log(data);
          this.setState((prevState) => ({
            foundPokemons: [...prevState.foundPokemons, newPokemon],
          }));
          this.setState({ isFetchingData: false });
          this.setState({ hasError: false });
          this.setState({ isPokemonFound: false });
          this.setState({ isPokemonInPokedex: false });
        })
        .catch(() =>
          this.setState({
            isFetchingData: false,
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
          onPokedexChooseItemButtonClick={
            this.handlePokedexChooseItemButtonClick
          }
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
