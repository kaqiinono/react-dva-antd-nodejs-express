// export default {
//   namespace: 'limit',
//   state:
//   {
//     menu:false
//   },
//   subscriptions: {
//     setup ({ dispatch }) {
//     },
//   },
//   effects: {
//       *menu ({payload}, { put,select }) {
//         const menu = yield select(state => state.menuoff.menu);
//         if(!menu){
//           yield put({ type: 'showUserMenu' })
//         }else{
//           yield put({type:'hideUserMenu'})
//         }  
//     }},
//   reducers: {
//     showUserMenu (state,action) {
//       return {
//         ...state,menu:true
//       }
//     },
//     hideUserMenu(state,action){
//       return{
//         ...state,menu:false
//       }
//     }
//   }
// }
