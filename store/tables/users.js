import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    users: [],
    user: null,
})

export const mutations = {
    SET_USERS(state, users) {
        state.users = users
    },
    SET_USER(state, user) {
        state.user = user
    },
    CLEAR_USER(state) {
        state.user = null
    },
    SET_NEW_AVATAR_USER(state, file) {
        state.user.avatar = file
        state.user.id_avatar_file = file.id
    },
}

export const actions = {
    async GET_USERS_TABLE({ commit, state }) {
        const { data } = await this.$axios.$get('/users')
        commit('SET_USERS', data)
    },
    async GET_USER_SELECTED({ commit, state }, userID) {
        const { data } = await this.$axios.$get(`/users/${userID}`)
            // commit('SET_USER', data)
        return data
    },
}