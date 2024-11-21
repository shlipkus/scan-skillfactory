import React, { useState, useEffect } from 'react';
import '../../src/styles/results.css';
import resMain from '../../public/assets/images/res-main.svg?url';
import { useDispatch, useSelector } from 'react-redux';
import spin from '../../public/assets/images/spinner.svg?url';
import PostCard from '../components/postcard';

export default function Results() {
    const sumData = useSelector((state) => state.sumData);
    const posts = useSelector((state) => state.idList);
    const [states, setStates] = useState({
        slide: {
            x: 0,
            disLeft: true,
            disRight: true
        },
        isLoad: false
    });
    let sumCards = [];
    
    useEffect(() => {
        window.onbeforeunload = function() {
            return true;
        };
    
        return () => {
            window.onbeforeunload = null;
        };
    }, []);
       
    if(sumData.length!=0 && !states.isLoad) {
        let dis = sumData.length > 8
        setStates({
            ...states,
            slide: {
                ...states.slide,
                disRight: dis
            },
            isLoad: true
        })
    }

    function getDate(strDate) {
        let date = new Date(strDate);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        return day + '.' + month + '.' + year;
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
        let x = states.slide.x + 140;
        if(x >= 0) {
            setStates({...states, slide: {...states.slide, x: x, disLeft: true}})
            return
        }        
        setStates({...states, slide: {...states.slide, x: x, disRight: false}})
    }

    function toRight(){
        let x = states.slide.x - 140;
        let dis = false;
        let rLimit = -(sumCards.length-8)*140;
        if(x < rLimit) {
            dis = true;
            x = states.slide.x
        };
        setStates({...states, slide: {...states.slide, x: x, disRight: dis, disLeft: false}})
    }

    return (
        <main className='main-result'>
            <div className="page-head">
                <h1 className="title pre">{"Ищем. Скоро \n будут результаты"}</h1>
                <h2 className='subtitle'>{'Поиск может занять некоторое время, \n просим сохранять терпение.'}</h2>
                <img className='pos-svg4' src={resMain} width={552} height={369} />
            </div>
            <div className="summary">
                <h1 className="title-2">Общая сводка</h1>
                <h1 className="subtitle-2">Найдено {sumCards.length} вариантов</h1>
                <div className='slider-box'>
                    <button className='prev' onClick={toLeft} disabled={states.slide.disLeft}></button>
                    <div className='slide-window'>
                        <div className='slider-labels'>
                            <h1>Период</h1>
                            <h1>Всего</h1>
                            <h1>Риски</h1>
                        </div>
                        {sumCards.length==0 ? <div className='loader'><img className='spinner-loader' src={spin} /><h1>Загружаем данные</h1></div>: null}
                        <div className="slider-length" style={{transform: `translateX(${states.slide.x}px)`}}>
                            {sumCards.map((item)=> <><div className='slider-card'><h3>{item.date}</h3>
                            <h3>{item.total}</h3><h3>{item.risk}</h3></div><div className='line'></div></>)}
                        </div>
                    </div>
                    <button className='next' onClick={toRight} disabled={states.slide.disRight}></button>
                </div>                
            </div>
            <div className='public-length'>
                <h1 className='title-2 pos-doc'>Список документов</h1>
                <div className='flex-box'>
                    {posts.map((post) => <PostCard date={getDate(post.ok.issueDate)}
                                                name={post.ok.source.name}
                                                url={post.ok.url}
                                                title={post.ok.title.text}
                                                tags={[{tech: post.ok.attributes.isTechNews}, {annc: post.ok.attributes.isAnnouncement}, {digt: post.ok.attributes.isDigest}]}
                                                xml={post.ok.content.markup}
                                                words={post.ok.attributes.wordCount}
                                                />)}
                </div>
            </div>
        </main>
    )
}