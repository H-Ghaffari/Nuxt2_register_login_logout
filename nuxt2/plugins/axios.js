export default function ({ $axios, store, ...context } , inject) {

    const api = $axios.create({
        headers: {
          common: {
            Accept: 'application/json',
          },
        }
    })

    api.setBaseURL('http://localhost:8000/api')

    api.onRequest((config) => {
        config.headers.Authorization = 'Bearer ' + store.getters['auth/getToken']
      })

    inject('api', api)
}