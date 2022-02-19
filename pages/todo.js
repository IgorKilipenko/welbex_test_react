import { useTheme } from '@chakra-ui/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import Head from 'next/head'
import TodoComponent from '@Components/view/todo'
import { updateTodoList } from '@Store/'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp, appBarHeight } = theme
    return {
        container: {
            paddingTop: `${appBarHeight / 2 + 1}rem`,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            ...styleUtils.fullSize,
            /**[bp.median]: {
                paddingTop: `${appBarHeight + 3}rem`,
            },*/
        },
    }
})

const TodoPage = (/*props*/) => {
    const theme = useTheme()
    const styles = stylesFactory(theme.oldTheme)
    const dispatch = useDispatch()

    const update = useCallback(async () => {
        const resultAction = await dispatch(updateTodoList({}))
        if (updateTodoList.fulfilled.match(resultAction)) {
            console.debug('success loaded todos')
        } else {
            if (resultAction.payload) {
                console.error(resultAction.payload.field_errors)
            } else {
                console.error('error', `Update failed: ${resultAction.error}`)
            }
        }
    }, [dispatch])

    useEffect(() => {
        update().catch(console.error)
    }, [update])

    return (
        <>
            <Head>
                <title>TODOs</title>
            </Head>

            <div css={styles.container}>
                <TodoComponent />
                <div></div>
            </div>
        </>
    )
}

export { TodoPage as default }
