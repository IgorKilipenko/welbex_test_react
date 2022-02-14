import { ToggleButton } from '../buttons'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useTheme } from '@emotion/react'
import { WrappedImage as Image } from '@Components/view'

const stylesFactory = memoStylesFactory((theme) => {
    const { bgColor, textColor } = theme
    return {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            top: 0,
            left: 0,
            width: '100%',
            height: '13rem',
            //backgroundColor: bgColor(),
            color: textColor(),
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 1,
                backgroundColor: textColor(0.25),
            },
        },
        logo: {
            position: 'relative',
            width: '20rem',
            height: '100%',
            backgroundColor: bgColor(),
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
