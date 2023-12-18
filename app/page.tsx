"use client";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState } from "react";

interface poke {
  id: number;
  name: string;
  abilities: object;
  weigth: number;
  sprite: string;
}
export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState({
    id: "",
    name: "",
    abilities: { ability1: "", ability2: "" },
    weigth: "",
    sprite: "",
  });
  function takeValueSearch(event) {
    setPokemonName(event.target.value);
    console.log(event.target.value);
  }
  async function searchPokemon() {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.abilities && response.data.abilities.length >= 2) {
        setResponse({
          id: response.data.id,
          abilities: {
            ability1: response.data.abilities[0].ability.name,
            ability2: response.data.abilities[1].ability.name,
          },
          name: response.data.name,
          weigth: response.data.weight,
          sprite: response.data.sprites.front_shiny,
        });
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <input placeholder="Enter Pokemon Name" onChange={takeValueSearch} />
      <button onClick={searchPokemon}>Search</button>
      {errorMessage && <p>{errorMessage}</p>}
      {response && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <p>
              Hi, my name is{" "}
              <span style={{ color: "yellow" }}>{response.name}</span>
            </p>
            <img src={response.sprite} alt="" />
          </Box>

          <Box>
            <p>
              My weigth is{" "}
              <span style={{ color: "black" }}>{response.weigth}</span>
            </p>
          </Box>
        </Box>
      )}
    </Box>
  );
}
