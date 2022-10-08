
import { createSlice } from '@reduxjs/toolkit'
// import { toasType } from '../constants'

interface AppProps {
  message?: {
    value?: string
    type?: string
  }
}

const initialState: AppProps = {
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionPushToast(state, action) {
      console.log(action)
      return {
        ...state,
      }
    },
  },
})

export const { actionPushToast } = appSlice.actions
export default appSlice.reducer
