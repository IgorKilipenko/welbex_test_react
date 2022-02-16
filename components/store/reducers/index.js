import themeSlice from './themeReducer'
import componentsSlice from './componentsReducer'

export {
    useMainComponentMousePosition,
    useMainMenuState,
} from './componentsReducer'
export { useTodoState } from './todoReducer'

import todoSlice, { updateTodoList, useTodoAdapterState, selectors } from './todoReducer'

const slicies = {
    theme: themeSlice,
    components: componentsSlice,
    todos: todoSlice,
}

export { slicies, updateTodoList, useTodoAdapterState, selectors as todoSelectors }
