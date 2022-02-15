import { useMemo } from 'react'

const splitSymbol = '...'

const range = (start, end) => {
    let length = end - start + 1
    return Array.from({ length }, (_, i) => i + start)
}

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize)

        const totalPageNumbers = siblingCount + 5

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        )

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1, leftItemCount)

            return [...leftRange, splitSymbol, totalPageCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            )
            return [firstPageIndex, splitSymbol, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [
                firstPageIndex,
                splitSymbol,
                ...middleRange,
                splitSymbol,
                lastPageIndex,
            ]
        }
    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange
}

export default usePagination
export { splitSymbol as paginationSplitSymbol }
