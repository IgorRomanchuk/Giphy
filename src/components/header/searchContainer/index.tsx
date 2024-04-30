import SearchIcon from '@mui/icons-material/Search'

import s from './searchContainer.module.scss'

interface IProps {
  width: string
}

const SearchContainer = ({ width }: IProps) => {
  return (
    <div className={s.searchBarWrapper}>
      <div className={`${s.searchContainer} ${s[width]}`}>
        <input type="text" placeholder="search" />
        <div className={s.searchIcon}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}
export default SearchContainer
