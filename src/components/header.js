import React from "react";
import "../styles/header.css";
import Logo from '../../public/assets/images/Logo.svg?url';
import ava from '../../public/assets/images/ava.png';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ScanHeader() {
    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.auth);
    const usedInfo = useSelector((state) => state.usedInfo);
    const limitInfo = useSelector((state) => state.limitInfo);
    const dispatch = useDispatch();

    function logOut() {
        dispatch({type: 'LOGOUT'});
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('expire');
        navigate('/login');
    }

    const noAuth = <div className="auth">
                    <Link className='link' to="/">Зарегистрироваться</Link>
                    <div className="rectangle"></div>
                    <button onClick={(e) => navigate('/login')}>Войти</button>
                </div>
    
    const onAuth = <div className="on-auth">
        <div className="user-requests">
            <span className='text-info'>Использовано компаний</span>
            <span className='text-info'>Лимит по компаниям</span>
        </div>
        <span className='used'>{usedInfo}</span>
        <span className='limit'>{limitInfo}</span>
        <div className="user-info">
            <span className="username">Алексей А.<Link className='logout' onClick={logOut}>Выйти</Link></span>
            <img src={ava} width={32} height={32} style={{marginLeft: '5px'}}/>            
        </div>
    </div>

    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="Logo" width={141} height={141}/>
            </div>
            <div className="links">
                <Link className='link' to="/">Главная</Link>
                <Link className='link' to="/">Тарифы</Link>
                <Link className='link' to="/">FAQ</Link>
            </div>
            {isAuth ? onAuth: noAuth}
        </header>
    )
}

export default ScanHeader;