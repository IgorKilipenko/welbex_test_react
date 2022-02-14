import { ToggleButton } from '../buttons'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useTheme } from '@emotion/react'
import { WrappedImage as Image } from '@Components/view'

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
            height: `${height / 2}rem`,
            color: textColor(),
            zIndex: zIndex.overlay + 1,
            [bp.median]: {
                height: `${height}rem`,
            },
        },
        get logo() {
            const width = 20
            return {
                position: 'relative',
                width: `${width / 2}rem`,
                height: '100%',
                backgroundColor: bgColor(),
                [bp.median]: {
                    width: `${width}rem`,
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
        },
    }
})

const AppBar = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div css={styles.container}>
            <div css={styles.logo}>
                <Image
                    css={styles.imgContainer}
                    src={'/images/logo.svg'}
                    layout={'fill'}
                    alt="logo"
                    priority={true}
                />
            </div>
            <ToggleButton />
        </div>
    )
}

export default AppBar
