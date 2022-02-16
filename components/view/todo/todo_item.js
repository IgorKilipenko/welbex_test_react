import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { cssToArray } from '@Utils'

const stylesFactory = memoStylesFactory((theme) => {
    const { textColorDark, bp } = theme
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
        value: {
            position: 'relative',
            width: `${100 - nameColumnWidth - 15}%`,
            [bp.median]: {
                width: `${100 - nameColumnWidth}%`,
            },
        },
    }
})

const TodoItem = ({ entries = [], css: overrideCss, ...restProps }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
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
            {
                <>
                    <div css={styles.name}>{columns.names}</div>
                    <div css={styles.value}>{columns.values}</div>
                </>
            }
        </div>
    )
}

export default TodoItem
