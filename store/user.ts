import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// user 스토어 타입 정의
interface UserTypes {
  userID: string;
  userName: string;
}

// user스토어의 초기값을 설정
const initialState: UserTypes = {
  userID: '',
  userName: '',
};

// ducks 패턴 구현ㅇ르 createSlice라고 한다.
const userSlice = createSlice({
  name: 'user', // store.user로 접근
  initialState,
  reducers: {
    saveUserAction: (state: UserTypes, action: PayloadAction<{ userID: string; userName: string }>) => {
      const { userID, userName } = action.payload;
      state.userID = userID;
      state.userName = userName;
    },
  },
});

export const { saveUserAction } = userSlice.actions;
export default userSlice.reducer;
