const Globals_css = ({ bp }) => {
    return {
        html /*'html, body'*/: {
            padding: '0',
            margin: '0',
            fontSize: 'calc(10 * (100vw / var(--size)))', //'10px',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        },
        get body() {
            //const { fontSize, ...body } = this.html
            return { ...this.html }
        },
        a: { color: 'inherit', textDecoration: 'none' },
        '*': { boxSizing: 'border-box' },
        '*, *::before, *::after': {
            border: 'none',
        },
        button: {
            cursor: 'pointer',
        },
        ':root': { '--size': '375' },
        [bp.median]: { ':root': { '--size': '1920' } },
    }
}

export { Globals_css as default }
