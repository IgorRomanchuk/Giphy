import { categories } from '@shared/ui/Header/constants/categories'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import s from './menuCategories.module.scss'

interface Props {
  setValue: (e: string) => void
}

const MenuCategories: FC<Props> = ({ setValue }) => {
  const navigate = useNavigate()

  const navigateToCategory = (category: string) => {
    setValue(category.toLowerCase())
    navigate(`/search/${category.toLowerCase()}`)
  }

  return (
    <ul className={s.menu}>
      {categories.map((category: string) => (
        <li key={category}>
          <button
            className={`${s.button} ${s[category.toLowerCase()]}`}
            onClick={() => navigateToCategory(category)}
          >
            <h2>{category}</h2>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MenuCategories
