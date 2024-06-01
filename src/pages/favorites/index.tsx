import FavoriteIcon from '@mui/icons-material/Favorite'

import GifsContainer from '../../components/gifsContainer'
import { useAppSelector } from '../../hooks/useAppSelector'
import s from './favorites.module.scss'

const Favorites = () => {
  const { favorites } = useAppSelector((state) => state.favorites)

  return (
    <>
      {favorites.length ? (
        <GifsContainer
          fetchData={() => null}
          gifsArray={favorites}
          error={true}
          directory={'../gifs'}
          opacity={false}
        />
      ) : (
        <div className={s.title}>
          <p>
            You don&apos;t have any <span>favorites</span> yet!
          </p>
          <p>
            Add to your favs by clicking the{' '}
            <FavoriteIcon style={{ margin: '0 2px' }} /> around GIPHY.
          </p>
        </div>
      )}
    </>
  )
}

export default Favorites
