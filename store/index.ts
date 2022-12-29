import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { AnyAction, CombinedState, combineReducers, Store } from 'redux';

// Next.js는 기본적으로 SSR, 즉, SSR, CSR 스토어가 각각 생성됨
// 이를 합쳐주기 위해 rootReducer에서 HYDRATE라는 case로 따로 처리한다.

const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
  switch (action.type) {
    // HYDRATE는 서버사이드에서 렌더링 된 정적 페이지와 번들링된 JS 파일을 클라이언트에게 보낸 뒤
    // 클라이언트 단에서 HTML과 JS코드를 서로 매칭시키는 과정을 의미함
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({});
      return combinedReducer(state, action);
    }
  }
};

export const store = configureStore({
  reducer: rootReducer, // 위에서 만든 persistReducer를 대입
  devTools: process.env.NODE_ENV !== 'production', // redux devTool을 보일건지 말건지에 대한 유무
});

// 스토어를 생성하는 함수를 만든다.
const makeStore: MakeStore<EnhancedStore> = () => store;

// 스토어가 SSR, CSR을 모두 제공하기 위한 wrapper를 만든다.
export const wrapper = createWrapper<Store>(makeStore, { debug: process.env.NODE_ENV !== 'production' });

// RootState도 정의해서 export
export type RootState = ReturnType<typeof rootReducer>;
