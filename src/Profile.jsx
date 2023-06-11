

import React, { useEffect, useState } from "react";
import axios from "axios";
import Gif from "./Gif.jsx";

const giphyApiKey = process.env.REACT_APP_GIPHY_API_KEY

const Profile = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      if (localStorage.getItem("favoriteId") !== null) {
        const favoriteIds = JSON.parse(localStorage.getItem("favoriteId"));
        const favoritesData = await getDataById(favoriteIds);
        setFavorites(favoritesData);
      }
    };

    fetchFavoritesData();
  }, []);

  const getDataById = async (ids) => {
    const promises = ids.map(async (id) => {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/${id}?api_key=${giphyApiKey}`
      );

      if (response.data.meta.status === 200) {
        return response.data.data;
      } else {
        console.log(response.data.meta.msg);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter((result) => result !== null);
  };

  return (
    <div >
      <h3 className="h2 pt-4">Favorites</h3>
      <div className="container">
      <div className="row row-cols-2 row-cols-md-3">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div  className="col mb-4">
              <div className="gif-container" >
              <Gif data={favorite} key={favorite.id}/>
              </div>
            </div>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>

      </div>

    </div>
  );
};

export default Profile;