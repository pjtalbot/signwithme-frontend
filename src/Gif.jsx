import React, { useState, useEffect } from "react";
import axios from 'axios'
import heartIcon from './resources/lover.png'


const giphy_api_key = process.env.REACT_APP_GIPHY_API_KEY
const backend_url = process.env.REACT_APP_BACKEND_URL


function Gif({ data }) {
  const [favorite, setFavorite] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [apiResponse, setApiResponse] = useState('')

  const checkExists = async (giphyId) => {
    let response = await axios.get(`${backend_url}gifs/${data.id}`)
    if (response.data.length === 0) {
      console.log('checkExists ===> false')
      return false
    }
    return true
  }

  const upVote = async () => {
    let exists = await checkExists(data.id)
    if(!exists) {
      let req = {"data": {"id": `${data.id}`, "url": `${data.url}`, "user": {"username": `${data.user.username}`}}}
      let response = await axios.post(`${backend_url}gifs`, req)
      return response;
    } else {
      let response = await axios.post(`${backend_url}gifs/${data.id}/up`)
      return response
    }
  }

  const downVote = async () => {

    let response = await axios.post(`${backend_url}gifs/${data.id}/down`)
    return response
  }

  let favorites;

  const handleMirrorButton = () => {
    setMirror(!mirror);
  };

  const handleFavoriteButton = async () => {
    let updatedFavorites = [];
    favorites = JSON.parse(localStorage.getItem("favoriteId"));
  
    if (favorite) {
      updatedFavorites = favorites.filter((id) => id !== data.id);
      localStorage.setItem("favoriteId", JSON.stringify(updatedFavorites));
      setFavorite(!favorite);
      downVote()
    } else {
      updatedFavorites = [...favorites, data.id];
      localStorage.setItem("favoriteId", JSON.stringify(updatedFavorites));
      setFavorite(!favorite);
      upVote()
    }
  
    console.log(`currentState: ${JSON.stringify(favorite)}`);
    console.log(data.id);
    console.log(`change state to: ${!favorite}`);
  };

  useEffect(() => {
    // Check if the gif is in favorites using the data.id and update the favorite state
    const favorites = JSON.parse(localStorage.getItem("favoriteId")) || [];
    const isFavorite = favorites.includes(data.id);
    setFavorite(isFavorite);
  }, [data.id, favorite]);

  const mirrored = mirror ? "mirrored img-fluid gif-img" : " img-fluid gif-img";
  const isFavorite = favorite ? "favorite" : "";

  function transformTitleString(titleString) {
    
    let credit = titleString.substring(titleString.indexOf('GIF'))
    let trimmedTitle = (titleString.substring(0, titleString.indexOf('GIF'))).toLowerCase()
    if (trimmedTitle.includes('sign language')) {

      trimmedTitle = (trimmedTitle.replace('sign language', ''));

      return [trimmedTitle.toUpperCase(), credit];
    } 

    return [trimmedTitle.toUpperCase(), credit];
  }

  let gifTextArray = transformTitleString(data.title);

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="card-img-top">
          <img src={data.images.downsized.url} alt={data.slug} className={mirrored} />
          <button className={`favorite-btn ${isFavorite} btn rounded shadow`} onClick={handleFavoriteButton}></button>
          <button onClick={handleMirrorButton}className="btn border border-2 mirror-btn btn btn-secondary shadow">Mirror</button>
          {(data.title != '' || data.title === null) ? <h5 className="card-title py-5">{gifTextArray[0]}</h5> : <h5 className="card-title py-5"> No description available</h5>}
          <p className="card-text">{gifTextArray[1]}.</p>
        </div>
      </div>
    </div>
  );
}

export default Gif;
