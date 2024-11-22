import React, { useState } from "react";
import '../styles/postcard.css';



function PostCard(props) {
    const [img, setImg] = useState('');
    const DOMParse = new DOMParser();    
    const tagsName = {
        tech: 'Технические новости',
        annc: 'Анонсы и события',
        digt: 'Сводки новостей'
    }
    
    function getImgSrc(imgArr) {
        imgArr.shift();
        if(imgArr.length==0) return
        let fimg = imgArr.pop().split('"');
        fimg.shift();
        fimg.pop();
        if(fimg[0]=='') return
        if(img=='') setImg(fimg[0]);
    }
   
    function cleanText(xml) {
        if(xml=='') return 'nothing';
        let pXml = DOMParse.parseFromString(xml, 'text/xml');
        let val = pXml.getElementsByTagName('scandoc')[0];
        let imgArr = val.textContent.split('img ');
        getImgSrc(imgArr);
        let text = val.textContent.replace('</p>', '\n');
        let formatTxt = text.replace(/<[^>]*>/g, '').slice(0, 800);
        let txtArr = formatTxt.split('. ');
        if(txtArr.length>1) txtArr.pop();
        return txtArr.join('. ')+'.'
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
            {img != '' ? <img src={img} className='post-img'/>: null}
            <div className='content'>
                {cleanText(props.xml)}
            </div>
            <button className='source' onClick={linkTo}>Читать в источнике</button>
            <span className='words'>{props.words} {getSuff(props.words)}</span>
        </div>
    )
}

export default PostCard;