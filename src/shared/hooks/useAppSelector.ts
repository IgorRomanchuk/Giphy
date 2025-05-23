import store from '@shared/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
