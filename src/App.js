import { useCallback, useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies, clearMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import TrailerModal from "./components/TrailerModal";
import "./app.scss";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const closeModal = () => {
    setOpen(false);
    setVideoKey();
  };

  const getSearchResults = useCallback(
    (query, page = 1) => {
      if (query !== "") {
        dispatch(
          fetchMovies(`${ENDPOINT_SEARCH}&query=` + query + "&page=" + page)
        );
        setSearchParams(createSearchParams({ search: query }));
      } else {
        dispatch(fetchMovies(ENDPOINT_DISCOVER + "&page=" + page));
        setSearchParams();
      }
    },
    [dispatch, setSearchParams]
  );

  const searchMovies = useCallback(
    (query) => {
      dispatch(clearMovies());
      setCurrentPage(1);
      getSearchResults(query);
    },
    [dispatch, getSearchResults]
  );

  const getMovies = (page = 1) => {
    if (searchQuery) {
      dispatch(
        fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery + "&page=" + page)
      );
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER + "&page=" + page));
    }
  };

  const loadMoreMovies = () => {
    if (currentPage < movies.pages) {
      let newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (!searchQuery) {
        getMovies(newPage);
      } else {
        getSearchResults(searchQuery, newPage);
      }
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchQuery={searchQuery} />

      <div className="container">
        <TrailerModal
          isOpen={isOpen}
          videoKey={videoKey}
          closeModal={closeModal}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                loadMore={loadMoreMovies}
                currentPage={currentPage}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
