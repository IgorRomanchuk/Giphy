import { useAppSelector } from '@shared/hooks/useAppSelector'
import GifsContainer from '@shared/ui/GifsContainer'
import EmptyState from 'features/favorites-gifs/components/EmptyState'

const FavoritesGifs = () => {
  const { favorites } = useAppSelector((state) => state.favorites)

  return (
    <>
      {favorites.length ? (
        <GifsContainer
          fetchData={() => null}
          gifsArray={favorites}
          error={false}
          directory={'../gifs'}
          loading={false}
        />
      ) : (
        <EmptyState />
      )}
    </>
  )
}

export default FavoritesGifs
