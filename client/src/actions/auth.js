import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        const { data }  = await api.signin(formData) 
        dispatch({ type: "AUTH", data})
        history.push('/')
    } catch (error) {
        console.log("in action/auth signin error:" , error)
    }
}

export const signup = (formData,history) => async (dispatch) => {
    try {
        // signup in the user
        const { data }  = await api.signup(formData) 
        dispatch({ type: "AUTH", data})
        history.push('/')
    } catch (error) {
        console.log("in action/auth signup error:" , error)
    }
}