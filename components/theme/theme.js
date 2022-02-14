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
        },
    }
}

export default theme
