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
    async DELETE_USER_SELECTED({ commit, state }, userID) {
        return await this.$axios.$delete(`/users/${userID}`)
            // commit('SET_USER', data)
    },
}