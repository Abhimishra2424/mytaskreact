import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
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
} from "./actions";

const token = localStorage.getItem("token");
const company = localStorage.getItem("company");

const initialState = {
  isLoading: false,
  company: company ? JSON.parse(company) : null,
  AllEmployees: [],
  AllTasks: [],
  token: token ? token : null,
  error: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  // axios
  const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api/',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutCompany()
      }
      return Promise.reject(error)
    }
  )


  const addUserToLocalStorage = ({ company, token }) => {
    localStorage.setItem("company", JSON.stringify(company));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
  };

  const logoutCompany = () => {
    dispatch({ type: LOGOUT_COMPANY });
    removeUserFromLocalStorage();
  };

  const createCompany = async ({ company }) => {
    console.log("createCompany", company);
    dispatch({ type: SET_COMPANY_BEGIN });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/company/register`,
        company
      );

      const { company: newCompany, token } = data;
      dispatch({
        type: SET_COMPANY_SUCCESS,
        payload: { company: newCompany, token },
      });
      addUserToLocalStorage({ company: newCompany, token });
    } catch (error) {
      dispatch({
        type: SET_COMPANY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const loginCompany = async ({ companyEmail, companyPassword }) => {
    dispatch({ type: LOGIN_COMPANY_BEGIN });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/company/login`,
        {
          companyEmail,
          companyPassword,
        }
      );

      const { company: newCompany, token } = data;
      dispatch({
        type: LOGIN_COMPANY_SUCCESS,
        payload: { company: newCompany, token },
      });
      addUserToLocalStorage({ company: newCompany, token });
    } catch (error) {
      dispatch({
        type: LOGIN_COMPANY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getAllEmployeescompanyId = async () => {
    dispatch({ type: GET_ALL_EMPLOYEES_BEGIN });

    try {
      let payload = {
        company_id: company.company_id,
      };
      const { data } = await authFetch.post(
        `employee/getAllEmployeeByCompanyId`, payload);

      dispatch({
        type: GET_ALL_EMPLOYEES_SUCCESS,
        payload: { AllEmployees: data.employees },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_EMPLOYEES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getAllTaskByCompanyId = async () => {
    dispatch({ type: GET_ALL_TASKS_BEGIN });

    try {
      const { data } = await authFetch.post(`task/getAllTaskByCompanyId`);
      console.log(data);
      dispatch({
        type: GET_ALL_TASKS_SUCCESS,
        payload: { AllTasks: data },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TASKS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  }

  const getTaskSearchParam = async (searchParam) => {
    dispatch({ type: GET_TASK_BY_SEARCH_BEGIN });

    try {
      const { data } = await authFetch.post("task/getTaskSearchParam", { searchParam });
      dispatch({
        type: GET_TASK_BY_SEARCH_SUCCESS,
        payload: { AllTasks: data },
      });
    } catch (error) {
      dispatch({
        type: GET_TASK_BY_SEARCH_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        createCompany,
        loginCompany,
        logoutCompany,
        getAllEmployeescompanyId,
        getAllTaskByCompanyId,
        getTaskSearchParam,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
