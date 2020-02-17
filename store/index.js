import UIDGenerator from 'uid-generator'
const uidgen = new UIDGenerator()

export const state = () => ({
  items: []
})

export const mutations = {
  setList(state, list) {
    state.items = list
  },
  setItem(state, item) {
    state.items.push(item)
  },
  updateItem(state, { index, value }) {
    state.items[index].value = value
  },
  removeItem(state, index) {
    state.items.splice(index, 1)
  },
  setChild(state, { index, child }) {
    state.items[index].children.push(child)
  },
  deleteChild(state, { itemIndex, childIndex }) {
    state.items[itemIndex].children.splice(childIndex, 1)
  }
}

export const actions = {
  updateLocalStorage({ state }) {
    localStorage.setItem('todolist', JSON.stringify(state.items))
  },
  fetchList({ commit }) {
    const list = JSON.parse(localStorage.getItem('todolist'))
    if (list) {
      commit('setList', list)
    }
  },
  addItem({ dispatch, commit }, item) {
    const itemObj = {
      id: uidgen.generateSync(),
      value: item,
      children: []
    }
    commit('setItem', itemObj)
    dispatch('updateLocalStorage')
  },
  updateItem({ state, commit, dispatch }, { id, value }) {
    const index = state.items.findIndex((item) => item.id === id)
    commit('updateItem', { index, value })
    dispatch('updateLocalStorage')
  },
  deleteItem({ commit, state, dispatch }, id) {
    const index = state.items.findIndex((item) => item.id === id)
    commit('removeItem', index)
    dispatch('updateLocalStorage')
  },
  addChild({ commit, state, dispatch }, { id, value }) {
    const index = state.items.findIndex((item) => item.id === id)
    const childObj = {
      id: uidgen.generateSync(),
      value
    }
    commit('setChild', { index, child: childObj })
    dispatch('updateLocalStorage')
  },
  deleteChild({ commit, dispatch, state }, { itemId, childId }) {
    const itemIndex = state.items.findIndex((item) => item.id === itemId)
    const childIndex = state.items[itemIndex].children.findIndex(
      (item) => item.id === childId
    )
    commit('deleteChild', { itemIndex, childIndex })
    dispatch('updateLocalStorage')
  }
}
