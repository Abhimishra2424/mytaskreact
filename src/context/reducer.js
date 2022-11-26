import {
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
  GET_TASK_BY_SEARCH_BEGIN,
  GET_TASK_BY_SEARCH_SUCCESS,
  GET_TASK_BY_SEARCH_ERROR,
  LOGIN_EMPLOYEE_BEGIN,
  LOGIN_EMPLOYEE_SUCCESS,
  LOGIN_EMPLOYEE_ERROR,
  GET_TASK_BY_EMPLOYEE_ID_BEGIN,
  GET_TASK_BY_EMPLOYEE_ID_SUCCESS,
  GET_TASK_BY_EMPLOYEE_ID_ERROR,
  EDIT_EMPLOYEE_BEGIN,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_ERROR,
  CREATE_NOTES_BEGIN,
  CREATE_NOTES_SUCCESS,
  GET_ALL_NOTES,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === SET_COMPANY_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SET_COMPANY_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      company: action.payload.company,
    };
  }
  if (action.type === SET_COMPANY_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }

  if (action.type === LOGIN_COMPANY_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_COMPANY_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      company: action.payload.company,
      iswho: action.payload.iswho,
    };
  }
  if (action.type === LOGIN_COMPANY_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_COMPANY) {
    return {
      ...initialState,
      company: null,
      token: null,
      iswho: null,
    };
  }
  if (action.type === GET_ALL_EMPLOYEES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALL_EMPLOYEES_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      AllEmployees: action.payload.AllEmployees,
    };
  }
  if (action.type === GET_ALL_EMPLOYEES_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }
  if (action.type === GET_ALL_TASKS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALL_TASKS_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      AllTasks: action.payload.AllTasks,
    };
  }
  if (action.type === GET_ALL_TASKS_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }

  if (action.type === GET_TASK_BY_SEARCH_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_TASK_BY_SEARCH_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      AllTasks: action.payload.AllTasks,
    };
  }
  if (action.type === GET_TASK_BY_SEARCH_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }
  if (action.type === LOGIN_EMPLOYEE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      employee: action.payload.employee,
      iswho: action.payload.iswho,
    };
  }

  if (action.type === LOGIN_EMPLOYEE_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }

  if (action.type === GET_TASK_BY_EMPLOYEE_ID_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_TASK_BY_EMPLOYEE_ID_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      AllassignedTasks: action.payload,
    };
  }
  if (action.type === GET_TASK_BY_EMPLOYEE_ID_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }

  if (action.type === EDIT_EMPLOYEE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      AllEmployees: action.payload.AllEmployees,
    };
  }
  if (action.type === EDIT_EMPLOYEE_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }
  if (action.type === CREATE_NOTES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_NOTES_SUCCESS) {
    return {
      ...state,
      note: {
        ...state.note,
        msg: action.payload.msg,
      },
    };
  }

  if (action.type === GET_ALL_NOTES) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_NOTES_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      AllNotes: action.payload.data,
    };
  }
  if (action.type === GET_NOTES_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
