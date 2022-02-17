const theme = () => {
    const bgOpacity = 1
    const textOpacity = 1
    return {
        bgOpacity,
        bgColor: (opacity = bgOpacity) => `rgba(17, 87, 64, ${opacity})`,
        bgColorLight: (opacity = bgOpacity) =>
            `rgba(155, 227, 191, ${opacity})`,
        bgColorDark: (opacity = bgOpacity) => `rgba(12, 68, 50, ${opacity})`,
        textColor: (opacity = textOpacity) => `rgba(255, 255, 255, ${opacity})`,
        textColorDark: (opacity = textOpacity) => `rgba(0, 0, 0, ${opacity})`,
        zIndex: {
            overlay: 999,
        },
        bp: {
            median: `@media (min-width: 768px)`,
            large: `@media (min-width: 1024px)`,
            extraLarge: `@media (min-width: 1200px)`,
        },
        get boxShadow() {
            const color = this.textColorDark
            return (hovered = false) => {
                return !hovered
                    ? `0 0.5rem 1.5rem ${color(0.12)}, 0 0.5rem 1rem ${color(0.24)}`
                    : `0 1rem 3rem ${color(0.25)}, 0 2rem 2rem ${color(0.22)}`
            }
        },
        fontHeaderSize: 10,
        get fontSubHeaderSize() {
            return this.fontHeaderSize * 0.7
        },
        get fontMainSize() {
            return this.fontHeaderSize * 0.5
        },
    }
}

export default theme
