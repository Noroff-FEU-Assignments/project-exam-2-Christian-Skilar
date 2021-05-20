
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CircleLoading } from 'react-loadingg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { API } from "../constants/Api";

function Search() {


  const [hotels, sethotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API + "/hotels");
        const json = await response.json();
        console.log(json);
        sethotels(json);
  
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  if (loading) {
    return  <div className="loading">
              <CircleLoading />
            </div>;

  }
  
  if (error) {
    return <div>Ups, something went wrong: {error}</div>;
  }

  return (
          <div className="src-container">
          <h2>Search hotels</h2>
              <div className="search-bar-dropdown">

                  <input
                     onClick={() => setShow(!show)}
                      type="text"
                      className="search-input"
                      placeholder="Search"
                      onChange={event => {setSearch(event.target.value)}}
                  />
                  <FontAwesomeIcon className="iicons fa-lg" icon="caret-down" onClick={() => setShow(!show)} />
                {
                show?
                    <ul id="results" className="list-group">
                        {hotels.filter((value) => {
                            if (search === "") {
                                return value
                        } else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                                return value
                        } else {
                          return null
                        }
                        }).map((option) => {
                                return (
                                      <Link className="serchBox-links" key={option.id} to={`detail/${option.id}`}>{option.name}</Link>
                        );
                      })}
                    </ul>:null
                }
              </div>
          </div>
  );
}

export default Search;

//----------------------------------------------
//
//
//
/*


import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { API } from "../constants/Api";

class Search extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      query: '',
      results: {},
    }
  }

  fetchSearchResults = () => {
    const searchUrl = API;

    axios.get(searchUrl)
    .then(res => {
      this.setState({
        results: res.data
      })
    })
    .catch( error => {
      if(error) {
      }
    })
  }

  inputChange = (event) => {
    const query = event.target.value;
    if ( ! query ) {
      this.setState({query, results: {}});
    } else {
      this.setState({query: query}, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  searchResults = () => {
    const {results} =this.state;

    if (Object.keys(results).length && results.length) {
      return(
        <div className="results-container">
        {results.map(result => {
          return(
            <Link className="serchBox-links" key={result.id} to={`detail/${result.id}`}>{result.name}</Link>
          )
        })}
      </div>
      )
    }
  }

  render() {
    const { query } = this.state;
    return (
      <div className="src-container">
        <h2>Hotel Search</h2>
        <label class="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Where you want to sleep?"
            onChange={this.inputChange}
          />
        </label>

        {this.searchResults()}
      </div>
    )
  }

}

export default Search;


*/
