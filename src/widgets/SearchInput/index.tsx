import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import { ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './searchInput.module.scss'

interface IProps {
  width: string
  value: string
  setValue: (e: string) => void
}

const SearchInput = ({ width, value, setValue }: IProps) => {
  const navigate = useNavigate()

  const handleSearch = () => {
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
          placeholder="Search all GIFs and Stickers"
        />
        {value.length > 2 && (
          <CancelIcon className={s.closeIcon} onClick={() => setValue('')} />
        )}
        <div className={s.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}
export default SearchInput
