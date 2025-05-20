import store from '@shared/store'
import { useDispatch } from 'react-redux'

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
