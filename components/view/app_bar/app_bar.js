import { ToggleButton } from '../buttons'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useTheme } from '@emotion/react'
import LogoImage from './logo_image'

const stylesFactory = memoStylesFactory((theme) => {
    const { bgColor, textColor, zIndex, bp } = theme
    const height = 13

    return {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: `${height / 2}rem`,
            height: `${height / 2}rem`,
            color: textColor(),
            zIndex: zIndex.overlay + 1,
            [bp.median]: {
                minHeight: `${height}rem`,
                height: `${height}rem`,
            },
        },
        get logo() {
            const width = 25
            return {
                position: 'relative',
                minWidth: `${width / 2}rem`,
                height: '100%',
                backgroundColor: bgColor(),
                [bp.median]: {
                    minWidth: `${width}rem`,
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 1,
                    backgroundColor: textColor(0.25),
                },
            }
        },
        imgContainer: {
            position: 'relative',
            padding: '1rem',
            ...styleUtils.fullSize,
            [bp.median]: {
                padding: '3rem',
            },
        },
    }
})

const AppBar = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div css={styles.container}>
            <div css={styles.logo}>
                <LogoImage
                    css={styles.imgContainer}
                    alt="logo"
                />
            </div>
            <ToggleButton />
        </div>
    )
}

export default AppBar
