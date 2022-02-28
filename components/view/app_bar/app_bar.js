import { ToggleButton } from '../buttons'
import { memoStylesFactory, styleUtils } from '@Styles'
import LogoImage from './logo_image'
import { useTheme, Box } from '@chakra-ui/react'

const stylesFactory = memoStylesFactory((theme) => {
    const { bgColor, textColor, appBarHeight } = theme
    const height = appBarHeight

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
        },
        get logo() {
            const width = height * 2
            return {
                position: 'relative',
                minWidth: `${width / 2}rem`,
                height: '100%',
                backgroundColor: bgColor(),
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
            padding: `${height / 10}rem`,
            ...styleUtils.fullSize,
        },
    }
})

const AppBar = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    return (
        <Box zIndex={'modal'}>
            <div css={styles.container}>
                <div css={styles.logo}>
                    <LogoImage css={styles.imgContainer} alt="logo" />
                </div>
                <ToggleButton />
            </div>
        </Box>
    )
}

export default AppBar
