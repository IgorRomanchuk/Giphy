import EmptyState from '@features/favorites-gifs/EmptyState'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import GifsContainer from '@shared/ui/GifsContainer'

const FavoritesGifs = () => {
  const { favorites } = useAppSelector((state) => state.favorites)

  return (
    <>
      {favorites.length ? (
        <GifsContainer
          fetchData={() => null}
          gifsArray={favorites}
          error={true}
          directory={'../gifs'}
        />
      ) : (
        <EmptyState />
      )}
    </>
  )
}

export default FavoritesGifs
