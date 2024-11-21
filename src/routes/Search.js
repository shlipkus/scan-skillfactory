import React, { useState } from 'react';
import '../styles/search.css';
import Docs from '../../public/assets/images/doc.svg?url';
import Fold from '../../public/assets/images/fold.svg?url';
import Serg from '../../public/assets/images/chel.svg?url';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


export default function SearchPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Errorinput = (props) => <h1 className={props.classerr}>Введите корректные данные</h1>;
    const [validState, setValid] = useState({inn: '', innValid: true, ton: 'any', tonValid: false, quan: '', quanValid: true, startDate: '2024-10-01', endDate: '2024-11-01', dateValid: true});
    const [checks, setChecks] =useState({maxFlnss: false, inBsnsNews: null, onlyMnRl: false, onlyWthRsk: false, isTchNws: false, isAnnc: false, isDgst: false});


    function handleSubmit(e) {
      getData();
      e.preventDefault();
      navigate('/results'); 
    }

    function setColorInn () {
        return !validState.innValid ? '#FF5959': '#C7C7C7'}
        
    function setColorQuan () {
        return !validState.quanValid ? '#FF5959': '#C7C7C7'}

    function setColorDate () {
          return !validState.dateValid ? '#FF5959': '#C7C7C7'}


    function validQuan(val) {
      return (val > 0 && val <= 1000)||!isNaN(Number(val))
    }

    function validInn(val) {
      if(isNaN(Number(val))) return false;
      if(val.length!=10) return false;
      let checkSum = (val[0]*2 + val[1]*4 + val[2]*10 + val[3]*3 + val[4]*5 + val[5]*9 + val[6]*4 + val[7]*6 + val[8]*8)%11
      return checkSum==val[9]
    }

    function changeInn(e) {   
      let valid = validInn(e.target.value);   
      setValid({...validState, inn: e.target.value, innValid: valid})
    }

    function changeQuan(e) {
      let val = e.target.value;
      let valid = validQuan(val);
      setValid({...validState, quan: val, quanValid: valid})
    }

    function changeStartDate(e) {
      let val = e.target.value;
      let valid = true;
      setValid({...validState, quan: val, quanValid: valid})
    }

    function changeEndDate(e) {
      let val = e.target.value;
      let valid = true;
      setValid({...validState, quan: val, quanValid: valid})
    }

    function changeBsnsNws(e) {
      const flag = e.target.checked;
      setChecks({...checks, inBsnsNews: flag ? true: null})
    }

    function getData() {
        const token = window.localStorage.getItem('accessToken')
        //общая сводка
        axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms',
            {
                "intervalType": "day",
                "issueDateInterval": {
                  "startDate": validState.startDate,
                  "endDate": validState.endDate
                },
                "searchContext": {
                  "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                      {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": validState.inn,
                        "maxFullness": checks.maxFlnss,
                        "inBusinessNews": checks.inBsnsNews
                      }
                    ],
                    "onlyMainRole": checks.onlyMnRl,
                    "tonality": validState.ton,
                    "onlyWithRiskFactors": checks.onlyWthRsk,
                    "riskFactors": {
                      "and": [],
                      "or": [],
                      "not": []
                    },
                    "themes": {
                      "and": [],
                      "or": [],
                      "not": []
                    }
                  },                  
                  "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                  }
                },
                "searchArea": {
                  "includedSources": [],
                  "excludedSources": [],
                  "includedSourceGroups": [],
                  "excludedSourceGroups": [],
                  "includedDistributionMethods": [],
                  "excludedDistributionMethods": []
                },
                "attributeFilters": {
                  "excludeTechNews": !checks.isTchNws,
                  "excludeAnnouncements": !checks.isAnnc,
                  "excludeDigests": !checks.isDgst
                },
                "similarMode": "duplicates",
                "limit": '7', // чет не пашет, или в общей сводке не ограничиваются данные
                "sortType": "issueDate",
                "sortDirectionType": "asc",
                "histogramTypes": [
                    "totalDocuments",
                    "riskFactors"
                ]
            },
            {
            headers: {
              Authorization: 'Bearer ' + token 
            }
           })
          .then(function (response) {
            if(response.status==200){
                dispatch({type: 'ADD_SUM_DATA', payload: response.data.data})
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        //список id публикаций
        axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch',
            {
                "intervalType": "day",
                "issueDateInterval": {
                  "startDate": validState.startDate,
                  "endDate": validState.endDate
                },
                "searchContext": {
                  "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                      {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": validState.inn,
                        "maxFullness": checks.maxFlnss,
                        "inBusinessNews": checks.inBsnsNews
                      }
                    ],
                    "onlyMainRole": checks.onlyMnRl,
                    "tonality": validState.ton,
                    "onlyWithRiskFactors": checks.onlyWthRsk,
                    "riskFactors": {
                      "and": [],
                      "or": [],
                      "not": []
                    },
                    "themes": {
                      "and": [],
                      "or": [],
                      "not": []
                    }
                  },                  
                  "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                  }
                },
                "searchArea": {
                  "includedSources": [],
                  "excludedSources": [],
                  "includedSourceGroups": [],
                  "excludedSourceGroups": [],
                  "includedDistributionMethods": [],
                  "excludedDistributionMethods": []
                },
                "attributeFilters": {
                  "excludeTechNews": !checks.isTchNws,
                  "excludeAnnouncements": !checks.isAnnc,
                  "excludeDigests": !checks.isDgst
                },
                "similarMode": "duplicates",
                "limit": validState.quan,
                "sortType": "issueDate",
                "sortDirectionType": "asc",
                "histogramTypes": [
                    "totalDocuments",
                    "riskFactors"
                ]
            },
            {
            headers: {
              Authorization: 'Bearer ' + token 
            }
           })
          .then(function (response) {
            if(response.status==200){
              let list = response.data.items;
              getPosts(list, token);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    
    function getPosts(list, token) {
        const idList = [];
        list.map((item) => idList.push(item.encodedId))
        //публикации
        axios.post('https://gateway.scan-interfax.ru/api/v1/documents',
          {
            "ids": idList
          },
          {
          headers: {
            Authorization: 'Bearer ' + token 
          }
         })
        .then(function (response) {
          if(response.status==200){
            dispatch({type: 'SETLIST', payload: response.data})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    return (
        <main className='main-block'>
            <h1 className="title">найдите необходимые данные в пару кликов</h1>
            <h2 className='subtitle'>{'Задайте параметры поиска. \n Чем больше заполните, тем точнее поиск'}</h2>
            <img className='pos-svg1' src={Docs} width={91} height={111} />
            <img className='pos-svg2' src={Fold} width={140} height={68} />
            <img className='pos-svg3' src={Serg} width={443} height={470} />
            <div className='search-block'>
                <form onSubmit={handleSubmit} >
                    <label className="search-form-label pos-inn-label" htmlFor='inn'>ИНН компании<span className='asterisk'>*</span></label><br />
                    <input className="search-form-input pos-inn-input" required id="inn" placeholder='10 цифр' style={{borderColor: setColorInn()}} onChange={changeInn}></input>
                    <label className="search-form-label pos-ton-label" htmlFor='ton'>Тональность</label><br />
                    <select className="search-form-select pos-ton-input" required id="ton">
                        <option value='any'>Любая</option>
                        <option value='positive'>Позитивная</option>
                        <option value='negative'>Негативная</option>
                    </select>
                    <label className="search-form-label pos-quan-label" htmlFor='quan' >Количество документов в выдаче<span className='asterisk'>*</span></label><br />
                    <input className="search-form-input pos-quan-input" required id="quan" placeholder='от 1 до 1000' style={{borderColor: setColorQuan()}} onChange={changeQuan}></input>
                          {!validState.quanValid ? <Errorinput classerr='input-error pos1'/>: null}
                          {!validState.innValid ? <Errorinput classerr='input-error pos2'/>: null}
                    <label className="search-form-label pos-date-label" htmlFor='date'>Диапазон поиска<span className='asterisk'>*</span></label><br />
                    <input type='date' defaultValue='2024-10-01' className="search-form-date pos-date-input" required id="date" style={{borderColor: setColorDate()}} onChange={changeStartDate}>                      
                    </input><input type='date' defaultValue='2024-11-01' className="search-form-date pos-date-input2" required id="date" style={{borderColor: setColorDate()}} onChange={changeEndDate}></input>
                    <div className="check-boxes">
                        <ul>                            
                            <li><input className="input-check" type='checkbox' id="flns" onChange={(e) => setChecks({...checks, maxFlnss: e.target.checked})}/><label className="li-label" htmlFor='flns'>Признак максимальной полноты</label></li>
                            <li><input className="input-check" type='checkbox' id="bsns" onChange={changeBsnsNws}/><label className="li-label" htmlFor='bsns'>Упоминания в бизнес-контексте</label></li>
                            <li><input className="input-check" type='checkbox' id="mnrl" onChange={(e) => setChecks({...checks, onlyMnRl: e.target.checked})}/><label className="li-label" htmlFor='mnrl'>Главная роль в публикации</label></li>
                            <li><input className="input-check" type='checkbox' id="rsk" onChange={(e) => setChecks({...checks, onlyWthRsk: e.target.checked})}/><label className="li-label" htmlFor='rsk'>Публикации только с риск-факторами</label></li>
                            <li><input className="input-check" type='checkbox' id="tech" onChange={(e) => setChecks({...checks, isTchNws: e.target.checked})}/><label className="li-label" htmlFor='tech'>Включать технические новости рынков</label></li>
                            <li><input className="input-check" type='checkbox' id="annc" onChange={(e) => setChecks({...checks, isAnnc: e.target.checked})}/><label className="li-label" htmlFor='annc'>Включать анонсы и календари</label></li>
                            <li><input className="input-check" type='checkbox' id="dgts" onChange={(e) => setChecks({...checks, isDgst: e.target.checked})}/><label className="li-label" htmlFor='dgts'>Включать сводки новостей</label></li>
                        </ul>
                    </div>
                    <input className="search-button" type="submit" value="Поиск" />
                    <span className="under-text">* Обязательные к заполнению поля</span>
                </form>
            </div>
        </main>
    )
}