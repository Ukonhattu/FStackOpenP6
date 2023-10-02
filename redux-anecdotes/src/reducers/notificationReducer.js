import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: {
            reducer(state, action) {
                return action.payload
            },
            prepare(message, timeout) {
                return {
                    payload: {
                        message,
                        timeout
                    }
                }
            }
        },
        }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer