import { InitialState } from '@features/favorites-gifs/store/models/initial-state.model'

export const initialState: InitialState = {
  favorites: JSON.parse(localStorage.getItem('favoritesGifs') || '[]') || [],
}
