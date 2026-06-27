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

    // Don't observe when:
    // - there's nothing more to load (hasMore),
    // - a request is already in flight (isLoading) — prevents duplicate
    //   pages fired with a stale offset before the first one resolves,
    // - nothing is loaded yet (dataLength === 0) — the first page is owned
    //   by the feature itself, so the hook only fetches subsequent pages.
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
