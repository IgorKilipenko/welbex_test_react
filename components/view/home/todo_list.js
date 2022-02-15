import { useTheme } from '@emotion/react'
import { nanoid } from '@reduxjs/toolkit'
import { useTodoState } from '@Store'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useRef, useState, useMemo, useCallback } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Pagination from '../pagination'

const stylesFactory = memoStylesFactory((theme) => {
    const { absoluteCenter } = styleUtils
    const { textColorDark, bp } = theme
    const fontSize = 5
    const horizontalLine = {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 1,
        backgroundColor: textColorDark(0.25),
    }
    return {
        container: {
            absoluteCenter,
            color: textColorDark(),
            fontSize: `${fontSize / 2}rem`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            [bp.median]: {
                fontSize: `${fontSize}rem`,
            },
        },
        scrollContainer: {
            position: 'relative',
        },
        list: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        },
        item: {
            position: 'relative',
            margin: '0 5%',
            [bp.median]: {
                margin: '0 20%',
            },
            '&::before': {
                ...horizontalLine,
            },
            '& > div': {
                padding: '1rem',
                [bp.median]: {
                    padding: '2rem',
                },
            },
        },
        paginationBar: {
            position: 'relative',
            margin: '2rem auto',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            '&::after': {
                ...horizontalLine,
            },
        },
    }
})

const TodoList = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const [currentPage, setCurrentPage] = useState(1)
    const todos = useTodoState()
    const pageSize = 5
    const data = useRef([])
    const scrollRef = useRef(null)

    const prepreData = useCallback(() => {
        return !todos.error && !todos.loading && todos.entities
            ? Object.entries(todos.entities).map(([k, v]) => {
                  return { id: k, ...v }
              })
            : []
    }, [todos])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize
        const lastPageIndex = firstPageIndex + pageSize
        data.current = prepreData()
        return data.current.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, prepreData])

    const handlePageChange = (page) => {
        setCurrentPage(prevPage => {
            if (prevPage !== page) {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop(0)
                }
            }
            return page
        })

    }

    return (
        <div css={styles.container}>
            <Scrollbars
                ref={scrollRef}
                universal
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                css={styles.scrollContainer}>
                <ul css={styles.list}>
                    {currentTableData.map((item, i) => {
                        
                        const {id:todoId, ...values} = item
                        const key = `${todoId}`
                        return (
                            <li key={key} todo-id={todoId} css={styles.item}>
                                <div>
                                    {Object.entries(values).map(([k, v], i) => {
                                        return (<p key={i}>{`${k} : ${v}`}</p>)
                                    })}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </Scrollbars>
            <Pagination
                css={styles.paginationBar}
                currentPage={currentPage}
                totalCount={data.current.length}
                pageSize={pageSize}
                siblingCount={1}
                onPageChange={(page) => handlePageChange(page)}
            />
        </div>
    )
}

export default TodoList
