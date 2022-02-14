//// import { createReducer } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { darkTheme: false }

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkTheme: {
            reducer: (state, action) => {
                state.darkTheme = action.payload
            },
            prepare: (val) => {
                if (val != null && typeof val === 'object' && 'payload' in Object.keys(val)) {
                    return val
                }
                return { payload: val }
            },
        },
    },
})

/*export default themeSlice.reducer
export const { setDarkTheme } = themeSlice.actions*/

export default themeSlice