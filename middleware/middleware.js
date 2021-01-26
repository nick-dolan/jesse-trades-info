const { has } = require('lodash')

export default (context) => {
  const jtiCookies = context.app.$cookies.get('jti')

  if (has(jtiCookies, 'settings.theme')) {
    context.app.head.htmlAttrs['data-theme'] = jtiCookies.settings.theme
  }
}


