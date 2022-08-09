import {
    // LOGOUT_USER,
    SET_COMPANY_BEGIN,
    SET_COMPANY_SUCCESS,
    SET_COMPANY_ERROR,
    LOGIN_COMPANY_BEGIN,
    LOGIN_COMPANY_SUCCESS,
    LOGIN_COMPANY_ERROR,
    LOGOUT_COMPANY,
    GET_ALL_EMPLOYEES_BEGIN,
    GET_ALL_EMPLOYEES_SUCCESS,
    GET_ALL_EMPLOYEES_ERROR,
    GET_ALL_TASKS_BEGIN,
    GET_ALL_TASKS_SUCCESS,
    GET_ALL_TASKS_ERROR,
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
    if (action.type === GET_ALL_EMPLOYEES_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === GET_ALL_EMPLOYEES_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            AllEmployees: action.payload.AllEmployees,
        }
    }
    if (action.type === GET_ALL_EMPLOYEES_ERROR) {
        return {
            ...state,
            isLoading: false,
            error: action.payload.msg,
        }
    }
    if (action.type === GET_ALL_TASKS_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === GET_ALL_TASKS_SUCCESS) {
        return {
            ...state,
            isLoading: true,
            AllTasks: action.payload.AllTasks,
        }
    }
    if (action.type === GET_ALL_TASKS_ERROR) {
        return {
            ...state,
            isLoading: false,
            error: action.payload.msg,
        }
    }
    
    throw new Error(`no such action : ${action.type}`)
}

export default reducer
