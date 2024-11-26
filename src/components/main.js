import React, { useEffect } from "react";
import "../styles/scanmain.css"
import ScSlider from "./carousel";
import { useNavigate } from "react-router-dom";
import TarifCard from "./tarifcard";
import { useSelector } from "react-redux";
import man from '../../public/assets/images/main.svg?url'

function ScanMain() {
    const isAuth = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const text = "сервис по поиску \n публикаций \n\
                    о компании \n \
                    по её ИНН"
    const subtext = "Комплексный анализ публикаций, получение данных \n\
    в формате PDF на электронную почту."

    return(
        <main>
            <div className="top-content">
                <div className="text-content">
                <h1 id="big">{text}</h1>
                <h2 id="small">{subtext}</h2></div>
                {isAuth ? <button id="request" onClick={(e) => {navigate('/search')}}>Запросить данные</button>: null}
                <img src={man} className="man-pic"/>
            </div>
            <div className="content-2">
                <h1>почему именно мы</h1>
                <div>
                    <ScSlider />
                </div>
            </div>
            <div className="mid-picture">
            </div>
            <div className="tarifs">
                <h1>наши тарифы</h1>
                <div className="tarifs-flexbox">
                    <TarifCard color={'#FFB64F'} title={'Beginner'} 
                        subtitle={'Для небольшого исследования'}
                        img={'assets/images/lamp.svg'}
                        price={'799 ₽'}
                        prev={'1 200 ₽'}
                        credit={'или 150 ₽/мес. при рассрочке на 24 мес.'}
                        list={['Безлимитная история запросов',
                            'Безопасная сделка',
                            'Поддержка 24/7']}
                        current={false}
                    />
                    <TarifCard color={'#7CE3E1'} title={'Pro'} 
                        subtitle={'Для HR и фрилансеров'}
                        img={'assets/images/arrow.svg'}
                        price={'1 299 ₽'}
                        prev={'2 600 ₽'}
                        credit={'или 279 ₽/мес. при рассрочке на 24 мес.'}
                        list={['Все пункты тарифа Beginner',
                            'Экспорт истории',
                            'Рекомендации по приоритетам']}
                        current={true}
                    />
                    <TarifCard color={'#000000'} title={'Business'} 
                        subtitle={'Для корпоративных клиентов'}
                        img={'assets/images/notebook.svg'}
                        price={'2 379 ₽'}
                        prev={'3 700 ₽'}
                        credit={''}
                        list={['Все пункты тарифа Pro',
                            'Безлимитное количество запросов',
                            'Приоритетная поддержка']}
                        current={false}
                    />
                </div>
            </div>
        </main>
    )
}

export default ScanMain;