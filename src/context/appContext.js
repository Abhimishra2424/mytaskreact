import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    isLoading: false,
    user: user ? JSON.parse(user) : null,
    token: token,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const setupUser = async ({ currentUser }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        // try {
        //     const { data } = await axios.post(`/api/v1/auth/`, currentUser)

        //     const { user, token } = data
        //     dispatch({
        //         type: SETUP_USER_SUCCESS,
        //         payload: { user, token },
        //     })
        //     addUserToLocalStorage({ user, token, })
        // } catch (error) {
        //     dispatch({
        //         type: SETUP_USER_ERROR,
        //         payload: { msg: error.response.data.msg },
        //     })
        // }
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setupUser,
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
