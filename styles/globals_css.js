const Globals_css = ({ bp }) => {
    return {
        ...restCss,
        html /*'html, body'*/: {
            padding: '0',
            margin: '0',
            fontSize: 'calc(10 * (100vw / var(--size)))', //'10px',
            lineHeight: 1.5,
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
        [bp.median]: { ':root': { '--size': '1280' } },
        [bp.large]: { ':root': { '--size': '1920' } },
        [bp.extraLarge]: { ':root': { '--size': '2560' } },
    }
}

const restCss = {
    [`html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video`]: {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: '100%',
        font: 'inherit',
        verticalAlign: 'baseline',
    },
    /* HTML5 display-role reset for older browsers */
    [`article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section`]: {
        display: 'block',
    },
    body: {
        lineHeight: 1,
    },
    'ol, ul': {
        listStyle: 'none',
    },
    'blockquote, q': {
        quotes: 'none',
    },
    table: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
    },
}

export { Globals_css as default }
