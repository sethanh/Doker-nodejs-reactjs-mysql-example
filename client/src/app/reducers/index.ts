import { combineReducers } from '@reduxjs/toolkit'
import loadingSlice from './loading.reducer'
import appSlice from './app.reducer'
import languageSlice from './language.reducer'

import { homeReducers } from '../../pages/home'

export * from './language.reducer'

const appReducer = combineReducers({
    app: appSlice,
    loading: loadingSlice,
    language: languageSlice,
    ...homeReducers
})

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action)
}

export default rootReducer
