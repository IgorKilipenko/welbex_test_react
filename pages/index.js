import { useTheme } from '@emotion/react'
import { memoStylesFactory, styleUtils } from '@Styles'
import Head from 'next/head'
import HomeComponent from '@Components/view/home'
import { updateTodoList } from '@Store/'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const stylesFactory = memoStylesFactory((theme) => {
    const { bp } = theme
    return {
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            ...styleUtils.fullSize,
        },
    }
})

const HomePage = (/*props*/) => {
    const theme = useTheme()
    const styles = stylesFactory(theme)
    const dispatch = useDispatch()

    const update = useCallback(async () => {
        const resultAction = await dispatch(updateTodoList({}))
        if (updateTodoList.fulfilled.match(resultAction)) {
            return true
        } else {
            if (resultAction.payload) {
                console.error(resultAction.payload.field_errors)
            } else {
                console.error('error', `Update failed: ${resultAction.error}`)
            }
        }
    },[dispatch])

    useEffect(() => {
        update().catch(console.error)
    },[update])
    return (
        <>
            <Head>
                <title>HOME | To Do</title>
            </Head>

            <div css={styles.container}>
                <HomeComponent />
                <div></div>
            </div>
        </>
    )
}

export { HomePage as default }
