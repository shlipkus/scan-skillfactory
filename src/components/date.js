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
    const [value, setValue] = useState(formatDate(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()));
    const years = _.range(2000, currentDate.getFullYear()+1);
    const days = _.range(1, getDayQty()+1);
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]

    
    function formatDate(d, m, y) {
        return `${d}.${String(m+1).padStart(2, '0')}.${y}`
    }
    
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
        const date = formatDate(state.day, state.month, e.target.value)
        setState({...state, listYear: 'none', year: e.target.value});
        setValue(date);  
        props.dateChange(date);      
    }

    function chooseMonth(e) {
        const date = formatDate(state.day, e.target.value, state.year)
        setState({...state, listMonth: 'none', month: e.target.value});
        setValue(date);
        props.dateChange(date);

    }

    function chooseDay(e) {
        const date = formatDate(e.target.value, state.month, state.year)
        setState({...state, display: false, day: e.target.value});
        setValue(date);
        props.dateChange(date);

    }

    return (
        <div className={`date-div ${props.classInput}`} >
            <div className='input-block' style={{borderColor: props.color}}>
                <input className='date-input' onChange={props.onChange} value={value} />
                <button type='button' className='select-button' onClick={selectButton} />
            </div>
            <div className='dates' ref={outside} style={{display: setDisplay()}}>
                <div className="selects">
                    <button type='button' className='date-select' onClick={clickYear}>{state.year}</button>
                    <div className="years" style={{display: state.listYear}}>
                        <ul>
                            {years.reverse().map((year)=><li key={year} value={year} onClick={chooseYear}>{year}</li>)}
                        </ul>
                    </div>
                    <button type='button' className='date-select month' onClick={(e) => setState({...state, listMonth: state.listMonth=='none' ? 'block': 'none' , listYear: 'none'})}>{months[state.month]}</button>
                    <div className="months" style={{display: state.listMonth}}>
                        <ul>
                            {months.map((month, index)=><li key={index} value={index} onClick={chooseMonth}>{month}</li>)}
                        </ul>
                    </div>
                    <ul className='days'>
                        {days.map((day)=><li className='day' value={day} onClick={chooseDay}>{day}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}