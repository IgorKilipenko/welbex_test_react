import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import Head from 'next/head'
import HomeComponent from '@Components/view/home'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp } = theme
    return {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent : 'center',
            ...styleUtils.fullSize,
        },
    }
})

const HomePage = (/*props*/) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <>
            <Head>
                <title>HOME | To Do</title>
            </Head>

            <div css={styles.container}>
                <HomeComponent />
                <div></div>
            </div>
        </>
    )
}

export { HomePage as default }
