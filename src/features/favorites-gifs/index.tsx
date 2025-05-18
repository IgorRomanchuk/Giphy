import { useAppSelector } from '@shared/hooks/useAppSelector'
import EmptyState from 'features/favorites-gifs/components/EmptyState'
import ImageContainer from 'shared/ui/ImageContainer'

const FavoritesGifs = () => {
  const { favorites } = useAppSelector((state) => state.favorites)

  return (
    <>
      {favorites.length ? (
        <ImageContainer
          fetchData={() => null}
          gifsArray={favorites}
          error={false}
          directory="../gifs"
          loading={false}
        />
      ) : (
        <EmptyState />
      )}
    </>
  )
}

export default FavoritesGifs
