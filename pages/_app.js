import { Global, ThemeProvider } from '@emotion/react'
import { global_css as globalStylesFactory } from '@Styles'
import { Provider } from 'react-redux'
import configureAppStore from '@Store'
import { Layout } from '@Components/view'
import themeFactory, { customTheme } from '@Components/theme'
import { useMemo } from 'react'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

const store = configureAppStore({
    theme: { darkTheme: false },
    components: {
        componentsState: { test: 'test1' },
    },
    todos: {},
})

//const theme = themeFactory()

const App = ({ Component, pageProps }) => {
    const styles = useMemo(() => {
        return globalStylesFactory(customTheme.oldTheme)
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
                <ChakraProvider theme={customTheme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </Provider>
        </>
    )
}

export default App
