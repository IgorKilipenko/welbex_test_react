import { actions, useAppDispatch, TodoItem as TodoItemType } from '@Store'
import { MotionBox } from '@Components/view/motion'
import { useState } from 'react'
import { Box, Grid, Flex } from '@chakra-ui/react'
import TrashButton from './trash_button'
import SaveButton from './save_button'
import TodoData from './todo_data'
import { useDispatch } from 'react-redux'

const {
    todos: { todoRemove, todoUpdate },
} = actions

const TodoItem = ({
    entries = [],
    todoId,
}: {
    entries: TodoItemType[]
    todoId: number
}) => {
    const dispatch = useDispatch()

    const [editedTodo, setEditedTodo] = useState<TodoItemType | null>(null)
    const [cleanEdited, setCleanEdited] = useState(false)
    return (
        <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            //transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Grid templateColumns={'4fr 1fr'} p={[1, 2]}>
                <Grid
                    templateColumns={['2fr 2fr', '1fr 3fr']}
                    columnGap={[1, 5]}>
                    <TodoData
                        items={entries}
                        cleanEdited={cleanEdited}
                        onChange={(e, name: string, value: string) => {
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
                                const { id = todoId, ...changes } = editedTodo
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

export default TodoItem
