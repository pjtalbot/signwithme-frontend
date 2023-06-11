import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Link, NavLink } from "react-router-dom"
import Gif  from "./Gif.jsx"
import axios from "axios"

const giphy_api_key = process.env.REACT_APP_GIPHY_API_KEY
const backend_url = process.env.REACT_APP_BACKEND_URL



const Search = () => {
    

    const [search, setSearch] = useState('')
    const [apiResponse, setApiResponse] = useState('')
    const [giphyUser, setGiphyUser] = useState('signwithrobert')
    const [imgSources, setImgSources] = useState([])

    const [searchResults, setSearchResults] = useState([])

    const INITIAL_STATE = {
        search: '',
        limit: 10,
        library: giphyUser
    }



    const [formData, setFormData] = useState(INITIAL_STATE)

    const callAPI = async () => {
        let response = await axios.get(backend_url);
        setApiResponse({response});
    }
    
    const runSearch = (data) => {
        
        setSearch(data.search)
        setGiphyUser(data.library)
    }
    // const myQuery = useMemo(() => ({search}, [search]))


    // TODO: instead use useEffect, with second prop. Maybe pass empty array?
    // TODO: Move to helper function


    console.log(formData)



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

        console.log(formData)
        let tempSearch = formData.search

        
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
 * */ 

    
    useEffect(() => {
        let sourcesArr = []

        if(!search) {
            console.log('In EFFECT')
            async function getTopResults() {
                // TODO, move API key to .env
                let key = giphy_api_key
                const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}=%40${giphyUser}&limit=5&offset=0&lang=en`)
                setSearchResults(res.data)

                res.data.data.forEach(searchResult => {
                    sourcesArr.push(searchResult)
                })

                setImgSources(sourcesArr)
            }
            getTopResults();
        } else {
            async function getSearchResults(search, giphyUser) {
                let key = giphy_api_key
                const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}=%40${giphyUser}+${search}&limit=10`)

                setSearchResults(res.data)
                res.data.data.forEach(searchResult => {
                    sourcesArr.push(searchResult)
                });
                setImgSources(sourcesArr)
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
                    value={formData.search} onChange={handleChange}/>
                    {/* <label htmlFor="library">Library</label>
                    <input className="form-control" id ="search" type="text" name="library" placeholder="signwithrobert"
                    value={formData.name} onChange={handleChange}/> */}
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
                    <button className="btn btn-primary">Go!</button>
                </div>
            </form>
            {console.log(searchResults.data)}
            <div className="container">
                {imgSources.length === 0 &&
                [1].map((i) => {
                    return (
                        <div>
                            <h3>No Results Found.</h3>
                        </div>
                    )
                })};
                
                { imgSources.length > 0 &&
                imgSources.map((src) => {
                    const data = JSON.stringify(src);
                    return (
                        <div>
                            <Gif  data={src} key ={src}/>
                        </div>
                )     
     })}
            </div>
        </div>
    )
    }

export default Search

