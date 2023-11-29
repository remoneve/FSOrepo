import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    voteNotification(state, action) {
      return `you voted '${action.payload}' `
    },
    addingNotification(state, action) {
      return `you added '${action.payload}'`
    },
    clearNotification(state, action) {
      return state = initialState
    } 
  }
})

export const { voteNotification, clearNotification, addingNotification } = notificationSlice.actions
export default notificationSlice.reducer