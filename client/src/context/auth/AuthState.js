import React,{useReducer} from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'


import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'



const AuthState= props =>{
    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null
    }

    const [state,dispatch]=useReducer(authReducer,initialState)

    //Load User checks whos logged in
    const loadUser= async()=>{
        setAuthToken(localStorage.token)
        try{const res = axios.get('/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data})}
        catch(err){
            dispatch({type:AUTH_ERROR})
        }
    }
    

    //register user and give them a token
    const register = async formData =>{
        const config={headers:{'Content-Type':'application/json'}}
        try{const res = await axios.post('/api/users',formData,config)
            dispatch({type:REGISTER_SUCCESS,payload:res.data})
            loadUser()
    } catch(err){dispatch({type:REGISTER_FAIL,
    payload:err.response.data.msg})}}
    

    //login user and give them a token
    const login= async formData=>{
        const config ={headers:{'Content-Type':'application/json'
         }}  
        try{const res = await axios.post('/api/auth',formData,config)
        dispatch({ type:LOGIN_SUCCESS,payload:res.data})
        loadUser()
    }
        catch(err){dispatch({
            type:LOGIN_FAIL,
            payload:err.response.data.msg
        })}
    }
    

    //logout user
    const logout=()=>{
        console.log('logged out')
    }

    //clear Errors
    const clearErrors=()=>{
        console.log('cleared errors')
    }


    return(
        <AuthContext.Provider
        value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            login,
            logout,
            clearErrors,
            loadUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState