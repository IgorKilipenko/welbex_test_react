import { Global } from '@emotion/react'
import { global_css as globalStylesFactory } from '@Styles'
import { Provider } from 'react-redux'
import configureAppStore from '@Store'
import { Layout } from '@Components/view'
import { customTheme } from '@Components/theme'
import { useMemo } from 'react'
import Head from 'next/head'
import { Chakra } from '@Components/chakra'

const store = configureAppStore({
    theme: { darkTheme: false },
    components: {
        componentsState: { test: 'test1' },
    },
    todos: {},
})

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
                <Chakra>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Chakra>
            </Provider>
        </>
    )
}

export default App
