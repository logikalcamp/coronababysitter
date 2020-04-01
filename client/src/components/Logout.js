import React,{useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {logout} from '../actions/auth'
import {connect} from 'react-redux'


const Logout = (props) => {
    useEffect(() => {
        props.dispatch(logout())
    }, [])
    return (
        <Redirect to="/"/>
    )
}



export default connect()(Logout);