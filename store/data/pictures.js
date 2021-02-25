import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    pictures: [],
    picturesSelected: [],
    loading: false,
})

export const mutations = {
    SET_PICTURES(state, payload) {
        state.pictures = payload
    },
    SET_PICTURES_BY_SELECTED(state, payload) {
        state.picturesSelected = payload
    },
    SET_LOADING(state, payload) {
        state.loading = payload
    },
}

export const actions = {
    async GET_PICTURES({ commit, state }, options) {
        const { data } = await this.$axios.$get('/pictures', { params: options })
        commit('SET_LOADING', false)
        commit('SET_PICTURES', data)
    },
    async GET_PICTURES_BY_PATIENT({ commit, state }, options) {
        const { data } = await this.$axios.$get(`/pictures`, { params: options })
        commit('SET_LOADING', false)
        commit('SET_PICTURES_BY_SELECTED', data)
            // return data
    },
    async CHANGE_LOADING({ commit, state }, loading) {
        commit('SET_LOADING', loading)
    },
}

export const getters = {
    getPictures: (state) => {
        return _.orderBy(state.pictures, ['id'], ['asc'])
    },

    picturesSelected: (state) => {
        return _.orderBy(state.picturesSelected, ['id'], ['desc'])
    },
    getLoading: (state) => {
        return state.loading
    },
}