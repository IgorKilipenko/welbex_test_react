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
                width: `${fontSize}rem`,
                height: `${fontSize}rem`,
            })
            const line = {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '0.5rem',
                backgroundColor: textColorDark(0.75),
                width: '50%',
                height: '0.5rem',
            }
            return {
                position: 'absolute',
                padding: 0,
                borderRadius: `50%`,
                ...box(fontSize),
                backgroundColor: bgColorLight(1),
                color: textColorDark(0.5),
                [bp.median]: {
                    ...box(fontSize * 4),
                },
                '&::after': {
                    content: '""',
                    ...line,
                },
                '&::before': {
                    content: '""',
                    ...line,
                    height: '50%',
                    width: '0.5rem',
                },
            }
        },
    }
})

const AddButton = ({ onClick }) => {
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
                onClick(e)
            }}
            css={styles.container}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={animate}></motion.button>
    )
}

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
}

export default AddButton
