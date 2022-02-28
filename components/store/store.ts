import { configureStore, Action, EntityState } from '@reduxjs/toolkit'
import { slicies } from './reducers'
import { createLogger } from 'redux-logger'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

const logger = createLogger({
    predicate: (getState, action: Action) =>
        action.type !== 'components/setMainComponentMousePosition',
    collapsed: (getState, action, logEntry) => !logEntry.error,
})

const themeSlice = slicies.theme
const componentsSlice = slicies.components
const todoSlice = slicies.todos

const actions = {
    theme: { ...themeSlice.actions },
    components: { ...componentsSlice.actions },
    todos: { ...todoSlice.actions },
}


const configureAppStore = ({ theme, components, todos }) => {
    const reducer = {
        theme: themeSlice.reducer,
        components: componentsSlice.reducer,
        todos: todoSlice.reducer,
    }
    const store = configureStore({
        reducer,
        preloadedState: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            theme: { ...themeSlice.getInitialState(), ...theme },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            components: { ...componentsSlice.getInitialState(), ...components },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            todos: { ...todoSlice.getInitialState(), ...todos },
        },
        middleware: (getDefaultMiddleware) => {
            if (process.env.NODE_ENV === `development`) {
                return getDefaultMiddleware().concat(logger)
            }
            return getDefaultMiddleware()
        },
        devTools: process.env.NODE_ENV !== 'production',
    })
    return store
}

const store = configureAppStore({ theme: {}, components: {}, todos: {} })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
export { configureAppStore, actions }
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()