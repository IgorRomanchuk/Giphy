import { InitialState } from '@features/favorites-images/store/models/initial-state.model'

export const initialState: InitialState = {
  favorites: JSON.parse(localStorage.getItem('favoritesImages') || '[]') || [],
}
