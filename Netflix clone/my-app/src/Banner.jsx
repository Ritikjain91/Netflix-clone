import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from 'axios';
import requests from './Request';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Request failed with status code", error.response.status);
      }
    }

    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  return (
    <header className="banner" style={{
      backgroundSize: "cover",
      backgroundImage: movie ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` : null,
      backgroundPosition: "center center"
    }}>
      <div className="banner__contents">
        <h1 className="banner__title">{movie ? movie.title || movie.name || movie.original_name : ""}</h1>
        <div className="banner__buttons">
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h1 className="banner__description">
          {movie && truncate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
