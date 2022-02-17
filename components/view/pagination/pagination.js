import { useTheme } from '@emotion/react'
import { usePagination, paginationSplitSymbol } from '@Hooks'
import { memoStylesFactory } from '@Styles'
import { cssToArray } from '@Utils'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const splitSymbol = paginationSplitSymbol

const stylesFactory = memoStylesFactory((theme) => {
    const { textColorDark, bp, fontMainSize } = theme
    const height = fontMainSize * 0.5
    const hover = (backgroundColor, pointer = 'pointer') => {
        return {
            '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                    backgroundColor: backgroundColor,
                    cursor: pointer,
                },
            },
        }
    }
    return {
        paginationContainer: {
            display: 'flex',
            listStyleType: 'none',
        },
        paginationItem: {
            display: 'flex',
            height: `${height}rem`,
            minWidth: `${height}rem`,
            padding: `0 ${height / 8}rem`,
            color: textColorDark(),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: `${height / 2}rem`,
            fontSize: `${height / 1.5}rem`,
            get [bp.median]() {
                const height = fontMainSize * 2
                return {
                    height: `${height}rem`,
                    minWidth: `${height}rem`,
                    padding: `0 ${height / 8}rem`,
                    borderRadius: `${height / 2}rem`,
                    fontSize: `${height / 1.5}rem`,
                }
            },
            ...hover(textColorDark(0.05)),
        },
        spliеter: {
            ...hover('transparent', 'default'),
        },
        arrow: {
            '&::before': {
                position: 'relative',
                content: '""',
                display: 'inline-block',
                width: '0.4em',
                height: '0.4em',
                borderRight: '0.12em solid rgba(0, 0, 0, 0.87)',
                borderTop: '0.12em solid rgba(0, 0, 0, 0.87)',
            },
        },
        leftArrow: {
            transform: 'rotate(-135deg) translate(-50%)',
        },

        rightArrow: {
            transform: 'rotate(45deg)',
        },
        selected: {
            backgroundColor: textColorDark(0.25),
            ...hover(textColorDark(0.25)),
        },
        disabled: {},
    }
})

const Pagination = (props) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const {
        onPageChange,
        onTotalCountChange,
        totalCount,
        siblingCount = 1,
        currentPage = 1,
        pageSize,
        className,
        css,
    } = props

    //const hasPages = !(currentPage === 0 || paginationRange.length < 2)

    const { range: paginationRange, totalPageCount } = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    const onNext = () => {
        onPageChange(Math.min(totalPageCount, currentPage + 1))
    }

    const onPrevious = () => {
        onPageChange(Math.max(1, currentPage - 1))
    }

    useEffect(() => {
        onTotalCountChange(totalCount, totalPageCount)
    }, [onTotalCountChange, totalPageCount, totalCount])

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <motion.ul
            layout
            css={[styles.paginationContainer, ...cssToArray(css)]}
            className={className}>
            <motion.li layout css={styles.paginationItem} onClick={onPrevious}>
                <div css={[styles.arrow, styles.leftArrow]} />
            </motion.li>
            {paginationRange.map((pageNumber, i) => {
                if (pageNumber === splitSymbol) {
                    return (
                        <AnimatePresence key={`${pageNumber}_${i}`}>
                            <motion.li
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                css={[styles.paginationItem, styles.spliеter]}>
                                {splitSymbol}
                            </motion.li>
                        </AnimatePresence>
                    )
                }

                return (
                    <AnimatePresence key={`${pageNumber}_${i}`}>
                        <motion.li
                            layout
                            css={[
                                styles.paginationItem,
                                pageNumber === currentPage && styles.selected,
                            ]}
                            onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </motion.li>
                    </AnimatePresence>
                )
            })}
            <motion.li
                layout
                css={[
                    styles.paginationItem,
                    currentPage === lastPage && styles.disabled,
                ]}
                onClick={onNext}>
                <div css={[styles.arrow, styles.rightArrow]} />
            </motion.li>
        </motion.ul>
    )
}

Pagination.defaultProps = {
    siblingCount: 1,
    currentPage: 1,
}

Pagination.propTypes = {
    onPageChange: PropTypes.func,
    totalCount: PropTypes.number,
    siblingCount: PropTypes.number,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
}

export default Pagination
