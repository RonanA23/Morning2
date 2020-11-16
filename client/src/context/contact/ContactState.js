import React,{useReducer} from 'react'
import ContactContext from './contactContext'
import {v4} from 'uuid'
import contactReducer from './contactReducer'


import{ADD_CONTACT,DELETE_CONTACT,SET_CURRENT,
    CLEAR_CURRENT,UPDATE_CONTACT,FILTER_CONTACTS,CLEAR_FILTER}from '../types'

const ContactState= props=>{
    const initialState={contacts:[
        {id:1,
        name:'Barry White',
        email:'Barry@gmail.com',
        phone:'333-333-333',
        type:'professional'},
        {id:2,
            name:'Ray Charles',
            email:'RJ@gmail.com',
            phone:'222-222-222',
            type:'personal'},
        {id:3,
            name:'Frank Sinatra',
            email:'MickeyBlueEyes@gmail.com',
            phone:'444-444-444',
            type:'professional'}
    ],
current:null,
filtered:null
}

const [state,dispatch]=useReducer(contactReducer,initialState)

//add contact
const addContact = contact=>{
    contact.id = v4()
    dispatch({
        type:ADD_CONTACT,payload:contact
    })
}

//delete contact
const deleteContact =id=>{
    dispatch({
        type:DELETE_CONTACT,payload:id
    })
}

//set current contact
const setCurrent= contact=>{
    dispatch({ type:SET_CURRENT,payload:contact})
}

const clearCurrent=()=>{
    dispatch({type:CLEAR_CURRENT})
}

//updat contact
const updateContact= contact=>{
    dispatch({type:UPDATE_CONTACT,payload:contact})
}

//filter contacts
const filterContacts= text =>{
    dispatch({type:FILTER_CONTACTS, payload:text})
}

const clearFilter=()=>{
    dispatch({type:CLEAR_FILTER})
}

//clear filter

return (
    <ContactContext.Provider
    value={{
        contacts:state.contacts,
        current: state.current,
        filtered:state.filtered,
    addContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    filterContacts,
    clearFilter}}>
        {props.children}
    </ContactContext.Provider>
)
}

export default ContactState
