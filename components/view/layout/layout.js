import { AppBar, MenuOverlay } from '@Components/view'
import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useDispatch } from 'react-redux'
import { actions as storeActions, useMainComponentMousePosition } from '@Store'
import { useEffect, useRef } from 'react'

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
            position: 'absolute',
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
    const mousePosition = useMainComponentMousePosition()
    const dispatch = useDispatch()
    const timer = useRef(0)

    const hadleMouseMove = (e) => {
        const now = Date.now()
        if (now - timer.current < 100) {
            return
        }

        const { clientX, clientY } = e

        if (
            Math.pow(
                Math.pow(clientX - mousePosition.clientX, 2) +
                    Math.pow(clientY - mousePosition.clientY, 2),
                0.5
            ) < 5
        ) {
            return
        }

        dispatch(
            storeActions.components.setMainComponentMousePosition({
                clientX,
                clientY,
            })
        )

        timer.current = now
    }

    const handleHover = (hovered) => {
        dispatch(
            storeActions.components.setMainComponentMousePosition({
                hovered,
            })
        )
    }

    return (
        <div css={styles.container}>
            <AppBar />
            <MenuOverlay />
            <main
                css={styles.page}
                onMouseMove={(e) => hadleMouseMove(e)}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(true)}>
                {children}
            </main>
        </div>
    )
}

export default Layout
