"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState({
    id: "",
    name: "",
    abilities: { ability1: "", ability2: "" },
    weigth: 0,
  });
  function takeValueSearch(event) {
    setPokemonName(event.target.value);
    console.log(event.target.value);
  }
  async function searchPokemon() {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await axios.get(url);
      const id = response.data.id;
      console.log(response.data);
      if (response.data.abilities && response.data.abilities.length >= 2) {
        setResponse({
          id: response.data.id,
          abilities: {
            ability1: response.data.abilities[0].ability.name,
            ability2: response.data.abilities[1].ability.name,
          },
          name: response.data.name,
          weigth: response.data.weigth,
        });
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  }
  return (
    <div>
      <input placeholder="Enter Pokemon Name" onChange={takeValueSearch} />
      <button onClick={searchPokemon}>Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      {response && (
        <div>
          <p>{response.id}</p>
          <p>{response.abilities.ability1}</p>
          <p>{response.abilities.ability2}</p>
          <p>{response.name}</p>
          <p>{response.weigth}</p>
        </div>
      )}
    </div>
  );
}
