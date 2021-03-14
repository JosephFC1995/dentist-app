export default async({ $axios, redirect, store }) => {
    await store.dispatch('data/company/GET_DATA_COMPANY')
}