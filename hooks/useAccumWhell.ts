import { useEffect, useState, useCallback, useRef } from 'react'
const initial = {
    current: 0,
    accum: 0,
}
const useAccumWhell = (threshold = 100 * 3) => {
    const [val, setVal] = useState(initial)
    const cleanFlag = useRef(false)
    useEffect(() => {
        const sleep = async (ms: number) => {
            const time = Date.now()
            cleanFlag.current = true
            console.log('CLEAN_START', cleanFlag.current)
            await new Promise((resolve) => setTimeout(resolve, ms))
            if (Math.abs(val.accum) < threshold) {
                setVal(initial)
                cleanFlag.current = false
                console.log(`CLEAN_END at ${Date.now() - time}ms`, cleanFlag.current)
            }
        }

        !cleanFlag.current && Math.abs(val.accum) > 0 && sleep(1000).catch(console.error)
    }, [val.accum, threshold])

    const push = useCallback(
        (deltaY: number) => {
            setVal(({ current, accum }) => {
                let summ = 0
                if (Math.abs(current) >= threshold) {
                    accum = 0
                    current = 0
                }
                if ((accum >= 0 && deltaY > 0) || (accum <= 0 && deltaY < 0)) {
                    summ = deltaY
                } else {
                    accum = 0
                    summ = 0
                }
                if (Math.abs(accum + summ) < threshold) {
                    accum += summ
                    summ = 0
                } else {
                    summ += accum
                }
                return { current: summ, accum }
            })
        },
        [threshold]
    )

    useEffect(() => {
        setVal(initial)
    }, [threshold])

    return { summ: val.current, push }
}

export default useAccumWhell
