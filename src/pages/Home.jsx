import React from "react";
import { Alert } from "@mui/material";
import {
  Header,
  TrendingMovies,
  Loading,
  Upcoming,
  Popular,
  Navigations,
  Footer,
} from "../components";
const Home = () => {
  return (
    <main>
      <Header />
      <Popular />
      <Upcoming />
      <TrendingMovies />
      <Footer />
    </main>
  );
};

export default Home;
