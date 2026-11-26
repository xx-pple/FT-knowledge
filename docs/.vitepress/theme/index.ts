import DefaultTheme from 'vitepress/theme'
import HomeLinks from './components/HomeLinks.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLinks', HomeLinks)
  },
}
