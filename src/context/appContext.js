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
  LOGIN_EMPLOYEE_BEGIN,
  LOGIN_EMPLOYEE_SUCCESS,
  LOGIN_EMPLOYEE_ERROR,
  GET_TASK_BY_EMPLOYEE_ID_BEGIN,
  GET_TASK_BY_EMPLOYEE_ID_SUCCESS,
  GET_TASK_BY_EMPLOYEE_ID_ERROR,
  EDIT_EMPLOYEE_BEGIN,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const company = localStorage.getItem("company");
const employee = localStorage.getItem("employee");
const iswho = localStorage.getItem("iswho");

const initialState = {
  isLoading: false,
  company: company ? company : "",
  employee: employee ? employee : "",
  AllEmployees: [],
  AllassignedTasks: [],
  AllTasks: [],
  token: token ? token : null,
  error: null,
  iswho: iswho ? iswho : null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "http://localhost:5000/api/",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutCompany();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ company, token, employee, iswho }) => {
    localStorage.setItem("company", JSON.stringify(company));
    localStorage.setItem("employee", JSON.stringify(employee));
    localStorage.setItem("token", token);
    localStorage.setItem("iswho", iswho);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("employee");
    localStorage.removeItem("iswho");
  };

  const logoutCompany = () => {
    dispatch({ type: LOGOUT_COMPANY });
    removeUserFromLocalStorage();
  };

  const createCompany = async ({ company }) => {
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
        payload: { company: newCompany, token, iswho: "company" },
      });
      addUserToLocalStorage({ company: newCompany, token, iswho: "company" });
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
      const { data } = await authFetch.post(
        `employee/getAllEmployeeByCompanyId`
      );

      dispatch({
        type: GET_ALL_EMPLOYEES_SUCCESS,
        payload: { AllEmployees: data.employees },
      });
    } catch (error) {
      console.log(error);
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
  };

  const getTaskSearchParam = async (searchParam) => {
    dispatch({ type: GET_TASK_BY_SEARCH_BEGIN });

    try {
      const { data } = await authFetch.post("task/getTaskSearchParam", {
        searchParam,
      });
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
  };

  const getAllTaskByEmployeeCode = async () => {
    dispatch({ type: GET_TASK_BY_EMPLOYEE_ID_BEGIN });

    try {
      const { data } = await authFetch.post(`task/getAllTaskByEmployeeCode`);
      dispatch({
        type: GET_TASK_BY_EMPLOYEE_ID_SUCCESS,
        payload: { AllassignedTasks: data },
      });
    } catch (error) {
      dispatch({
        type: GET_TASK_BY_EMPLOYEE_ID_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const employeeLogin = async ({ employeeEmail, employeePassword }) => {
    dispatch({ type: LOGIN_EMPLOYEE_BEGIN });
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/employee/employeeLogin`,
        {
          employeeEmail,
          employeePassword,
        }
      );

      const { employee: newEmployee, token } = data;
      dispatch({
        type: LOGIN_EMPLOYEE_SUCCESS,
        payload: { employee: newEmployee, token, iswho: "employee" },
      });
      addUserToLocalStorage({
        employee: newEmployee,
        token,
        iswho: "employee",
      });
    } catch (error) {
      dispatch({
        type: LOGIN_EMPLOYEE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const editEmployee = async ( employee ) => {
    dispatch({ type: EDIT_EMPLOYEE_BEGIN });
    try {
      const { data } = await authFetch.post(`employee/editEmployee`, {
        employee,
      });
      dispatch({
        type: EDIT_EMPLOYEE_SUCCESS,
        payload: { AllEmployees: data },
      });
    } catch (error) {
      dispatch({
        type: EDIT_EMPLOYEE_ERROR,
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
        employeeLogin,
        getAllTaskByEmployeeCode,
        editEmployee,
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
