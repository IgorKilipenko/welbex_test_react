export const cssToArray = (css) => {
    if (css == null || Array.isArray(css)) {
        return css == null ? [] : css
    }
    return [css]
}