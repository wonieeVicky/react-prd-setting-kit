import { configureStore, EnhancedStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { Store } from 'redux';
import counterReducer from 'features/counter/counterSlice';
import { useDispatch } from 'react-redux';

const isDev = process.env.NODE_ENV !== 'production';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: isDev,
});

// 스토어를 생성하는 함수를 만든다.
const makeStore: MakeStore<EnhancedStore> = () => {
  return store;
};

// 스토어가 SSR, CSR을 모두 제공하기 위한 wrapper를 만든다.
export const wrapper = createWrapper<Store>(makeStore, { debug: isDev });

/*
  wrapper로 스토어 생성하고, 클라이언트에서 사용할 typescript용 dispatch와
  state, asynchronous dispatch의 타압 export
*/

type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
