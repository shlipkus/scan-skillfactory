import React from "react";
import '../styles/postcard.css';



function PostCard(props) {
    const DOMParse = new DOMParser();    
    const tagsName = {
        tech: 'Технические новости',
        annc: 'Анонсы и события',
        digt: 'Сводки новостей'
    }
    
   
    function cleanText(xml) {
        if(xml=='') return 'nothing';
        let pXml = DOMParse.parseFromString(xml, 'text/xml');
        let val = pXml.getElementsByTagName('scandoc')[0];
        let text = val.textContent;
        return text.replace(/<[^>]*>/g, '').slice(0, 1000);
    }

    function getTagName(tag) {        
        return Object.values(tag)[0] ? <span className='tag'>{tagsName[Object.keys(tag)[0]]}</span>: null
    }

    function getSuff(nums) {
        let num = nums%10;
        if(num==1) return 'слово';
        if([2, 3, 4].includes(num)) return 'слова';
        return 'слов'
    }

    function linkTo () {
        if(props.url=='') return;
        window.open(props.url, '_blank', 'noopener,noreferrer')
    }
    
    return (
        <div className="post-card">
            <h4>{props.date}<a href={props.url} target="_blank">{props.name}</a></h4>
            <h2 className='post-title'>{props.title}</h2>
            <div className='tag-line'>
                {props.tags.map((tag)=>getTagName(tag))}
            </div>
            <div className='content'>
                {cleanText(props.xml)}
            </div>
            <button className='source' onClick={linkTo}>Читать в источнике</button>
            <span className='words'>{props.words} {getSuff(props.words)}</span>
        </div>
    )
}

PostCard.defaultProps = {
    date: '13.09.2021',
    url: '',
    name: 'Комсомольская правда KP.RU',
    title: 'Скиллфэктори - лучшая онлайн-школа \n для будущих айтишников',
    tags: [{tech: true}, {annc: true}, {digt: false}],
    xml: '',
    words: '100'
}

export default PostCard;