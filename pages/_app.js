import { Global, ThemeProvider } from '@emotion/react'
import { global_css as globalStylesFactory } from '@Styles'
import { Provider } from 'react-redux'
import configureAppStore from '../components/store'
import { Layout } from '../components/view'
import themeFactory from '@Components/theme'
import { useMemo } from 'react'
import Head from 'next/head'

const store = configureAppStore({
    theme: { darkTheme: false },
    components: {
        componentsState: { test: 'test1' },
    },
    todos: {}
})

const theme = themeFactory()

const App = ({ Component, pageProps }) => {
    const styles = useMemo(() => {
        return globalStylesFactory(theme)
    }, [])
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <Provider store={store}>
                <Global styles={styles} />
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </Provider>
        </>
    )
}

export default App
