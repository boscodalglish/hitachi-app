import React, { useState } from "react";

const Search = (props) => {
    let { results } = props;
    let options = [];

    
    if (props.results === undefined) {
        options = (<h1>No Data</h1>)
    } else {
        options = results.map((r, index) => (
            <div key={index} className="container-result-item">
                <div className="container-result-card">
                    <div className="container-result-card-title">
                        {r.title}
                    </div>
                    <div className="container-result-card-description">
                        {r.body}
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <>
            {options}
        </>
    );
};

export default Search;