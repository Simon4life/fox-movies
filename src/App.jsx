import { useState } from 'react'
import {
  Home,
  Discover,
  Search,
  SingleMovie,
  Error,
  WatchList,
  AllMovies,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigations } from "./components";


function App() {
  return (
    <BrowserRouter>
      <Navigations />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/single-movie/:id" element={<SingleMovie />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/all-movies/:section" element={<AllMovies />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
