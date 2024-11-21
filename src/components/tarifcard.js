import React from 'react';
import '../styles/tarif.css'

function TarifCard (props) {
    const isAuth = false;
    let fontColor = 'black';
    let borderStyle = 'none';
    if(props.color=='#000000'){
        fontColor='white'
    }

    if(isAuth){
        borderStyle="2px solid";
    }

    return (
        <div className="tarif-card" style={{border: borderStyle, borderColor: props.color}}>
            <div className="card-head" style={{backgroundColor: props.color,
            backgroundImage: `url(${props.img})`, color: fontColor}}>
                <h1>{props.title}</h1>
                <span>{props.subtitle}</span>                
            </div>
            {isAuth ? <div className="current-tarif">Текущий тариф</div>: null}
            <div className='prices'><span className="price pos1">{props.price}</span>
            <span className="price old-price pos2">{props.prev}</span></div>
            <span className='w400 credit'>{props.credit}</span>
            <h3 className="list-name">В тариф входит:</h3>
                <ul className="list-tarif">
                    {props.list.length !=0 ? props.list.map((item, index) => <li className="w400" key={index}>{item}</li>): null}
                </ul>
            <button className="detail-button">Подробнее</button>
        </div>
    )
}

export default TarifCard;