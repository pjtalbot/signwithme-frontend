import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Link, NavLink } from "react-router-dom"
import Gif  from "./Gif.jsx"
import axios from "axios"

const giphy_api_key = process.env.REACT_APP_GIPHY_API_KEY
const backend_url = process.env.REACT_APP_BACKEND_URL


const Search = () => {
    
    const [search, setSearch] = useState('')
    const [giphyUser, setGiphyUser] = useState('signwithrobert')
    const [imgSources, setImgSources] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [searchResults, setSearchResults] = useState([])

    const INITIAL_STATE = {
        search: '',
        limit: 10,
        library: giphyUser
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    /* Sets Search and GiphyUser state
    */
    const runSearch = (data) => {
        setSearch(data.search)

        setGiphyUser(data.library)
    }

    const handleChange = e => {
        const {name, value} = e.target

        setFormData(formData => {
            console.log(value)
            return (
                {
                ...formData,
                [name]: value
            })
        })
    }

const handleSubmit =  (e) => {
        e.preventDefault()
        console.log("handling submit")
        const { search, value }= e.target
        let tempSearch = formData.search.trim()
        setFormData({
            search: tempSearch,
            limit: formData.limit,
            library: formData.library,
        })
        let temp = formData
        runSearch(temp)
    }
/**
 *  This useEffect runs on initial load, and when giphyUser or query state changes
 * sets imgSources state. Array of src urls
 * 
 * On Initial render or if search term is null, it returns the 10 most popular Gifs from that Giphy User's Library
 * */ 

    
    useEffect(() => {
        let sourcesArr = []
        if(!search) {
            console.log('In EFFECT')
            async function getTopResults() {
                setIsLoading(true)
                const key = giphy_api_key
                const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}=%40${giphyUser}&limit=5&offset=0&lang=en`)
                setSearchResults(res.data)

                res.data.data.forEach(searchResult => {
                    sourcesArr.push(searchResult)
                })

                setImgSources(sourcesArr)
                setTimeout(() => {
                    setIsLoading(false)
                }, 200)
            }
            getTopResults();
        } else {
            async function getSearchResults(search, giphyUser) {
                setIsLoading(true)
                const key = giphy_api_key
                const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}=%40${giphyUser}+${search}&limit=10`)

                setSearchResults(res.data)
                res.data.data.forEach(searchResult => {
                    sourcesArr.push(searchResult)
                });
                setImgSources(sourcesArr)
                
                setTimeout(() => {
                    setIsLoading(false)
                }, 200)
            }
            getSearchResults(search, giphyUser)
        }
    },[search, giphyUser])

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="search" className="h3">Search</label>
                    <input className="form-control" id ="search" type="text" name="search" placeholder="Search"
                    value={formData.search} onChange={handleChange} maxLength={30}/>
                    <label htmlFor="library" className="h4 pt-4">Select Library </label>
                        <select className="form-select" name="library" multiple={false} defaultValue={"signwithrobert"} onChange={handleChange}>
                                            <option value="signwithrobert">Sign-With-Robert</option>
                                            <option value="islconnect">ISL connect</option>
                                            <option value="invest_in_access">Invest In Access</option>
                                            <option value="theaslgifs">The ASL GIFS</option>
                                            <option value="deafextreme">deafextreme</option>
                                            <option value="58creativity">58 Creativity</option>
                                            <option value="aslnook">ASL Nook</option>
                                            <option value="ASL_Connect">ASL Connect</option>
                        </select>
                    <button className="btn btn-primary my-3" id="search-button">Search!</button>
                </div>
            </form>
            {imgSources.length === 0 && !isLoading && (
                <div>
                    <h3>No Results Found.</h3>
                </div>
            )}

        {isLoading && (
            <div>
                <h3>Loading...</h3>
            </div>
        )}

        {imgSources.length > 0 && !isLoading && (
            <div>
                {imgSources.map((src) => {
                    return (
                        <div key={src.id} className="my-3">
                            <Gif data={src}  />
                        </div>
                    );
                })}
            </div>
            )}
            </div>
        
        )
    }

export default Search

