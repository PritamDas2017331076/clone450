import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    name: '',
    token: '',
    post: '',
    university: '',
    department: '',
    id: '',
    avatar: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.email = action.payload
        },
        updateName: (state, action) => {
            state.name = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload
        },
        updatePost: (state, action) => {
            state.post = action.payload
        },
        updateUniversity: (state, action) => {
            state.university = action.payload
        },
        updateDepartment: (state, action) => {
            state.department = action.payload
        },
        updateId: (state, action) => {
            state.id = action.payload
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload
        },

    }
})

export const {
    updateEmail,
    updateName,
    updateToken,
    updatePost,
    updateUniversity,
    updateDepartment,
    updateId,
    updateAvatar,
} = loginSlice.actions
    /*
        updateEmail,
        updateName,
        updateToken,
        updatePost,
        updateUniversity,
        updateDepartment,
        updateId,
        updateAvatar,
        selectEmail,
        selectName,
        selectToken,
        selectPost,
        selectUniversity,
        selectDepartment,
        selectId,
        selectAvatar

    */


export const selectEmail = (state) => state.login.email

export const selectName = (state) => state.login.name

export const selectToken = (state) => state.login.token

export const selectPost = (state) => state.login.post

export const selectUniversity = (state) => state.login.university

export const selectDepartment = (state) => state.login.department

export const selectId = (state) => state.login.id

export const selectAvatar = (state) => state.login.avatar


export default loginSlice.reducer