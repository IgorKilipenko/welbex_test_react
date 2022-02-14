const theme = () => {
    return {
        bgColor: (opacity=1) => `rgba(17, 87, 64, ${opacity})`,
        bgColorLight : (opacity=1) => `rgba(155, 227, 191, ${opacity}`,
        textColor: (opacity=1) => `rgba(255, 255, 255, ${opacity})`,
    }
}

export default theme
