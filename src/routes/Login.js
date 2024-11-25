import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import Chars from '../../public/assets/images/Characters.svg?url';
import Lock from '../../public/assets/images/lock.svg?url';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const isAuth = useSelector((state) => state.auth);
    const [ errPass, setErrPass ] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

 
    if(isAuth) {
        console.log('Залогинено');
        navigate('/')
    };

    function handleSubmit(e) {
        e.preventDefault();        
        loginRequest(login, password)        
    }

    function setColor(){
        return errPass ? '#FF5959': '#C7C7C7'
    }

    function loginRequest(login, password) {
        axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
            login: login,
            password: password
          })
          .then(function (response) {
            if(response.status==200){
                window.localStorage.setItem('accessToken', response.data.accessToken);
                window.localStorage.setItem('expire', response.data.expire);
                dispatch({type: 'LOGGED'});
                navigate('/');
            }
          })
          .catch(function (error) {
            console.log(error.status);
            if(error.status==401){
                setErrPass(true);
                let el = document.querySelector('.pos-pass-input');
                el.value = '';
            }
          });
    }
    return (
        <main className="main-block">
            <h1 className='title'>Для оформления подписки 
            на тариф, необходимо авторизоваться.</h1>
            <div className="login-form">
                <img className="lock-pic" src={Lock} />
                <div className="form-div">
                    <span className='login-text'>Войти</span><span className="reg-text">Зарегистрироваться</span>
                    <div className='rect-1'></div><div className="rect-2"></div>
                    <form onSubmit={handleSubmit}>
                    <label className='login-label' htmlFor='login'>Логин или номер телефона:</label>
                    <input className='login-input' required id='login' type="text" onChange={(e) => {setLogin(e.target.value)}}></input>
                    <label className='login-label pos-pass-label' htmlFor='pass'>Пароль:</label>
                    <input className='login-input pos-pass-input' required id='pass' type='password' style={{borderColor: setColor()}} onChange={(e) => {setPassword(e.target.value); setErrPass(false)}}></input>
                    {errPass ? <span className='pass-error'>Неправильный пароль</span>: <span className='pass-error' style={{opacity: '0%'}}>Ytn</span>}
                    <input className='login-submit' type='submit' value='Войти' />
                    </form>
                    <a className="restore-link">Восстановить пароль</a>
                    <span className='login-label pos-alt-login'>Войти через:</span>
                    <div className='social'>
                        <button className='button-1 google sz-img'></button>
                        <button className='button-1 face sz-img'></button>
                        <button className='button-1 ya sz-img'></button>
                    </div>
                </div>
            </div>
            <img className="char-pic" src={Chars} />
        </main>
    )
}

export default Login;