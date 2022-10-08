import { Translator } from "../../core"
import en from '../../assets/i18n/en.json'
import vn from '../../assets/i18n/vn.json'

export const i18n = Translator.setup({
  resources: {
    en: {
      translation: en
    },
    vn: {
      translation: vn
    }
  },
  compatibilityJSON: 'v3', // fix issue i18next::pluralResolver: fallback to the compatibilityJSON v3 format handling. 
  lng: 'vn',
  fallbackLng: 'vn',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  nsSeparator: false,
  keySeparator: false,
})
