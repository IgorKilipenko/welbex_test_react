import { AppBar, MenuOverlay } from '@Components/view'
import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'

const stylesFactory = memoStylesFactory((/*theme*/) => {
    const { fullSize } = styleUtils
    return {
        container: {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ...fullSize,
            overscrollBehavior: 'none',
        },
        page: {
            position: 'relative',
            ...fullSize,
            overflowY: 'hidden',
            overflowX: 'hidden',
        },
    }
})

const Layout = (props) => {
    const { children } = props
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div css={styles.container}>
            <AppBar />
            <MenuOverlay />
            <main css={styles.page}>{children}</main>
        </div>
    )
}

export default Layout
