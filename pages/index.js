import { AppBar } from '@Components/view'
import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import Head from 'next/head'

const stylesFactory = memoStylesFactory((theme) => {
    return {
        container: {
            position: 'relative',
            display: 'flex',
            ...styleUtils.fullSize,
        },
        contentContainer: {
            position: 'absolute',
            ...styleUtils.fullSize,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '3rem',
            [styleUtils.bp.median.cssTag]: {
                padding: '8rem',
            },
        },
    }
})

const Home = (/*props*/) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    return (
        <>
            <Head>
                <title>HOME | To Do</title>
            </Head>

            <div css={styles.container}>
                <AppBar />
            </div>
        </>
    )
}

export { Home as default }
