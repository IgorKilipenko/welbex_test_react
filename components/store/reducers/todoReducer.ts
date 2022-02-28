/* eslint-disable @typescript-eslint/unbound-method */
import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
    PayloadAction,
} from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export interface TodoItem {
    userId: number | string
    id: number | string
    title: string | string
    completed: boolean | string
}

const prepreData = (data: TodoItem | TodoItem[]) => {
    data = Array.isArray(data) ? data : [data]
    return data
}

export interface TodoQuery {
    id?: number
    limit?: number
    page?: number
}

export const updateTodoList = createAsyncThunk<
    TodoItem | TodoItem[],
    TodoQuery,
    unknown
>('todos/update', async (query, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${query?.id || ''}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        let data = (await response.json()) as TodoItem | TodoItem[]
        data = prepreData(data)
        return data
    } catch (err) {
        return rejectWithValue(err)
    }
})

const todoAdapter = createEntityAdapter<TodoItem>({
    selectId: (todo) => todo.id,
})

const initialState = {
    /*ids: [],
    entities: [],*/
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: todoAdapter.getInitialState({
        ...initialState,
    }),
    reducers: {
        todoAddOne: todoAdapter.addOne,
        todoAddMany: todoAdapter.addMany,
        todoUpdate: todoAdapter.updateOne,
        todoRemove: todoAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(updateTodoList.fulfilled, (state, { payload }) => {
            let loading = true
            if (Array.isArray(payload)) {
                loading = false
                todoAdapter.addMany(state, payload)
            } else if (typeof payload == 'object') {
                loading = false
                todoAdapter.addOne(state, payload)
            }
            if (!loading) {
                state.loading = loading
                state.error = null
            }
        })
        builder.addCase(updateTodoList.rejected, (state, action) => {
            state.loading = false
            if (action.payload) {
                state.error = action.payload //.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        builder.addCase(updateTodoList.pending, (state) => {
            state.loading = true
        })
    },
})

const selectors = todoAdapter.getSelectors<RootState>(
    (store) => store[todoSlice.name]
)

export const {
    selectAll: selectAllEntities,
    selectById: selectEntityById,
    selectIds: selectEntityIds,
    // Pass in a selector that returns the entities slice of state
  } = selectors

const useTodoState = () =>
    useSelector<RootState>((store) => store[todoSlice.name])
const useTodoAdapterState = () =>
    useSelector<RootState>((store) => selectors.selectAll(store))
const useTodoTotalCount = () =>
    useSelector<RootState>((store) => selectors.selectTotal(store))

export default todoSlice
export { useTodoState, useTodoAdapterState, useTodoTotalCount, selectors }

