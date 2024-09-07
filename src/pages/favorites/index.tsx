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
        <div className={s.wrap}>
          <div className={s.container}>
            <div className={s.text}>
              <p>
                You don&apos;t have any <span>favorites</span> yet!
              </p>
              <p>
                Add to your favs by clicking the{' '}
                <FavoriteIcon className={s.icon} /> around GIPHY.
              </p>
            </div>
          </div>
          <div className={s.area}>
            <ul className={s.square}>
              {[...new Array(10)].map((_, i) => (
                <li key={i}></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default Favorites
