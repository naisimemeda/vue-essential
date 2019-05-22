<template>
<div class="col-md-3 side-bar">
  <div class="panel panel-default corner-radius sidebar-resources">
    <div class="panel-heading text-center">
      <h3 class="panel-title">欣赏一哈</h3>
    </div>
    <div class="panel-body">
      <Slider :slides="slides">
        <template slot-scope="{ currentSlide }">
          <a :href="currentSlide.link" target="_blank">
            <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
          </a>
        </template>
      </Slider>
    </div>
  </div>
  <div class="panel panel-default corner-radius panel-active-users">
    <div class="panel-heading text-center">
      <h3 class="panel-title">活跃用户</h3>
    </div>
    <div class="panel-body">
      <div class="users-label">
        <router-link v-for="(user, index) in activeUsers" :to="`/${user.name}`" :key="index" class="users-label-item">
          <img :src="user.avatar" class="avatar-small inline-block">
          {{ user.name }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="panel panel-default corner-radius panel-hot-topics">
    <div class="panel-heading text-center">
      <h3 class="panel-title">七天内最热</h3>
    </div>
    <div class="panel-body">
      <ul class="list">
        <li v-for="(article, index) in hotArticles">
          <router-link :to="`/articles/${article.articleId}/content`">
            <span v-if="index === 0">?</span>
            <span v-else>{{ index + 1 }}.</span>
            {{ article.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="other">
  <div class="panel panel-default corner-radius sidebar-resources">
    <div class="panel-heading text-center">
      <h3 class="panel-title">推荐资源</h3>
    </div>
    <div class="panel-body">
      <ul class="list list-group">
        <li v-for="(item, index) in resources" class="list-group-item">
          <a :href="item.link" target="_blank">
            <img class="media-object inline-block " src="https://vuejscaffcdn.phphub.org/uploads/sites/fcxJFYjEMaLQt4Oi1x6ZNkcqvwIVHbfy.png">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="panel panel-default corner-radius">
    <div class="panel-body text-center">
      <a href="2514430140@qq.com" style="color:#a5a5a5">
        <span style="margin-top: 7px;display: inline-block;">
          <i class="fa fa-heart" style="color: rgba(232, 146, 136, 0.89);"></i>
          建议反馈？请私信 Nice
        </span>
      </a>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      // 实战课程
      slides: [{
          title: '哟嘿嘿',
          img: 'http://img4.tuwandata.com/v3/thumb/jpg/ZGJkNCwxMDI0LDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBuvzpwYbEIoBh8ap84BsgXdnGWKvt9plUQqzX7EPQWAjLQvBlKkI2Gj43qUTWykpaU0i2DNiAzIgS9Ao583ZRjoG.jpg',
          link: 'https://github.com/naisimemeda'
        },
        {
          title: '滋溜滋溜',
          img: 'http://img4.tuwandata.com/v3/thumb/jpg/M2JkNSwxNzMzLDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBuqpv5D6TMVTS2bhtLI08cX8rhGLWNmFJMFLTlVXZFvsLiHtbQ5SkKyyLJuSe71JsqfPzlyuoLwtGknIs8yA02Hm.jpg',
          link: 'https://github.com/naisimemeda'
        },
        {
          title: '嘻嘻',
          img: 'http://img4.tuwandata.com/v3/thumb/jpg/NDI1NCwxMDI0LDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBGJIQIdVSQAIUkznpxRR2XnXOzHdXqbsUFQgiHM57R781hN5hNrfjFbN94ASvEDnaehWabI5LZK0Bs4SPt12V3UK.jpg',
          link: 'https://github.com/naisimemeda'
        }
      ],
      activeUsers: [],
      hotArticles: [],
      resources: [
      {
        title: 'Vue 官方教程',
        link: 'https://vuejscaff.com/v2/guide/',
      },
      {
        title: 'Vuex 官方教程',
        link: 'https://vuex.vuejs.org/zh/',
      },
      {
        title: 'Vue Router 官方教程',
        link: 'https://router.vuejs.org/zh-cn/',
      },
      {
        title: 'Vue Loader 官方教程',
        link: 'https://vue-loader.vuejs.org/zh-cn/',
      },
      {
        title: 'Vue 特有代码的风格指南',
        link: 'https://vuejscaff.com/v2/style-guide/',
      }
    ]
    }
  },
  created() {
    // 通过 axios 执行 GET 请求来返回活跃用户
    this.$axios.get('/users/active').then((response) => {
      // 在成功的回调里，从 response.data 获取返回数据
      this.activeUsers = response.data
    })
    this.$axios.post('/articles/hot', {
      num: 10
    }).then((response) => {
      this.hotArticles = response.data
    })
  }
}
</script>

<style scoped>
.carousel-inner img {
  display: block;
  margin: auto;
  line-height: 1;
  width: 70%;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
}
</style>
