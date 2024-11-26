import React, { useState } from 'react';
import '../../src/styles/results.css';
import { useSelector } from 'react-redux';
import spin from '../../public/assets/images/spinner.svg?url';



export default function Summary() {
    const sumData = useSelector((state) => state.sumData);

    const [states, setStates] = useState({
        slide: {
            x: 0,
            disLeft: true,
            disRight: true
        },
        isLoad: false,
    });
    let sumCards = [];

    if(sumData.length!=0 && !states.isLoad) {
        let dis = sumData[0].length <= 8
        
        setStates({
            ...states,
            slide: {
                ...states.slide,
                disRight: dis
            },
            isLoad: true
        })
    } 

    
    
    if(sumData.length!=0){
        const totalData = sumData[0].data;
        const riskData = sumData[1].data;
        totalData.map((item, index) => {
            let date = new Date(item.date);
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getFullYear();
            let formatedDate = day + '.' + month + '.' + year;

            sumCards.push({
                date: formatedDate,
                total: item.value,
                risk: riskData[index].value
            })
        })
    }

    function toLeft(){
        const el = document.querySelector('.slider-card');
        let x = states.slide.x + el.offsetWidth;
        if(x >= 0) {
            setStates({...states, slide: {...states.slide, x: x, disLeft: true}})
            return
        }        
        setStates({...states, slide: {...states.slide, x: x, disRight: false}})
    }

    function toRight(){
        const el = document.querySelector('.slider-card');
        const slider = document.querySelector('.slide-window');
        let rat = Math.floor(slider.offsetWidth/el.offsetWidth);
        let viewCount = rat==1 ? rat: rat-1;
        let x = states.slide.x - el.offsetWidth;
        let dis = false;
        let rLimit = -(sumCards.length-viewCount)*el.offsetWidth;
        if(x < rLimit) {
            dis = true;
            x = states.slide.x
        };
        setStates({...states, slide: {...states.slide, x: x, disRight: dis, disLeft: false}})
    }


    return (
        <div className="summary">
                <h1 className="title-2">Общая сводка</h1>
                <h1 className="subtitle-2">Найдено {sumCards.length} вариантов</h1>
                <div className='slider-box'>
                    <button className='prev' onClick={toLeft} disabled={states.slide.disLeft}></button>
                    <div className='slide-window'>
                        <div className='slider-labels'>
                        <div className='item-data'><span className='card-label'>Период</span></div>
                        <div className='item-data'><span className='card-label'>Всего</span></div>
                        <div className='item-data'><span className='card-label'>Риски</span></div>
                        </div>
                        {sumCards.length==0 ? <div className='loader'><img className='spinner-loader' src={spin} /><h1>Загружаем данные</h1></div>: null}
                        <div className="slider-length" style={{transform: `translateX(${states.slide.x}px)`}}>
                            {sumCards.map((item, index)=> <><div className='slider-card' key={index}><div className='item-data'><span className="item-title">{item.date}</span></div>
                            <div className='item-data'><span className="item-title">{item.total}</span></div><div className='item-data'><span className="item-title">{item.risk}</span></div></div></>)}
                        </div>
                    </div>
                    <button className='next' onClick={toRight} disabled={states.slide.disRight}></button>
                </div>                
            </div>
    )
}