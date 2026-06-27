import { useEffect, useRef } from 'react'

interface Props {
  hasMore: boolean
  isLoading: boolean
  loadMore: () => void
  dataLength: number
  rootMargin?: string
}

const useInfiniteScroll = ({
  hasMore,
  isLoading,
  loadMore,
  dataLength,
  rootMargin = '300px',
}: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMoreRef = useRef(loadMore)
  loadMoreRef.current = loadMore

  useEffect(() => {
    const node = sentinelRef.current

    if (!node || !hasMore || isLoading || dataLength === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreRef.current()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, isLoading, dataLength, rootMargin])

  return sentinelRef
}

export default useInfiniteScroll
