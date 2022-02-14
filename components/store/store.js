import { configureStore } from '@reduxjs/toolkit'
import { slicies } from './reducers'


export {
    useComponentsSelector,
    useMainComponentMousePosition,
} from './reducers'

const themeSlice = slicies.theme
const componentsSlice = slicies.components

const actions = {
    theme: { ...themeSlice.actions },
    components: { ...componentsSlice.actions },
}

const configureAppStore = ({ theme, components }) => {
    const reducer = {
        theme: themeSlice.reducer,
        components: componentsSlice.reducer,
    }
    const store = configureStore({
        reducer,
        preloadedState: {
            theme: { ...themeSlice.getInitialState(), ...theme },
            components: { ...componentsSlice.getInitialState(), ...components },
        },
        //devTools: process.env.NODE_ENV !== 'production',
    })
    return store
}

export default configureAppStore
export { actions }
