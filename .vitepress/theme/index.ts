// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HeroImage from '../components/HeroImage.vue'
import MatchCard from '../components/MatchCard.vue'
import Gitalk from '../components/Gitalk.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
'home-hero-image': () => h(HeroImage),
'home-hero-after': () => h(MatchCard),
'doc-after': () => h(Gitalk)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
