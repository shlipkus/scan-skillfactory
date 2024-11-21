import React, { useEffect } from "react";
import "../styles/slider.css";
import Card from "./card";


function ScSlider() {
    let x = 0;
    function slideFunc(e){
        let cardLine = document.querySelector(".cards");
        let cards = document.querySelectorAll(".card");
          if(e.target.id == "next") {
            if(((cards.length - 3) * -420) < x) x -= 420;
            cardLine.style.transform = 'translateX('+ x +'px)';
          }
          
          if(e.target.id == "prev") {
            if((x + 420) <= 0) x += 420;
            cardLine.style.transform = 'translateX('+ x + 'px)';
          }  
    }

    return (
      <div className="slider-conteiner">
        <div className="slide-button prev" id="prev" onClick={slideFunc}/>
        <div className="slider">
            <div className="cards">
                <Card cardImg={'/assets/images/time.png'} cardText={"Высокая и оперативная скорость обработки заявки"} />
                <Card cardImg={'/assets/images/search.png'} cardText={"Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"} />
                <Card cardImg={'/assets/images/keyhole.png'} cardText={"Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"} />
                <div className="card">2</div>
                <div className="card">3</div>
                <div className="card">4</div>
            </div>
        </div>
        <div className="slide-button" id="next" onClick={slideFunc}/>
      </div>
    );
  }

  export default ScSlider;