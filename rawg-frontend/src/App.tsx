import { useState } from "react";

import { Grid, GridItem, Show } from "@chakra-ui/react";

import "./App.css";
import { GameGrid } from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { NavBar } from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import StoreList from "./components/StoreList";
import type { Platform } from "./hooks/useGames";
import type { Genre } from "./hooks/useGenres";
import type { Store } from "./hooks/useStores";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  store: Store | null;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleSelectGenre = (genre: Genre | null) => {
    setGameQuery((prev) => ({ ...prev, genre }));
  };

  const handleSelectPlatform = (platform: Platform | null) => {
    setGameQuery((prev) => ({ ...prev, platform }));
  };

  const handleSelectStore = (store: Store | null) => {
    setGameQuery((prev) => ({ ...prev, store }));
  };

  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem pl="2" area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"aside"}>
          <GenreList
            onSelectGenre={handleSelectGenre}
            selectedGenre={gameQuery.genre}
          />
          <StoreList
            onSelectStore={handleSelectStore}
            selectedStore={gameQuery.store}
          />
        </GridItem>
      </Show>
      <GridItem pl="2" area={"main"}>
        <PlatformSelector
          onSelectPlatform={handleSelectPlatform}
          selectedPlatform={gameQuery.platform}
        />
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
