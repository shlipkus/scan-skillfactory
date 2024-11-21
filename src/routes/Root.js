import React, { useEffect } from "react";
import ScanHeader from "../components/header";
import ScanFooter from "../components/footer";
import { Outlet } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";

function Root() {
    const dispatch = useDispatch();
    useEffect(() => {
        getUser();        
    }, [])

    function getUser() {
        const token = window.localStorage.getItem('accessToken')
        axios.get('https://gateway.scan-interfax.ru/api/v1/account/info',{
            headers: {
              Authorization: 'Bearer ' + token 
            }
           })
          .then(function (response) {
            
            if(response.status==200){
                dispatch({type: 'LOGGED'});
                dispatch({type: 'SETCOUNTUSED', payload: response.data.eventFiltersInfo.usedCompanyCount});
                dispatch({type: 'SETCOUNTLIMIT', payload: response.data.eventFiltersInfo.companyLimit})
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
        <ScanHeader />
        <Outlet />
        <ScanFooter />
        </>
    )
}

export default Root;