import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: true,
    themes: {
      light: {
        
      },
      dark: {
        
      },
    },
  },
}
export default new Vuetify(opts, {
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  }
})
