import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PropTypes from 'prop-types'

const stylesFactory = memoStylesFactory((theme) => {
    const { textColorDark, fontMainSize, bgColorLight, bp } = theme
    const fontSize = fontMainSize * 0.8
    return {
        get container() {
            const box = (fontSize) => ({
                bottom: `${fontSize}rem`,
                right: `${fontSize}rem`,
                fontSize: `${fontSize}rem`,
                borderRadius: `${fontSize}rem`,
                height: `${fontSize * 1.2}rem`,
                width: `${fontSize * 1.2}rem`,
            })
            return {
                position: 'absolute',
                ...box(fontSize),
                backgroundColor: bgColorLight(1),
                color: textColorDark(0.5),
                [bp.median]: {
                    ...box(fontSize * 4),
                },
            }
        },
    }
})

const AddButton = ({ onClick, text = '+' }) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const [isHovered, setHovered] = useState(false)
    const animate = {
        boxShadow: isHovered ? theme.boxShadow(true) : theme.boxShadow(false),
    }
    return (
        <motion.button
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            css={styles.container}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={animate}>
            {text}
        </motion.button>
    )
}

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
}

export default AddButton
