import { configureStore } from '@reduxjs/toolkit'
import { slicies } from './reducers'
import logger from 'redux-logger'


const themeSlice = slicies.theme
const componentsSlice = slicies.components
const todoSlice = slicies.todos

const actions = {
    theme: { ...themeSlice.actions },
    components: { ...componentsSlice.actions },
    todos: { ...todoSlice.actions },
}

const configureAppStore = ({ theme, components, todos}) => {
    const reducer = {
        theme: themeSlice.reducer,
        components: componentsSlice.reducer,
        todos: todoSlice.reducer
    }
    const store = configureStore({
        reducer,
        preloadedState: {
            theme: { ...themeSlice.getInitialState(), ...theme },
            components: { ...componentsSlice.getInitialState(), ...components },
            todos: { ...todoSlice.getInitialState(), ...todos}
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    })
    return store
}

export default configureAppStore
export { actions }
