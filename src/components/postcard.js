import React from "react";
import '../styles/postcard.css';



function PostCard(props) {
    const DOMParse = new DOMParser();
    const tagsName = {
        tech: 'Технические новости',
        annc: 'Анонсы и события',
        digt: 'Сводки новостей'
    }

    const xml='<?xml version="1.0" encoding="utf-8"?><scandoc><sentence><entity type="company" local-id="16"><entity type="company" local-id="8">Wildberries </entity></entity>и <entity type="company" local-id="15">группа Russ </entity>завершили объединение\r\n&lt;body&gt;&lt;div&gt;&lt;p&gt;</sentence></scandoc>'

    let pXml = DOMParse.parseFromString(xml, 'text/xml');

    

    let val = pXml.getElementsByTagName('scandoc')[0];

    console.log(val);

    function getTagName(tag) {        
        return Object.values(tag)[0] ? <span className='tag'>{tagsName[Object.keys(tag)[0]]}</span>: null
    }
    
    props.tags.map((tag) => console.log(Object.values(tag)[0]))

    return (
        <div className="post-card">
            <h4>{props.date}<a href=''>{props.name}</a></h4>
            <h2 className='post-title'>{props.title}</h2>
            <div className='tag-line'>
                {props.tags.map((tag)=>getTagName(tag))}
            </div>
            <div className='content'>
                {val.innerHtml}
            </div>
        </div>
    )
}

PostCard.defaultProps = {
    date: '13.09.2021',
    name: 'Комсомольская правда KP.RU',
    title: 'Скиллфэктори - лучшая онлайн-школа \n для будущих айтишников',
    tags: [{tech: true}, {annc: true}, {digt: false}]
}

export default PostCard;