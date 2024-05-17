import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { fetchGifsBySearchValue } from '../../../store/gifsBySearchValueSlice'
import { resetGifs, setValue } from '../../../store/gifsBySearchValueSlice'
import { resetTrendingGifs } from '../../../store/gifsSlice'
import s from './searchContainer.module.scss'

interface IProps {
  width: string
}

const SearchContainer = ({ width }: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { value, gifsBySearchValue } = useAppSelector(
    (state) => state.gifsBySearchValue,
  )

  const handleSearch = () => {
    if (!gifsBySearchValue.length) {
      dispatch(resetTrendingGifs())
      navigate(`/${value}`)
      return null
    }
    if (value) {
      dispatch(resetGifs())
      dispatch(fetchGifsBySearchValue({ offset: 0, searchValue: value }))
      const url = value.replace(/ /g, '-')
      navigate(`/${url}`)
    }
  }

  return (
    <div className={s.searchBarWrapper}>
      <div className={`${s.searchContainer} ${s[width]}`}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setValue(e.target.value))
          }
          value={value}
          type="text"
          placeholder="search"
        />
        <div className={s.searchIcon} onClick={() => handleSearch()}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}
export default SearchContainer
