import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchGifsBySearchValue } from '../../../store/gifsBySearchValueSlice'
import { resetGifs, setValue } from '../../../store/gifsBySearchValueSlice'
import s from './searchContainer.module.scss'

interface IProps {
  width: string
}

const SearchContainer = ({ width }: IProps) => {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  const value = useSelector((state: any) => state.gifsBySearchValue.value)
  const gifsBySearchValue = useSelector(
    (state: any) => state.gifsBySearchValue.gifsBySearchValue,
  )

  const handleSearch = () => {
    if (!gifsBySearchValue.length) {
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
          onChange={(e: any) => dispatch(setValue(e.target.value))}
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
