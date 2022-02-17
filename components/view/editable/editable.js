import { useTheme } from '@emotion/react'
import { memoStylesFactory } from '@Styles'
import { cssToArray } from '@Utils'
import { useState, useEffect, useRef } from 'react'

const stylesFactory = memoStylesFactory((theme) => {
    const { textColorDark, bp, boxShadow } = theme
    return {
        container: {
            fontSize: 'inherit',
            backgroundColor: 'inherit',
        }
    }
})

const Editable = ({
    text,
    type,
    placeholder,
    children,
    css:overrideCss,
    //childRef,
    ...props
}) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const [isEditing, setEditing] = useState(false)
    const [value, setValue] = useState(text)
    const childRef = useRef()
    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus()
        }
    }, [isEditing, childRef])

    const handleKeyDown = (event, type) => {
        const { key } = event
        const keys = ['Escape', 'Tab']
        const enterKey = 'Enter'
        const allKeys = [...keys, enterKey]
        if (
            (type === 'textarea' && keys.indexOf(key) > -1) ||
            (type !== 'textarea' && allKeys.indexOf(key) > -1)
        ) {
            setEditing(false)
        }
    }

    const handleValueChange = (event, value) => {
        setValue(value)
    }

    return (
        <section css={[styles.container, ...cssToArray(overrideCss)]} {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => handleKeyDown(e, type)}>
                    {children({ref: childRef, handleValueChange, value, placeholder})}
                </div>
            ) : (
                <div
                    onClick={() => setEditing(true)}>
                    <span
                    >
                        {value || placeholder /*|| 'Editable content'*/}
                    </span>
                </div>
            )}
        </section>
    )
}

export default Editable
