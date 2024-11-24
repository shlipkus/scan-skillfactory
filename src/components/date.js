import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import '../styles/dateinput.css';

function useOutside(outsideClick){
    const ref = useRef();
    useEffect(()=>{
        function handleClick(e){
            if(ref.current && !ref.current.contains(e.target)) {
                outsideClick();
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [outsideClick])

    return ref
}

export default function DateInput(props) {
    const currentDate = new Date();
    const outside = useOutside(()=> setState({...state, display: false}))
    const [state, setState] = useState({
        display: false,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        day: currentDate.getDate(),
        listYear: 'none',
        listMonth: 'none'
    })

    const years = _.range(2000, currentDate.getFullYear()+1);
    const days = _.range(1, getDayQty()+1);
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]
    
    function setDisplay() {
        return state.display ? 'block': 'none'
    }

    function getDayQty() {
        return 32 - new Date(state.year, state.month, 32).getDate();
    }
    
    function selectButton() {
        setState({...state, display: !state.display})
    }

    function clickYear() {
        setState({...state, listYear: state.listYear=='none' ? 'block': 'none' , listMonth: 'none'})
    }

    function chooseYear(e) {
        setState({...state, listYear: 'none', year: e.target.value})
    }

    return (
        <div className={`date-div ${props.classInput}`} >
            <div className='input-block'>
                <input className='date-input' onChange={props.onChange} value={`${state.day}.${String(state.month+1).padStart(2, '0')}.${state.year}`} />
                <button type='button' className='select-button' onClick={selectButton} />
            </div>
            <div className='dates' ref={outside} style={{display: setDisplay()}}>
                <div className="selects">
                    <button type='button' className='date-select' onClick={clickYear}>{state.year}</button>
                    <div className="years" style={{display: state.listYear}}>
                        <ul>
                            {years.map((year)=><li key={year} value={year} onClick={chooseYear}>{year}</li>)}
                        </ul>
                    </div>
                    <button type='button' className='date-select month' onClick={(e) => setState({...state, listMonth: state.listMonth=='none' ? 'block': 'none' , listYear: 'none'})}>{months[state.month]}</button>
                    <div className="months" style={{display: state.listMonth}}>
                        <ul>
                            {months.map((month, index)=><li key={index} value={index} onClick={(e) => setState({...state, listMonth: 'none', month: e.target.value})}>{month}</li>)}
                        </ul>
                    </div>
                    <ul className='days'>
                        {days.map((day)=><li className='day' value={day} onClick={(e)=> setState({...state, display: false,  day: e.target.value})}>{day}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}