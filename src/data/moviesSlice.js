import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    pages: 0,
    fetchStatus: "",
  },
  reducers: {
    clearMovies(state) {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const newMovies = action.payload.results;
        const movieIds = state.movies.map((movie) => movie.id);
        const uniqueNewMovies = newMovies.filter(
          (movie) => !movieIds.includes(movie.id)
        );
        state.movies = [...state.movies, ...uniqueNewMovies];
        state.pages = action.payload.total_pages;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const { clearMovies } = moviesSlice.actions;

export default moviesSlice;
