import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { fetchGifsBySearchValue } from '@shared/store/gifsBySearchValueSlice'
import { resetGifs, setValue } from '@shared/store/gifsBySearchValueSlice'
import { ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './SearchInput.module.scss'

interface IProps {
  width: string
}

const SearchInput = ({ width }: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { value, gifsBySearchValue } = useAppSelector(
    (state) => state.gifsBySearchValue,
  )

  const handleSearch = () => {
    if (!gifsBySearchValue.length) {
      // dispatch(resetTrendingGifs())
      navigate(`/search/${value}`)
    }
    if (value) {
      dispatch(resetGifs())
      dispatch(fetchGifsBySearchValue({ offset: 0, searchValue: value }))
      const url = value.replace(/ /g, '-')
      navigate(`/search/${url}`)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={s.searchBarWrapper}>
      <div className={`${s.searchContainer} ${s[width]}`}>
        <input
          onKeyDown={handleKeyDown}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
export default SearchInput
