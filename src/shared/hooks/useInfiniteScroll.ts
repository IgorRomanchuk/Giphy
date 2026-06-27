import { useEffect, useRef } from 'react'

interface Props {
  hasMore: boolean
  loadMore: () => void
  dataLength: number
  rootMargin?: string
}

const useInfiniteScroll = ({
  hasMore,
  loadMore,
  dataLength,
  rootMargin = '300px',
}: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMoreRef = useRef(loadMore)
  loadMoreRef.current = loadMore

  const isLockedRef = useRef(false)

  useEffect(() => {
    isLockedRef.current = false

    const node = sentinelRef.current
    if (!node || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLockedRef.current) {
          isLockedRef.current = true
          loadMoreRef.current()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, dataLength, rootMargin])

  return sentinelRef
}

export default useInfiniteScroll
