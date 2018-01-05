<template lang="html">
  <div class="tags_wrap"  v-loading="loading2"  element-loading-text="加载中">
    <ul class="tags_list">
      <li v-for='(item,index) in items'>
        <a class="tag_btn" :to="`/tags/${item._id}`" @click.prevent="gets(index,item.classify)" :class="{'active':index==selected}">{{item.classify}}</a>
      </li>
    </ul>
    <transition-group name="list" tag="div" >
      <article v-for='item in articleLists' v-if='show' :key="item._id" >
        <router-link :to="{path:`/tags/article/${item._id}`}">
        <div class="text_out" :id="item.article_id"  :style="{width: item.status==0 ?'100%':'65%'}">
          <header>
            <div>
              <router-link :to="{path:`/tags/article/${item._id}`}" class="tags_title" >
                {{item.title}}
              </router-link>
            </div>
            <div>
              <p class="tags_creatAt">{{item.created_at}}</p>
            </div>
          </header>
          <section v-html="item.contentToMark" class="tags_main" ></section>
          <footer>
              <router-link class="tags_readMore" :to="{path:`/tags/article/${item._id}`}">阅读全文>></router-link>
          </footer>
        </div>
        </router-link>
        <div class="img_out" :id="item.img_id" v-if="(item.status!==0)" :style="{backgroundImage:'url('+item.src+')'}"></div>
      </article>
    </transition-group>
  </div>
</template>

<script type="text/babel">
import api from '../../api'
import vfoot from './vfooter'
export default {
  data(){
    return {
      items:[],
      articleLists:[],
      selected:0,
      show:true,
      loading2:true,
      list_show:true
    }
  },
  components:{
    vfoot
  },
  methods:{
    gets(index,classify){
      this.$store.dispatch('changeHeadLine',classify)
      this.show = false;
      this.selected = index;
      this.getPage(classify)
    },
    getPage(classify){
      var imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
      var imgSrc;
      api.getArticlesByClassify({classify})
          .then(({data:{code,articleLists}})=>{
            articleLists.forEach((item,index,arr)=>{
              // 正则？？？？？？？？
              item.article_id = 'article_'+item._id;
              item.img_id = 'img_'+item._id;
              imgSrc = item.contentToMark.match(imgReg);
              if (item.contentToMark.match(/<div>([\s\S]*?)<\/div>/g)) {
                item.contentToMark = item.contentToMark.match(/<div>([\s\S]*?)<\/div>/g)[0];
              } else item.contentToMark = item.contentToMark.match(/<p>([\s\S]*?)<\/p>/g)[0];
              if (imgSrc) {
                var srcReg = /<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/gi;
                var _src = srcReg.exec(imgSrc[0]);
                item.src = _src[1];
              }
              else {
                item.status = 0;
              }
            })
            if(code==200){
                this.articleLists = articleLists;
                setTimeout(()=>{
                  this.show = true;
                  this.loading2=false;
                  this.$nextTick(function () {
                    var length = document.getElementsByClassName('img_out').length;
                    var tHeight;
                    for (var i = 0 ; i<length ;i++) {
                      tHeight = document.getElementsByClassName('text_out')[i].clientHeight;
                      document.getElementsByClassName('img_out')[i].style.height = tHeight+'px';
                    }
                  })
                },200)

            }
          })
          .catch(err=>{
            alert(err.message)
          })
    }
  },
  mounted(){
    this.$store.dispatch('changeHeadLine','标签')
      // 根据标签名获取文章列表
    api.getNoAuthClass()
      .then(({data:{code,lists}})=>{
        if(code==200){
          setTimeout(()=>{
            this.loading2=false;
            this.items = lists;
            this.getPage(lists[0].classify);
          },200)
        }

      })
      .catch(err=>{
        alert(err.message);
      })


  }

}
</script>

<style lang="css" scoped>
.list-enter-active,.list-leave-active{
  transition: all .3s
}
.list-enter,.list-leave-active{
  opacity: 0;
}

h2,h4{
  margin:0;
}
.tags_list{
  margin:0;
  padding:0;
  list-style: none;
  display: flex;
  display:-webkit-flex;
  -webkit-flex-wrap:wrap;
  flex-wrap: wrap;
}
.tags_list li{
  margin:.4rem;
}
.tags_list li a{
  display: block;
  padding: .6rem 1.6rem;
  border:1px solid #d2d2d2;
  border-radius: .6rem;
  color:rgba(0, 0, 0, .8);
  font-size: 1.8rem;
  /*transition渐变*/
   background-color: #f7f7f7;
   transition: all .4s;
   cursor: pointer;
}
.tags_list li a:hover,.tags_list li .active{
    /*transition渐变*/
  background-color: #555555;
    color: #fff;
}
.tags_wrap{
  margin:auto;
  list-style: none;
}
.tags_wrap article{
  padding-bottom: 2rem;
  border-bottom:1px solid #d2d2d2;
  margin-bottom: 2.5rem;
}
.tags_title{
  display: block;
  font-size: 3rem;
  font-weight: 400;
  color:#404040;
  padding:1rem 0;
}
.tags_creatAt{
  font-family: "Comic Sans MS", curslve, sans-serif;
  padding:0.6rem 0;
  font-size: 1.8rem;
  color:#7f8c8d;
}
.tags_main{
  font-size: 1.6rem;
  color:#34495e;
  line-height: 1.6em;
  padding:1rem 0;
}
footer{
  text-align: right;
}
.tags_readMore{
  font-size: 2rem;
  color:#919191;
  font-weight: 600;
}
article:after,article:before {
  clear: both;
  content: '';
  display: block;
}
.text_out {
  width: 65%;
  float: left;
}
.img_out {
  width: 30%;
  float: right;
  overflow: hidden;
  border-radius: 5px;
  background-position: 50%;
  background-size: cover;
  box-shadow: 0 0 10px 1px #666;
}
@media screen and (max-width:786px){
  .tags_title{
    font-size: 2.4rem;
  }
  .tags_creatAt{
    font-size: 1.6rem;
  }
  .tags_list li{
    margin:.2rem;
  }
  .tags_list li a{
    font-size: 1.4rem;
  }
}
@media screen and (max-width:480px){
  .tags_main{
    font-size:1.4rem;
  }
  .tags_readMore{
    font-size: 1.8rem;
  }
}
@media screen and (max-width: 1000px){
  .text_out {
    float: none;
    width: 100%;
  }
  .img_out {
    float: none;
    width: 100%;
    height: 25vw !important;
    margin: 1.5rem 0 0;
  }
}
@media screen and (max-width: 768px) {
  .img_out {
    height: 35vw !important;
  }
}
@media screen and (max-width: 500px) {
  .img_out {
    height: 45vw !important;
  }
}
</style>
