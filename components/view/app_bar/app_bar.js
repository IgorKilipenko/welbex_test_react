import { ToggleButton } from '../buttons'
import { memoStylesFactory } from '@Styles'
import { useTheme } from '@emotion/react'
import Image from 'next/image'

const stylesFactory = memoStylesFactory((theme) => {
    const { bgColor, textColor } = theme
    return {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems:'flex-start',
            top: 0,
            left: 0,
            width: '100%',
            height: '10rem',
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
        logo:{
            position: 'relative',
            width:'20rem',
            height:'100%',
            backgroundColor: bgColor(),
        },
        img: {
            //position: 'relative',
        }
    }
})

const AppBar = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div css={styles.container}>
            <div css={styles.logo}><Image css={styles.img} src={'/images/logo.svg'} layout={'fill'} /></div>
            <ToggleButton />
        </div>
    )
}

export default AppBar
