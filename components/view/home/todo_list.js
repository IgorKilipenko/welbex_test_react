import { useTheme } from '@emotion/react'
import { nanoid } from '@reduxjs/toolkit'
import { memoStylesFactory, styleUtils } from '@Styles'
import { Scrollbars } from 'react-custom-scrollbars'

const stylesFactory = memoStylesFactory((theme) => {
    const { absoluteCenter } = styleUtils
    const { textColorDark, bp } = theme
    return {
        container: {
            absoluteCenter,
            color: textColorDark(),
            fontSize: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
        },
        scrollContainer: {
            position: 'relative',
        },
        list: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        footer: {},
    }
})

const TodoList = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div css={styles.container}>
            <Scrollbars
                universal
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                css={styles.scrollContainer}>
                <ul css={styles.list}>
                    {[...new Array(50)].map((_, i) => {
                        const key = `${nanoid()}_${i}`
                        return <li key={key}>{`Item #${i}`}</li>
                    })}
                </ul>
            </Scrollbars>
            <div css={styles.footer}>BUTTONS</div>
        </div>
    )
}

export default TodoList
