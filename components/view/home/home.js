import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp, fontHeaderSize, fontMainSize } = theme
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: '10%',
            [bp.median]: {
                width: 'auto',
            },
        },
        header: {
            fontSize:`${fontHeaderSize}rem`
        },
        text: {
            fontSize:`${fontMainSize}rem`
        }
    }
})

const HomeComponent = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <div  css={styles.container}>
            <div css={styles.header}>Тестовое задание React</div>
            <div css={styles.text}>выполнил: Килипенко Игорь</div>
        </div>
    )
}

export default HomeComponent
