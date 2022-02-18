import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { cssToArray } from '@Utils'
import { Button } from '@Components/view/buttons'
import { useDispatch } from 'react-redux'
import { actions } from '@Store'
import Editable from '@Components/view/editable'
import { useRef, useState } from 'react'

const {
    todos: { todoRemove, todoUpdate },
} = actions

const stylesFactory = memoStylesFactory((theme) => {
    const { textColorDark, bp } = theme
    return {
        container: { display: 'flex', flexDirection: 'row' },
        gride: {
            display: 'grid',
            gridTemplateColumns: '4fr 1fr',
        },
        contentGride: {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            columnGap: '1rem',
            position: 'relative',
            [bp.median]: {
                gridTemplateColumns: '1fr 3fr',
                columnGap: '3rem',
            },
        },

        name: {
            position: 'relative',
            paddingRight: '1rem',
            [bp.median]: {
                paddingRight: '1rem',
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                height: '100%',
                top: 0,
                right: 0,
                width: 1,
                backgroundColor: textColorDark(0.25),
            },
        },
        value: {
            position: 'relative',
        },
        controlsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            minWidth: '5rem',
        },
        input: {
            fontSize: 'inherit',
            backgroundColor: 'inherit',
            width: '80%',
        },
    }
})

const TodoItem = ({ entries = [], todoId, css: overrideCss, ...restProps }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const dispatch = useDispatch()
    //const editedTodo = useRef(null)
    const [editedTodo, setEditedTodo] = useState(null)
    const columns = entries.reduce((res, [name, value], i) => {
        res.push(<div key={`name_${i}`} css={styles.name}>{`${name}:`}</div>)
        res.push(
            <Editable
                key={`value_${i}`}
                text={`${value}`}
                placeholder={`${value}`}
                type="input">
                {({ ref, value, handleValueChange, placeholder }) => (
                    <input
                        ref={ref}
                        css={styles.input}
                        type="text"
                        onChange={(e) => {
                            handleValueChange(e, e.target.value)
                            setEditedTodo((prevState) => ({
                                ...prevState,
                                id: todoId,
                                [name.replace(/[\s:]+/i, '')]: e.target.value,
                            }))
                        }}
                        placeholder={`${placeholder}`}
                        value={`${value}`}
                    />
                )}
            </Editable>
        )
        return res
    }, [])
    return (
        <div css={[styles.gride, ...cssToArray(overrideCss)]} {...restProps}>
            <div css={styles.contentGride}>{columns}</div>
            <div css={styles.controlsContainer}>
                <div>
                    <Button
                        onClick={() => {
                            const id = todoId
                            dispatch(todoRemove(id))
                        }}>
                        delete
                    </Button>
                </div>
                <div>
                    {editedTodo && (
                        <Button
                            onClick={() => {
                                if (
                                    editedTodo != null &&
                                    typeof editedTodo === 'object'
                                ) {
                                    let { id = todoId, ...changes } = editedTodo
                                    dispatch(
                                        todoUpdate({
                                            id,
                                            changes,
                                        })
                                    )
                                    console.debug('SAVE', editedTodo)
                                    setEditedTodo(null)
                                }
                            }}>
                            save
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoItem
