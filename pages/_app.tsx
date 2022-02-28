import { Provider } from 'react-redux'
import configureAppStore from '@Store'
import { Layout } from '@Components/view'
import Head from 'next/head'
import { Chakra } from '@Components/chakra'
import { AppProps } from 'next/app'

const store = configureAppStore({
    theme: { darkTheme: false },
    components: {
        componentsState: { test: 'test1' },
    },
    todos: {},
})

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <Provider store={store}>
                {/* <Global styles={styles} /> */}
                <Chakra cookies={pageProps.cookies}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Chakra>
            </Provider>
        </>
    )
}

export default App
export { getServerSideProps } from '@Components/chakra'
