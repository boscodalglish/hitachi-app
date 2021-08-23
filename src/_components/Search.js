import React, { useEffect, useState } from "react";
// import { Container, Row, Col } from 'react-bootstrap';
import mainLogo from "../_assets/_images/PNG/logo.png";
import searchLogo from "../_assets/_images/PNG/Search.png";

import Suggestions from "./Suggestions";

export function Search() {
    const API_URL = `https://jsonplaceholder.typicode.com`;

    let [query, setQuery] = useState("");
    let [results, setResults] = useState([]);
    let [apiurl, setApiurl] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [dataempty, setDataempty] = useState(false);

    useEffect(() => {
        let fetchData = async () => {
            if (query !== "") {
                await fetch(apiurl)
                    .then((response) => response.json())
                    .then((jsonResponse) => {
                        if (jsonResponse.length !== 0) {
                            setResults(jsonResponse);
                            setLoading(false);
                            setDataempty(false);
                            setErrorMessage(false);
                            console.log(jsonResponse, "jsonResponse");
                        } else {
                            setResults([]);
                            setLoading(false);
                            setDataempty(true);
                            console.log(jsonResponse, "jsonResponse2");
                        }
                    })
                    .catch((err) => {
                        alert("API is not working! Refresh");
                        setErrorMessage(true);
                    });
            }
        };
        fetchData();
        return () => { };
    }, [apiurl]);

    let handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setApiurl(`${API_URL}/users/${query}/posts`);
    };

    return (
        <div className="container">
            <div className="container-image-logo">
                <img src={mainLogo} alt="companylogo" name="companylogo"/>
            </div>
            <div className="container-search">
                <div className="container-search-bar">
                    <label>Search by User ID</label>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                title="search"
                                className="form-control"
                                placeholder="eg. 1"
                                name="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoCorrect="off"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                }}
                            />
                            <button className="container-search-button" type="submit">
                                <img src={searchLogo} alt="searchlogo" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container-result">
                <p className="">{results.length} Results</p>
            </div>
            <div className="container-result-search">
                {results && !errorMessage && !dataempty && !loading ? (
                    <Suggestions results={results} />
                ) : loading && !errorMessage && !dataempty ? (
                    <h1 className="loading">loading...</h1>
                ) : errorMessage && !dataempty ? (
                    <div className="nodata">
                        <h1 className="">
                            <span>API broken</span>
                        </h1>
                    </div>
                ) : dataempty ? (
                    <div className="nodata">
                        <h1 className="">
                            <span></span>
                        </h1>
                    </div>
                ) : (
                    // <Suggestions results={results} />
                null)}
            </div>
        </div>
    );
}

export default Search;
