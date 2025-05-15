import { resetSearchGifs } from '@features/gifs-search/store/slice'
import { fetchGifsBySearchValue } from '@features/gifs-search/store/thunk'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './searchInput.module.scss'

interface IProps {
  width: string
}

const SearchInput = ({ width }: IProps) => {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { gifsBySearchValue } = useAppSelector(
    (state) => state.gifsBySearchValue,
  )

  const handleSearch = () => {
    // dispatch(fetchGifsBySearchValue({ offset: 0, searchValue: value }))
    dispatch(resetSearchGifs())

    const url = value.replace(/ /g, '-')
    navigate(`/search/${url}`)
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
            setValue(e.target.value)
          }
          value={value}
          type="text"
          placeholder="search"
        />
        <div className={s.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}
export default SearchInput
