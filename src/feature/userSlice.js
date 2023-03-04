import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {PUBLIC_API_URL} from '../config/index';


const getUser = createAsyncThunk('account/user', async (obj, thunkAPI) => {
  return obj
 // try {
   // const access = localStorage.getItem('access')
    /*const res = await fetch(`${PUBLIC_API_URL}/path/tech/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'*/ //,
        //Authorization: `Bearer ${access}`,
     /* },
    })
    const data = await res.json()

    if (res.status === 200) {
      var obj = data.filter(o => o.email === login_id && o.password === password) ;
        if(obj.length < 1){
         return thunkAPI.rejectWithValue(obj)
        }
       else{
         const { dispatch } = thunkAPI

        dispatch(getUser())

        return obj[0]
       }
      } else {*/
        //return thunkAPI.rejectWithValue(data)
     /* }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data)
  }*/
})

export const login = createAsyncThunk(
  'account/login',
  async ({ username, password }, thunkAPI) => {
    var login_id = username;
        const body = JSON.stringify({
            login_id,
            password
        });
    try {
      const res = await fetch(`${PUBLIC_API_URL}/path/tech/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
          //'Content-Type': 'application/json',
          
        }//,
        //body,
      })
      

      const data = await res.json()
     // localStorage.setItem('access',data.access)
    //  localStorage.setItem('refresh',data.refresh)

      if (res.status === 200) {
         var obj = data.filter(o => o.email === login_id && o.password === password) ;
        if(obj.length < 1){
         return thunkAPI.rejectWithValue(obj)
        }
       else{
         const { dispatch } = thunkAPI

        dispatch(getUser(obj[0]))

        return obj[0]
       }
      } else {
        //return thunkAPI.rejectWithValue(data)
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)


const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  registered: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // login: (state) => {
    //   state.isLoggedIn = true
    // },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false
        state.isLoggedIn = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false
      })
  },
})
export const { logout } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer;
