import React, { useState, useEffect } from "react";
import axios from 'axios'


const backend_url = process.env.REACT_APP_BACKEND_URL

let favorites =[];


function Gif({ data }) {
  const [favorite, setFavorite] = useState(false);
  const [mirror, setMirror] = useState(false);

  // checks DB for existing row with Giphy ID
  // NOTE: Does NOT check with serial id from our DB. column giphy_id
  const checkExists = async (giphyId) => {
    let response = await axios.get(`${backend_url}gifs/${data.id}`)
    if (response.data.length === 0) {
      console.log('checkExists ===> false')
      return false
    }
    return true
  }

  
  // increments count column for Gif in backend db
  // If give is not present, creates row for gif
  const upVote = async () => {
    let exists = await checkExists(data.id)
    if(!exists) {
      // column "user" refers to the Giphy account user name that created original gif
      let req = {"data": {"id": `${data.id}`, "url": `${data.url}`, "user": {"username": `${data.user.username}`}}}
      let response = await axios.post(`${backend_url}gifs`, req)
      return response;
    } else {
      let response = await axios.post(`${backend_url}gifs/${data.id}/up`)
      return response
    }
  }

  /* updates count column in backend db */
  const downVote = async () => {
    let response = await axios.post(`${backend_url}gifs/${data.id}/down`)
    return response
  }

/*  Toggles state mirror */
  const handleMirrorButton = () => {
    setMirror(!mirror);
  };

  
  /* Favorites gif, adds id to local storage
  // checks if backend DB has ID already
  // If so, increments of decrements, depending on "favorite" state
  */
  
  const handleFavoriteButton = async () => {
    let updatedFavorites = [];
    
      favorites = JSON.parse(localStorage.getItem("favoriteId"));
      if (!favorites) {
        favorites = []
      }
    
    
  
    if (favorite) {
      console.log(favorites)
      updatedFavorites = favorites.filter((id) => id !== data.id);
      localStorage.setItem("favoriteId", JSON.stringify(updatedFavorites));
      setFavorite(!favorite);
      downVote()
    } else if (!favorite) {
      console.log(favorites)
      updatedFavorites = [...favorites, data.id];
      localStorage.setItem("favoriteId", JSON.stringify(updatedFavorites));
      setFavorite(!favorite);
      upVote()
    }
  };

  /*
  Checks favoriteId local storage for Gif's id and sets favorite state before render.
  */

  useEffect(() => {
    // Check if the gif is in favorites using the data.id and update the favorite state
    const favorites = JSON.parse(localStorage.getItem("favoriteId")) || [];
    const isFavorite = favorites.includes(data.id);
    setFavorite(isFavorite);
  }, [data.id, favorite]);

  const mirrored = mirror ? "mirrored img-fluid gif-img" : " img-fluid gif-img";
  const isFavorite = favorite ? "favorite" : "";

  /*
  Generates usable data where provided in slug from Giphy
  returns Array with length of 2, trimmedTitle (used as text definition and img alt)
  */
  function transformTitleString(titleString) {
    
    let credit = `GIF by ${data.username}`
    let trimmedTitle = (titleString.substring(0, titleString.indexOf('GIF'))).toLowerCase()
    if (trimmedTitle.includes('sign language')) {

      trimmedTitle = (trimmedTitle.replace('sign language', ''));

      return [trimmedTitle.toUpperCase(), credit];
    } 

    return [trimmedTitle.toUpperCase(), credit];
  }

  let gifTextArray = transformTitleString(data.title);

  return (
    <div className="card shadow" key={data.id}>
      <div className="card-body">
        <div className="card-img-top">
          <img src={data.images.downsized.url} alt={data.slug} className={mirrored} />
          <button className={`favorite-btn ${isFavorite} btn rounded shadow`} onClick={handleFavoriteButton}></button>
          <button onClick={handleMirrorButton}className="btn border border-2 mirror-btn btn btn-secondary shadow">Mirror</button>
          {(data.title !== '' || data.title === null) ? <h5 className="card-title py-5">{gifTextArray[0]}</h5> : <h5 className="card-title py-5"> No description available</h5>}
          <p className="card-text">{gifTextArray[1]}.</p>
        </div>
      </div>
    </div>
  );
}

export default Gif;
