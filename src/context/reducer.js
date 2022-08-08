import {
    // LOGOUT_USER,
    SET_COMPANY_BEGIN,
    SET_COMPANY_SUCCESS,
    SET_COMPANY_ERROR,
    LOGIN_COMPANY_BEGIN,
    LOGIN_COMPANY_SUCCESS,
    LOGIN_COMPANY_ERROR,
    LOGOUT_COMPANY
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {

    if (action.type === SET_COMPANY_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === SET_COMPANY_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            token: action.payload.token,
            company: action.payload.company,
        }
    }
    if (action.type === SET_COMPANY_ERROR) {
        return {
            ...state,
            isLoading: false,
            error: action.payload.msg,
        }
    }

    if (action.type === LOGIN_COMPANY_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === LOGIN_COMPANY_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            token: action.payload.token,
            company: action.payload.company,
        }
    }
    if (action.type === LOGIN_COMPANY_ERROR) {
        return {
            ...state,
            isLoading: false,
            error: action.payload.msg,
        }
    }
    if (action.type === LOGOUT_COMPANY) {
        return {
            ...initialState,
            company: null,
            token: null,
        }
    }
    throw new Error(`no such action : ${action.type}`)
}

export default reducer
