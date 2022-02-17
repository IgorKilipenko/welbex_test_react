import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { cssToArray } from '@Utils'
import { Button } from '../buttons'
import { useDispatch } from 'react-redux'
import { actions } from '@Store'

const {
    todos: { todoRemove },
} = actions

const stylesFactory = memoStylesFactory((theme) => {
    const { textColorDark, bp, boxShadow } = theme
    const nameColumnWidth = 30
    return {
        container: { display: 'flex', flexDirection: 'row' },
        name: {
            position: 'relative',
            width: `${nameColumnWidth + 15}%`,
            marginRight: '3rem',
            [bp.median]: {
                width: `${nameColumnWidth}%`,
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
        get itemContainer() {
            return {
                ...this.container,
                position: 'relative',
                width: '100%',
            }
        },
        value: {
            position: 'relative',
            width: `${100 - nameColumnWidth - 15}%`,
            [bp.median]: {
                width: `${100 - nameColumnWidth}%`,
            },
        },
        controlsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            minWidth: '5rem',
        },
    }
})

const TodoItem = ({ entries = [], todoId, css: overrideCss, ...restProps }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const dispatch = useDispatch()
    const columns = entries.reduce(
        (res, [name, value], i) => {
            res.names.push(<div key={`name_${i}`}>{`${name}:`}</div>)
            res.values.push(<div key={`value_${i}`}>{`${value}`}</div>)
            return res
        },
        { names: [], values: [] }
    )
    return (
        <div
            css={[styles.container, ...cssToArray(overrideCss)]}
            {...restProps}>
            <div css={styles.itemContainer}>
                <div css={styles.name}>{columns.names}</div>
                <div css={styles.value}>{columns.values}</div>
                <div css={styles.controlsContainer}>
                    <Button
                        onClick={() => {
                            const id = todoId
                            dispatch(todoRemove(id))
                        }}>
                        delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
