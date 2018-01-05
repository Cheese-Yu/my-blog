<template lang="html">
  <article v-loading="loading2"  element-loading-text="加载中" class="article_wrap article">
    <header>
      <div class="home_title">{{oneArticle.title}}</div>
      <div>
        <p class="home_creatAt">{{oneArticle.created_at}}</p>
      </div>
    </header>
    <section v-html="oneArticle.contentToMark" class="home_main"></section>
    <div v-if="me" class="edit" @click="editArticle(oneArticle._id)">编辑</div>
  </article>
</template>

<script type="text/babel">
import api from '../../api'
export default {
  data(){
    return {
      oneArticle:{},
      loading2:true,
      me:false
    }
  },
  created(){
    // 在这里调用获取一篇文章的api
    let token = localStorage.getItem('jwt');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      // 前端判断token是否过期，如果过期了访问时候会路由到login页面
      if(payload.exp>Date.now()/1000){
        this.me = true;
      }
    }
    api.getOneArticleNoAuth({id:this.$route.params.id})
        .then(({data:{code,oneArticle}})=>{
          if(code==200){
            setTimeout(()=>{
              this.loading2 = false;
              this.oneArticle = oneArticle;
            },200)
          }

        })

  },
  methods: {
    editArticle(id){
      // 通过this.$route.params来获取数据
      this.$router.push({path:`/admin/articleEdit/${id}`});
    }
  }
}
</script>

<style lang="css" scoped>
article{
  margin:auto;
  /*margin-bottom:1rem;*/
}

.home_title{
  font-size: 3rem;
  font-weight: 400;
  color:#404040;
  padding:1rem 0;

}
.home_creatAt{
  font-family: "Comic Sans MS", curslve, sans-serif;
  padding:0.6rem 0;
  font-size: 1.8rem;
  color:#7f8c8d;
}
.home_main{
  font-size: 1.8rem;
  /*color:#34495e;*/
  line-height: 1.725;
  padding:1rem 0;
}
.edit {
  cursor: pointer;
  color: #336699;
  margin-top: 1rem;
  text-align: right;
}
@media screen and (max-width:786px){
  .home_title{
    font-size: 2.2rem;
  }
  .home_creatAt{
    font-size: 1.6rem;
  }
}
@media screen and (max-width:480px){
  .home_main{
    font-size:1.4rem;
    line-height: 1.6em;
  }
}
</style>
