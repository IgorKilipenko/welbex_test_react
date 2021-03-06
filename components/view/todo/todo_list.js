import { useTheme } from '@emotion/react'
import { useTodoState } from '@Store'
import { memoStylesFactory, styleUtils } from '@Styles'
import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Pagination from '../pagination'
import { AddButton } from '../buttons'
import TodoItem from './todo_item'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { actions } from '@Store'

const {
    todos: { todoAddOne },
} = actions

const stylesFactory = memoStylesFactory((theme) => {
    const { absoluteCenter } = styleUtils
    const {
        textColorDark,
        fontMainSize,
        bgColorLight,
        bp,
        bgColor,
        boxShadow,
    } = theme
    const fontSize = fontMainSize * 0.8
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
            fontSize: `${fontSize / 2.5}rem`,
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
            marginTop: '1rem',
            [bp.median]: {
                marginTop: '3rem',
            },
        },
        list: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        },
        item: {
            position: 'relative',
            padding: '0 5%',
            [bp.large]: {
                margin: '0 20%',
            },
            '&::before': {
                ...horizontalLine,
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
        odd: {
            backgroundColor: bgColor(0.05),
        },
        get addTodo() {
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
                boxShadow: boxShadow(false),
                transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25,1)',
                [bp.median]: {
                    ...box(fontSize * 4),
                },
                '&:hover': {
                    boxShadow: boxShadow(true),
                },
            }
        },

        header: {
            position: 'relative',
            textDecoration: 'uppercase',
            margin: '0.5rem auto 0 5%',
            fontSize: '3rem',
            [bp.median]: {
                margin: '1rem auto 0 20%',
                fontSize: '7rem',
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
    const pageCount = useRef(0)
    const dispatch = useDispatch()
    const [hasNewTodo, setHasNewTodo] = useState(false)

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
        console.log({ page })
        setCurrentPage((prevPage) => {
            if (prevPage !== page) {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop(0)
                }
            }
            return page
        })
    }

    const handleAddTodo = () => {
        dispatch(
            todoAddOne({
                id: nanoid(),
                userId: 'new userId',
                title: 'new title',
                completed: 'new completed state',
            })
        )
        setHasNewTodo(true)
    }

    useEffect(() => {
        if (hasNewTodo) {
            setCurrentPage((prevPage) => {
                if (prevPage !== pageCount.current) {
                    if (scrollRef.current) {
                        scrollRef.current.scrollToBottom()
                    }
                }
                return pageCount.current || prevPage
            })
            setHasNewTodo(false)
        }
    }, [hasNewTodo])

    const handleTotalCountChange = (count, totalPageCount) => {
        pageCount.current = totalPageCount
    }

    return (
        <div data-testid="todo-list-element" css={styles.container}>
            <div css={styles.header}>TODOS:</div>
            <Scrollbars
                ref={scrollRef}
                universal
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                css={styles.scrollContainer}>
                <ul css={styles.list}>
                    {currentTableData.map((item, i) => {
                        const { id: todoId, ...values } = item
                        const key = `${todoId}`
                        return (
                            <li
                                key={key}
                                todo-id={todoId}
                                css={[styles.item, i % 2 !== 0 && styles.odd]}>
                                <TodoItem
                                    todoId={todoId}
                                    entries={Object.entries(values)}
                                />
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
                siblingCount={2}
                onPageChange={(page) => handlePageChange(page)}
                onTotalCountChange={(totalCount, pageCount) =>
                    handleTotalCountChange(totalCount, pageCount)
                }
            />
            <AddButton onClick={() => handleAddTodo()} />
        </div>
    )
}

export default TodoList
