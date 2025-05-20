import EmptyState from '@features/favorites-images/components/EmptyState'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import ImageContainer from 'shared/ui/ImageContainer'

const FavoritesImages = () => {
  const { favorites } = useAppSelector((state) => state.favorites)

  return (
    <>
      {favorites.length ? (
        <ImageContainer
          fetchData={() => null}
          imagesArray={favorites}
          error={false}
          loading={false}
        />
      ) : (
        <EmptyState />
      )}
    </>
  )
}

export default FavoritesImages
