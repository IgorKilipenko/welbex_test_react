import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp, fontHeaderSize, fontMainSize } = theme
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            margin: '0 2rem',
            justifyContent: 'center',
            [bp.median]: {
                width: 'auto',
                alignItems: 'flex-start',
                justifyContent: 'center',
            },
        },
        header: {
            fontSize: `${fontHeaderSize / 4}rem`,
            fontWeight: 'bold',
            [bp.median]: {
                fontSize: `${fontHeaderSize}rem`,
            },
        },
        text: {
            fontSize: `${fontMainSize / 3}rem`,
            [bp.median]: {
                fontSize: `${fontHeaderSize}rem`,
            },
        },
    }
})

const HomeComponent = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div css={styles.container}>
            <div css={styles.header}>Тестовое задание React</div>
            <div css={styles.text}>выполнил: Килипенко Игорь</div>
        </div>
    )
}

export default HomeComponent
