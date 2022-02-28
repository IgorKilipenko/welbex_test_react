import { render, cleanup } from '@testing-library/react'
import TodoPage from '@Pages/todo'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import themeFactory from '@Components/theme'
import configureAppStore from '@Store'

const createWithProviders = (component) => {
    const theme = themeFactory()
    const store = configureAppStore({
        theme: { darkTheme: false },
        components: {
            componentsState: { test: 'test1' },
        },
        todos: {},
    })
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{component}</ThemeProvider>
        </Provider>
    )
}

afterEach(cleanup)

describe('Todo Page tests', () => {
    test('it has todo list', async () => {
        const { findByTestId } = render(createWithProviders(<TodoPage />))
        const listitem = await findByTestId(/todo-list-element$/i)
        expect(listitem).toBeInTheDocument()
        expect(listitem).not.toBeEmptyDOMElement()
    })
})
