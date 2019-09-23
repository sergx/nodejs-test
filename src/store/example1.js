export default {
  state:{
    message: "hello big W!"
  },
  mutations:{ // Только изменяют state

  },
  actions:{ // Можем что-то делать

  },
  getters:{
    getMessage(state){
      return state.message;
    }
  }
}
