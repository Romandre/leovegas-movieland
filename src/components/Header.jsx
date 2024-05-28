import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import "../styles/header.scss";

const Header = ({ searchMovies, searchQuery }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const navigate = useNavigate();

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          defaultValue={searchQuery}
          data-testid="search-movies"
          onChange={(e) => searchMovies(e.target.value)}
          onClick={() => navigate("/")}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
