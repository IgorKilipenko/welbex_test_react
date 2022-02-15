import { createAsyncThunk, createSlice, useSelector } from '@reduxjs/toolkit'

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
            const data = await response.json()
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

const initialState = {
    entities: {},
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateTodoList.fulfilled, (state, { payload }) => {
            state.error = null
            state.loading = false
            state.entities[payload.id] = payload
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

/**
 *
 * @returns {{entities:object, loading:boolean, error:any?}}
 */
const useTodoState = () => useSelector((store) => store[todoSlice.name])

export default todoSlice
export { useTodoState }
