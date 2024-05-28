import { Fragment } from "react";
import Movie from "./Movie";
import InfiniteScroll from "./InfiniteScroll";

import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer, loadMore, currentPage }) => {
  return (
    <Fragment>
      <div className="grid" data-testid="movies">
        {movies.movies?.map((movie) => {
          return (
            <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
          );
        })}
      </div>
      {currentPage < movies.pages ? <InfiniteScroll loadMore={loadMore} /> : ""}
    </Fragment>
  );
};

export default Movies;
