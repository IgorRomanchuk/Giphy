import { categories } from '@shared/ui/Header/constants/categories'
import { useNavigate } from 'react-router-dom'

import s from './menuCategories.module.scss'

const MenuCategories = () => {
  const navigate = useNavigate()

  return (
    <ul className={s.menu}>
      {categories.map((category: string) => (
        <li key={category}>
          <button
            className={`${s.button} ${s[category.toLowerCase()]}`}
            onClick={() => navigate(`/search/${category.toLowerCase()}`)}
          >
            <h2>{category}</h2>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MenuCategories
