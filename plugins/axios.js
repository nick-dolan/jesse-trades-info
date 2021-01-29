import { has } from 'lodash'

// https://axios.nuxtjs.org/extend
export default function ({ $axios }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    if (has(error, 'response.data.message')) {
      console.log(error.response.data.message)
    }
  })
}
