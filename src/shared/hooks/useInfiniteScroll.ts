import { useEffect, useRef } from 'react'

interface IParams {
  /** Whether there are more pages to load. */
  hasMore: boolean
  /** Called when the sentinel becomes visible. */
  loadMore: () => void
  /** Current item count — re-checks visibility whenever new data arrives. */
  dataLength: number
  /** Distance from the viewport edge to prefetch ahead. */
  rootMargin?: string
}

/**
 * Infinite scroll via IntersectionObserver.
 *
 * Attach the returned ref to an empty sentinel element placed after the list.
 * When the sentinel enters the viewport (plus `rootMargin`) the next page is
 * requested. Because the observer is re-created whenever `dataLength` changes,
 * it keeps loading until the sentinel is pushed out of view — this naturally
 * fills a viewport that the first page was too short to fill, with no manual
 * height measuring.
 */
const useInfiniteScroll = ({
  hasMore,
  loadMore,
  dataLength,
  rootMargin = '300px',
}: IParams) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Always call the latest loadMore without re-subscribing the observer.
  const loadMoreRef = useRef(loadMore)
  loadMoreRef.current = loadMore

  // Guards against firing again while a request for the same page is in flight.
  const isLockedRef = useRef(false)

  useEffect(() => {
    // A new effect run means deps changed (new data or hasMore flipped),
    // so the previous request has resolved — release the lock.
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
