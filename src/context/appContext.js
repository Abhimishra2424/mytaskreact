import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
    SET_COMPANY_BEGIN,
    SET_COMPANY_SUCCESS,
    SET_COMPANY_ERROR,
    LOGIN_COMPANY_BEGIN,
    LOGIN_COMPANY_SUCCESS,
    LOGIN_COMPANY_ERROR,
    LOGOUT_USER,
} from './actions'

const token = localStorage.getItem('token')
const company = localStorage.getItem('company')

const initialState = {
    isLoading: false,
    company: company ? JSON.parse(company) : null,
    token: token ? token : null,
    error: null,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addUserToLocalStorage = ({ company, token }) => {
        localStorage.setItem('company', JSON.stringify(company))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('company')
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const createCompany = async ({ company }) => {
        console.log('createCompany', company)
        dispatch({ type: SET_COMPANY_BEGIN })
        try {
            const { data } = await axios.post(`http://localhost:5000/api/company/register`, company)

            const { company: newCompany, token } = data
            dispatch({
                type: SET_COMPANY_SUCCESS,
                payload: { company: newCompany, token },
            })
            addUserToLocalStorage({ company: newCompany, token })
        } catch (error) {
            dispatch({
                type: SET_COMPANY_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
    }

    const loginCompany = async ({ companyEmail, companyPassword }) => {
        console.log('loginCompany', companyEmail)
        console.log('loginCompany', companyPassword)
        // dispatch({ type: LOGIN_COMPANY_BEGIN })
        // try {
        //     const { data } = await axios.post(`http://localhost:5000/api/company/login`, {
        //         companyEmail,
        //         companyPassword,
        //     })

        //     const { company: newCompany, token } = data
        //     dispatch({
        //         type: LOGIN_COMPANY_SUCCESS,
        //         payload: { company: newCompany, token },
        //     })
        //     addUserToLocalStorage({ company: newCompany, token })
        // } catch (error) {
        //     dispatch({
        //         type: LOGIN_COMPANY_ERROR,
        //         payload: { msg: error.response.data.msg },
        //     })
        // }
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                createCompany,
                loginCompany,
                logoutUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
