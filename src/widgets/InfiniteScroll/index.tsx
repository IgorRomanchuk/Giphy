import { ReactNode, useEffect, useRef, useState } from 'react'

interface InfiniteScrollProps<T> {
  data: T[]
  next: () => Promise<void>
  hasMore: boolean
  loading?: ReactNode
  endMessage?: ReactNode
  error?: ReactNode
  children: ReactNode
  className?: string
  threshold?: number
}

export function InfiniteScroll<T>({
  data,
  next,
  hasMore,
  loading = <div>Loading...</div>,
  endMessage = <div>No more items</div>,
  error = null,
  children,
  className = '',
  threshold = 200,
}: InfiniteScrollProps<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const [internalError, setInternalError] = useState<Error | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = async () => {
    if (!containerRef.current || isLoading || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    if (scrollHeight - (scrollTop + clientHeight) < threshold) {
      setIsLoading(true)
      setInternalError(null)

      try {
        await next()
      } catch (err) {
        setInternalError(
          err instanceof Error ? err : new Error('Unknown error'),
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [data, hasMore, isLoading])

  // Первоначальная загрузка
  useEffect(() => {
    if (data.length === 0 && hasMore) {
      next().catch((err) => setInternalError(err))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`infinite-scroll-container ${className}`}
      style={{ overflowY: 'auto', height: '100%' }}
    >
      {children}

      {isLoading && loading}
      {!hasMore && data.length > 0 && endMessage}
      {(error || internalError) && (
        <div className="error-message">{error || internalError?.message}</div>
      )}
    </div>
  )
}
