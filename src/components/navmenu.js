import React, { useState } from 'react';
import '../styles/sidemenu.css';
import footLogo from '../../public/assets/images/footlogo.svg?url';
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

export default function SideMenu(props) {
    const isAuth = useSelector((state) => state.auth);
    const [ state, setState ] = useState({
        dis: true,
        vis: 'no-vis',
        run: '1',
        zInd: 'under'
    });

    const sign = <div className='sign'>
        <Link className='nav-link reg' onClick={handleClose} to="/">Зарегистрироваться</Link>
        <button className='sign-in' >Войти</button>
    </div>

    function handleOpen () {
        console.log()
        setState({vis: 'vis', dis: !state.dis, run: 'run', zInd: 'on'})
    }

    function handleClose () {
        setState({vis: 'no-vis', dis: !state.dis, run: 'back-run', zInd: 'under'})
    }

    function handleOut() {
        props.logOut();
        handleClose()
    }

    return (
        <div className="menu">
            {state.dis ? <button className='menu-button' onClick={handleOpen}/>: <button className='close-button' onClick={handleClose}/>}           
            <div className={`slide-panel-wrapper ${state.vis}`} >
                <img className='menu-logo' src={footLogo} />
                <div className='links-block'>
                    <Link className='nav-link' onClick={handleClose} to="/">Главная</Link>
                    <Link className='nav-link' onClick={handleClose} to="/">Тарифы</Link>
                    <Link className='nav-link' onClick={handleClose} to="/">FAQ</Link>
                </div>
                {isAuth ? <Link className='nav-logout' onClick={handleOut}>Выйти</Link>: sign}                
            </div>
            <div className={`slider-fill ${state.zInd}`}><div className={`fill ${state.run}`}></div></div>
        </div>        
    )
}