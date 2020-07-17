// https://axios.nuxtjs.org/extend
export default function ({ $axios }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    console.log(error)
  })
}
