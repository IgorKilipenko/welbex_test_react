import themeSlice from './themeReducer'
import componentsSlice from './componentsReducer'
export {
    useMainComponentMousePosition,
    useComponentsSelector,
} from './componentsReducer'
import todoSlice, { updateTodoList } from './todoReducer'

const slicies = {
    theme: themeSlice,
    components: componentsSlice,
    todos: todoSlice,
}

export { slicies, updateTodoList }
