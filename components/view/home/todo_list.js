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
    return {
        container: {
            absoluteCenter,
            color: textColorDark(),
            fontSize: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
        },
        scrollContainer: {
            position: 'relative',
        },
        list: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        footer: {},
        paginationBar: {
            position: 'relative',
            //width: '100%',
            margin: '2rem auto',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 1,
                backgroundColor: textColorDark(0.25),
            },
        },
    }
})

const TodoList = () => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const [currentPage, setCurrentPage] = useState(1)
    const todos = useTodoState()
    const pageSize = 20
    const data = useRef([])


    const prepreData = useCallback(()=> {
        return !todos.error && !todos.loading && todos.entities
        ? Object.entries(todos.entities).map(([k, v]) => {
              return v
          })
        : []
    },[todos])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize
        const lastPageIndex = firstPageIndex + pageSize
        data.current = prepreData()
        return data.current.slice(firstPageIndex, lastPageIndex)
        
    }, [currentPage, prepreData])


    return (
        <div css={styles.container}>
            <Scrollbars
                universal
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                css={styles.scrollContainer}>
                <ul css={styles.list}>
                    {currentTableData.map((item, i) => {
                        const key = `${nanoid()}_${i}`
                        return <li key={key}><div>{Object.values(item).join(', ')}</div></li>
                    })}
                </ul>
            </Scrollbars>
            <Pagination
                css={styles.paginationBar}
                currentPage={currentPage}
                totalCount={data.current.length}
                pageSize={pageSize}
                siblingCount={1}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default TodoList
