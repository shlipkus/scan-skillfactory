import React from "react";

function Card(props) {
    return (
        <div className="card">
            <div className="image-container" style={{maskImage: `url(${props.cardImg})`}}>
            </div>
            <span>{props.cardText}</span>
        </div>
    )
}

export default Card;