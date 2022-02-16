import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'


const prepreData = (data) => {
    console.assert(
        data != null && (Array.isArray(data) || typeof data === 'object'),
        'Data structure must be an array and not null'
    )
    data = Array.isArray(data) ? data : [data]
    return data
}

export const updateTodoList = createAsyncThunk(
    'todos/update',
    async ({ id = '' }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'GET',
                    header: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
            let data = await response.json()
            data = prepreData(data)
            return data
        } catch (err) {
            let error = err
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const todoAdapter = createEntityAdapter({
    selectId: (todo) => todo.id,
})

const initialState = {
    ids: [], 
    entities: {},
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: todoAdapter.getInitialState({
		...initialState
	}),
    reducers: {
        usersAddOne: todoAdapter.addOne,
		usersAddMany: todoAdapter.addMany,
		userUpdate: todoAdapter.updateOne,
		userRemove: todoAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder.addCase(updateTodoList.fulfilled, (state, { payload }) => {
            let loading = true
            if (Array.isArray(payload)) {
                loading = false
                todoAdapter.addMany(state, payload)
            }else if (typeof payload == 'object') {
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
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        builder.addCase(updateTodoList.pending, (state) => {
            state.loading = true
        })
    },
})

const selectors = todoAdapter.getSelectors((store) => store[todoSlice.name])

/**
 *
 * @returns {{entities:object, loading:boolean, error:any?}}
 */
const useTodoState = () => useSelector((store) => store[todoSlice.name])
const useTodoAdapterState = () => useSelector((store) => selectors.selectAll(store))



export default todoSlice
export { useTodoState, useTodoAdapterState, selectors }
