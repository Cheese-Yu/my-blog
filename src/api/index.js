// 各种api
// 负责用instance和服务端进行交互

import axios from 'axios';
import store from '../store'
// axios.defaults.headers.common['Authorization'] = 'dailu';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const instance = axios.create();
const front_instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
if(localStorage.getItem('jwt')){
  /* localStorage.getItem('jwt')是带引号的字符串
    Bearer token(通过Authorization头部字段发送到服务端便于验证)的格式：Bearer XXXXXXXXXX
  */
  instance.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('jwt').replace(/(^\")|(\"$)/g,'')
}
// axios拦截请求
axios.interceptors.response.use(response => {
  return response.headers['content-type'] === 'application/json; charset=utf-8' ? response : Promise.reject(response);
}, error => Promise.reject(error));

axios.interceptors.request.use = instance.interceptors.request.use = front_instance.interceptors.request.use;
front_instance.interceptors.request.use(config=>{
  store.dispatch('showProgress',20)
  return config
},err=>{
  // store.dispatch('showProgress',100)
  return Promise.reject(err)
})
// axios拦截响应
front_instance.interceptors.response.use(response=>{
  store.dispatch('showProgress',100);
  return response
},err=>{
  store.dispatch('showProgress',100)
  return Promise.reject(err)
})
export default {
  // 登录
  localLogin(data){
    return axios.get('/api/login', {params: data});
  },
  //获取文章列表{带分页获取}
  getArticleList(data){
    return instance.get('/api/article/lists', {params: data});
  },
  // 不带分页获取文章
  getArticleLists(data){
    return front_instance.get('/api/article/articleLists', {params: data});
  },
  // 根据classify获取文章列表
  getArticlesByClassify(data){
    return front_instance.get('/api/article/noAuthArtilcelists',{params: data});
  },
  // 创建文章
  createArticle(params){
    return instance.post('/api/article/create',params);
  },
// 删除一篇文章
removeOneArticle(params){
    return instance.post('/api/article/remove',params);
},
// 根据postID获取一篇文章(带权限)
getOneArticle(data){
  return instance.get('/api/article/onePage',{params: data});
},
// 根据postID获取一篇文章(不带权限)
getOneArticleNoAuth(data){
  return front_instance.get('/api/article/noAuth',{params: data});
},
// 编辑一篇文章
editArticle(params){
  return instance.post('/api/article/edit',params);
},
  // 获取分类列表
  getClassify(){
    return instance.get('/api/classify/lists');
  },
  getNoAuthClass(){
    return   front_instance.get('/api/classify/noAuth');
  },

  // 删除某一个分类
  removeClassifyList(params){
    return instance.post('/api/classify/remove',params);
  },
  // 添加分类
  addClassify(params){
    return instance.post('/api/classify/create',params);
  },

  // 编辑分类
  editClassfy(params){
    return instance.post('/api/classify/edit',params);
  }
}
