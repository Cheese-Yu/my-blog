<template lang="html">
  <div id="app" v-cloak>
      <transition>
          <greet @close="comeIn" v-if="greet"></greet>
      </transition>
      <router-view v-if="blog"></router-view>
</div>
</template>


<script type="text/babel">
    import NProgress from 'nprogress'//页面顶部进度条
    import 'nprogress/nprogress.css'
    import './assets/css/atom-one-dark.css'
    NProgress.configure({showSpinner: false});
    import {mapState} from 'vuex'
    import Greet from './components/fronted/Greet.vue'

    export default {
        data(){
            return {
                greet: false,
                blog: true,
            }
        },
        components: {
            'greet': Greet
        },
        methods: {
            comeIn() {
                this.greet = false;
                this.blog = true;
            }
        },
        computed: mapState(['progress']),
        watch: {
            progress(val){
                if (val == 0) {
                    // NProgress.set(0)
                    NProgress.start();
                } else if (val == 100) {
                    NProgress.done();
                } else {
                    NProgress.set(val / 100)
                    NProgress.start();
                }
            }
        },
        mounted(){
            let userAgent = navigator.userAgent;
            if (userAgent.indexOf("Chrome") > -1) {
              if (document.location.pathname == '/') {
                this.greet = true;
                this.blog = false;
              }
            }
          // NProgress.start();
        }
    }
</script>

<style lang="css">

  #app{
    height: 100%;
  }
  *, html, body {
      margin: 0;
      padding: 0;
      border: 0;
      font-family: -apple-system, BlinkMacSystemFont, "opensans", "Optima", "Microsoft Yahei", sans-serif;
  }
  a, ul, li {
      text-decoration: none;
  }
</style>
