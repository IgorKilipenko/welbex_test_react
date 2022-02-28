import store, {
    configureAppStore,
    actions,
    useAppDispatch,
    useAppSelector,
} from './store'
import type { AppDispatch, RootState } from './store'

export {
    useMainMenuState,
    useMainComponentMousePosition,
    useTodoState,
    updateTodoList,
} from './reducers'

import type { TodoItem } from './reducers/todoReducer'

export default store
export { configureAppStore, actions, useAppDispatch, useAppSelector }
export type { AppDispatch, RootState, TodoItem }
