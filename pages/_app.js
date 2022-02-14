import { Global, ThemeProvider } from '@emotion/react'
import { global_css } from '@Styles'
import { Provider } from 'react-redux'
import configureAppStore from '../components/store'
import { Layout } from '../components/view'
import theme from '@Components/theme'

const store = configureAppStore({
    theme: { darkTheme: false },
    components: {
        componentsState: { test: 'test1' },
    },
})

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Global styles={global_css} />
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    )
}

export default App
