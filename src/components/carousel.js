import React, { useEffect, useState } from "react";
import "../styles/slider.css";
import Card from "./card";


function ScSlider() {
    const [slide, setSlide] = useState({
      x: 0,
      disLeft: true,
      disRight: false
    })

    function slideFunc(e){
      const x = slide.x;
      let cards = document.querySelectorAll(".card");
      let slider = document.querySelectorAll(".slider");
      let dx = cards[0].offsetWidth + 20;
      let viewCount = Math.floor(slider[0].offsetWidth/dx)

      if(e.target.id == "next") {            
        if(((cards.length - viewCount) * -dx) < x) setSlide({...slide, x: x - dx});        
      }
          
      if(e.target.id == "prev") {
        if((x + dx) <= 0) setSlide({...slide, x: x + dx});
      }  
    }

    return (
      <div className="slider-conteiner">
        <div className="slide-button prev" id="prev" onClick={slideFunc}/>
        <div className="slider">
            <div className="cards" style={{transform: `translateX(${slide.x}px)`}}>
                <Card cardImg={'/assets/images/time.png'} cardText={"Высокая и оперативная скорость обработки заявки"} />
                <Card cardImg={'/assets/images/search.png'} cardText={"Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"} />
                <Card cardImg={'/assets/images/keyhole.png'} cardText={"Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"} />
                <Card cardImg={'/assets/images/time.png'} cardText={"Высокая и оперативная скорость обработки заявки"} />
                <Card cardImg={'/assets/images/search.png'} cardText={"Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"} />
                <Card cardImg={'/assets/images/keyhole.png'} cardText={"Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"} />
            </div>
        </div>
        <div className="slide-button" id="next" onClick={slideFunc}/>
      </div>
    );
  }

  export default ScSlider;