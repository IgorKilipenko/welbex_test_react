import { useMemo } from 'react'

const splitSymbol = '...'

function culcPaginationRange(current, last, delta) {
    const left = current - delta
    const right = current + delta + 1
    const range = []

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
            range.push(i)
        }
    }

    return range.reduce(
        (res, itemIndex) => {
            const { dotsIndex, rangeWithDots } = res
            if (dotsIndex > 0) {
                if (itemIndex - dotsIndex === 2) {
                    rangeWithDots.push(dotsIndex + 1)
                } else if (itemIndex - dotsIndex !== 1) {
                    rangeWithDots.push(splitSymbol)
                }
            }
            rangeWithDots.push(itemIndex)
            res.dotsIndex = itemIndex
            return res
        },
        { rangeWithDots: [], dotsIndex: 0 }
    ).rangeWithDots
}

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize)
        const range = culcPaginationRange(
            currentPage,
            totalPageCount,
            siblingCount
        )
        return { range, totalPageCount }
    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange
}

export default usePagination
export { splitSymbol as paginationSplitSymbol }
