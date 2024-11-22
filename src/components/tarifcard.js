import React, { useState } from 'react';
import '../styles/tarif.css';
import { useSelector } from "react-redux";

function TarifCard (props) {
    const isAuth = useSelector((state) => state.auth);
    const [state, setState] = useState({
        fontColor: 'black',
        borderStyle: 'none'
    })

    if(props.color=='#000000'&&state.fontColor=='black'){
        setState({...state, fontColor: 'white'})
    }

    if(isAuth&&props.current&&state.borderStyle=='none'){
        setState({...state, borderStyle: `2px solid ${props.color}`})
    }

    
    return (
        <div className="tarif-card" style={{border: state.borderStyle}}>
            <div className="card-head" style={{backgroundColor: props.color,
            backgroundImage: `url(${props.img})`, color: state.fontColor}}>
                <h1>{props.title}</h1>
                <span>{props.subtitle}</span>                
            </div>
            {isAuth&&props.current ? <div className="current-tarif">Текущий тариф</div>: null}
            <div className='prices'><span className="price pos1">{props.price}</span>
            <span className="price old-price pos2">{props.prev}</span></div>
            <span className='w400 credit'>{props.credit}</span>
            <h3 className="list-name">В тариф входит:</h3>
                <ul className="list-tarif">
                    {props.list.length !=0 ? props.list.map((item, index) => <li className="w400" key={index}>{item}</li>): null}
                </ul>
            {isAuth&&props.current ? <button className="detail-button cur-col">Перейти в личный кабинет</button> :<button className="detail-button">Подробнее</button>}
        </div>
    )
}

export default TarifCard;