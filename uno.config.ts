import presetAttributify from '@unocss/preset-attributify'
import presetWind3 from '@unocss/preset-wind3'
import { mergeConfigs } from 'unocss'
import config from './.nuxt/uno.config.mjs'

export default mergeConfigs([
  config,
  {
    presets: [
      presetAttributify({
        /* preset options */
      }),
      presetWind3(),
      // ...custom presets
    ],
  },
])
