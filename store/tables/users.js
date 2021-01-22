import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    users: [],
    usersAdministrator: [],
    usersDoctors: [],
    user: null,
    loading: true,
})

export const mutations = {
    SET_USERS(state, users) {
        state.users = users
    },
    SET_USERS_ADMINISTRATORS(state, users) {
        state.usersAdministrator = users
    },
    SET_USERS_DOCTOR(state, users) {
        state.usersDoctors = users
    },
    SET_USER(state, user) {
        state.user = user
    },
    CLEAR_USER(state) {
        state.user = null
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_USERS_TABLE({ commit, state }) {
        const { data } = await this.$axios.$get('/users')
        commit('SET_LOADING', false)
        commit('SET_USERS', data)
    },
    async GET_USERS_BY_ROLE_ADMINISTRATOR({ commit, state }) {
        const { data } = await this.$axios.$get('/users', {
            params: {
                role: 'administrator',
            },
        })
        commit('SET_LOADING', false)
        commit('SET_USERS_ADMINISTRATORS', data)
    },
    async GET_USERS_BY_ROLE_DOCTOR({ commit, state }) {
        const { data } = await this.$axios.$get('/users', {
            params: {
                role: 'doctor',
            },
        })
        commit('SET_LOADING', false)
        commit('SET_USERS_DOCTOR', data)
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
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getDoctors: (state) => {
        return _.orderBy(state.usersDoctors, ['last_name'], ['asc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}