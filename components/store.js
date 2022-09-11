import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './Loginslice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
})