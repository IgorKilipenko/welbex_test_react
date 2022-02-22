import { useDispatch } from 'react-redux'
import { actions } from '@Store'
import Editable from '@Components/view/editable'
import { MotionBox } from '@Components/view/motion'
import { useState } from 'react'
import { Box, Button, Grid, Flex, Text, Input } from '@chakra-ui/react'
import TrashButton from './trash_button'
import SaveButton from './save_button'
import TodoData from './todo_data'

const {
    todos: { todoRemove, todoUpdate },
} = actions

const TodoItem = ({ entries = [], todoId }) => {
    const dispatch = useDispatch()
    const [editedTodo, setEditedTodo] = useState(null)
    const [cleanEdited, setCleanEdited] = useState(false)

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <Grid templateColumns={'4fr 1fr'} p={[1, 2]}>
                <Grid
                    templateColumns={['2fr 2fr', '1fr 3fr']}
                    columnGap={[1, 5]}>
                    <TodoData
                        todoId={todoId}
                        items={entries}
                        cleanEdited={cleanEdited}
                        onChange={(e, name, value) => {
                            setCleanEdited(false)
                            setEditedTodo((prevState) => {
                                const key = name.replace(/[\s:]+/i, '')
                                return {
                                    ...prevState,
                                    id: todoId,
                                    [key]: value,
                                }
                            })
                        }}
                    />
                </Grid>
                <Flex
                    direction="column"
                    justify="flex-start"
                    align="flex-end"
                    minW={5}>
                    {editedTodo ? (
                        <SaveButton
                            onSave={() => {
                                let { id = todoId, ...changes } = editedTodo
                                dispatch(
                                    todoUpdate({
                                        id,
                                        changes,
                                    })
                                )
                                setEditedTodo(null)
                            }}
                            onCancel={() => {
                                setCleanEdited(true)
                                setEditedTodo(null)
                            }}
                        />
                    ) : (
                        <TrashButton
                            onClick={() => {
                                const id = todoId
                                dispatch(todoRemove(id))
                            }}
                        />
                    )}
                </Flex>
            </Grid>
        </MotionBox>
    )
}

const TodoItemWChakra = (props) => {
    return (
        <Box>
            <TodoItem {...props} />
        </Box>
    )
}

export default TodoItemWChakra
