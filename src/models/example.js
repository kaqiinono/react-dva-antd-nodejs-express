import {login} from '../services/example';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'menuoff',
  state:
  {
    menu:false
  },
  subscriptions: {
    setup ({ dispatch }) {
    },
  },
  effects: {
      *menu ({payload}, { put,select }) {
        const menu = yield select(state => state.menuoff.menu);
        if(!menu){
          yield put({ type: 'showUserMenu' })
        }else{
          yield put({type:'hideUserMenu'})
        }  
    }},
  reducers: {
    showUserMenu (state,action) {
      return {
        ...state,menu:true
      }
    },
    hideUserMenu(state,action){
      return{
        ...state,menu:false
      }
    }
  }
}
