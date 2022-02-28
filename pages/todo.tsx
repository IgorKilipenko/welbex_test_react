import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import TodoComponent from '@Components/view/todo'
import { updateTodoList, useAppDispatch } from '@Store'
import { useCallback, useEffect } from 'react'
//import { useDispatch } from 'react-redux'

const TodoPage = (/*props*/) => {
    const dispatch = useAppDispatch()
    
    const update = useCallback(async () => {
        const resultAction = await dispatch(updateTodoList({}))
        if (updateTodoList.fulfilled.match(resultAction)) {
            console.debug('success loaded todos')
        } else {
            if (resultAction.payload) {
                console.error(resultAction.payload)
            } else {
                console.error('error', `Update failed`, resultAction.error)
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

            <Flex
                position="relative"
                direction="row"
                justify="center"
                w="100%"
                h="100%"
                pt={20}>
                <TodoComponent />
            </Flex>
        </>
    )
}

export { TodoPage as default }
