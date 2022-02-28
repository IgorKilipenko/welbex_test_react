import { useEffect, useState, useCallback, useMemo } from 'react'

const testRoutes: Array<string> = [
    '/',
    //...Array.from({ length: 100 }, (_:unknown, i:number) => i.toString()),
]

const useScrollRouter = (
    currentPath = '/',
    routes: Array<string> = testRoutes
) => {   
    const index = useMemo(() => {
        return Math.max(
            routes.findIndex((v) => currentPath === v),
            0
        )
    }, [routes, currentPath])
    const [current, setCurrent] = useState({ roure: routes[index], index })
    const next = useCallback(() => {
        setCurrent((prevState) => {
            const index = Math.min(prevState.index + 1, routes.length - 1)
            return { ...prevState, index, roure: routes[index] }
        })
    }, [routes])

    const back = useCallback(() => {
        setCurrent((prevState) => {
            const index = Math.max(prevState.index - 1, 0)
            return { ...prevState, index, roure: routes[index] }
        })
    }, [routes])

    useEffect(() => {
        setCurrent({ roure: routes[index], index })
    }, [routes, index])
    return { current: current.roure, next, back, index: current.index }
}

export default useScrollRouter
