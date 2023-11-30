import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return state = initialState
    } 
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, length) => {
  return async dispatch => {
    const messageLength = length * 1000
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, messageLength)
  }
}

export default notificationSlice.reducer