import React, { useState } from 'react';
import '../../src/styles/results.css';
import resMain from '../../public/assets/images/res-main.svg?url';
import { useDispatch, useSelector } from 'react-redux';
import spin from '../../public/assets/images/spinner.svg?url';
import PostCard from '../components/postcard';
import axios from 'axios';
import Summary from '../components/summary';

export default function Results() {
    const idList = useSelector((state) => state.idList);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [states, setStates] = useState({        
        more: false,
        onLoad: false
    });

    
    function getPosts(type, dx=0) {
        console.log('request');
        const token = window.localStorage.getItem('accessToken')
        const list = [];
        idList.map((item) => list.push(item.encodedId));        
        let lazyList = list.slice(0+dx, 10+dx);
        //публикации
        if(lazyList.length==0) setStates({...states, more: false});
        axios.post('https://gateway.scan-interfax.ru/api/v1/documents',
          {
            "ids": lazyList
          },
          {
          headers: {
            Authorization: 'Bearer ' + token 
          }
         })
        .then(function (response) {
          if(response.status==200){
            dispatch({type: type, payload: response.data})                
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        if(!states.onLoad) setStates({...states, onLoad: true})
    }
       
    function moreHandle() {
        let dx = posts.length;
        getPosts('ADDPOSTS', dx);
    }

    function getDate(strDate) {
        let date = new Date(strDate);
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        return day + '.' + month + '.' + year;
    }
    
    if(idList.length!=0&&posts.length==0&&!states.onLoad){          
        getPosts('SETPOSTS');
        setStates({...states, more: (idList.length>10&&!states.more), onLoad: true})
    } 
    
    return (
        <main className='main-result'>
            <div className="page-head">
                <h1 className="title pre">{"Ищем. Скоро \n будут результаты"}</h1>
                <h2 className='subtitle'>{'Поиск может занять некоторое время, \n просим сохранять терпение.'}</h2>
                <img className='pos-svg4' src={resMain} width={552} height={369} />
            </div>
            <Summary />
            <div className='public-length'>
                <h1 className='title-2 pos-doc'>Список документов</h1>
                {posts.length==0 ? <div className='loader' style={{height: '600px'}}><img className='spinner-loader' src={spin} /></div>: null}
                <div className='flex-box'>
                    {posts.map((post) => <PostCard key={post.ok.id} date={getDate(post.ok.issueDate)}
                                                name={post.ok.source.name}
                                                url={post.ok.url}
                                                title={post.ok.title.text}
                                                tags={[{tech: post.ok.attributes.isTechNews}, {annc: post.ok.attributes.isAnnouncement}, {digt: post.ok.attributes.isDigest}]}
                                                xml={post.ok.content.markup}
                                                words={post.ok.attributes.wordCount}
                                                />)}
                </div>
            </div>
            {posts.length!=idList.length ? <button className="more" onClick={moreHandle}>Показать больше</button>: null}
        </main>
    )
}