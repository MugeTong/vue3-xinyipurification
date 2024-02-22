<!--创建home的主页导航区域-->
<script setup>
import {onMounted, ref} from 'vue'
import {getNavMenuListApi} from "@/apis/StaticApis";
import {useRouter} from "vue-router";


const router = useRouter();

/* ---------------------------------------------------- */
/* 获取导航栏的信息，在js中完成元素的渲染 */
const nav_menu_list = ref([]);
onMounted(async () => {
  await getNavMenuListApi()
      .then(res => {
            nav_menu_list.value = res.data;
          }
      )
      .catch(err => console.log(err));
})

// 显示底板
const nav_menu_area_status = ref(false);
</script>

<template> <!--模仿tencent设置的导航页-->
  <div class="container" :class="{active: nav_menu_area_status}">
    <!--导航栏左侧的logo图标区域-->
    <div class="logo-area" @click="router.push('/')">
      <span class="logo-text-zh">欣艺净化科技</span>
      <span class="logo-text-en">--&nbsp;Xinyi Purification technology&nbsp;--</span>
    </div>

    <!--导航栏右侧的导航链接区域-->
    <div class="nav-menu-area" @mouseenter="nav_menu_area_status = true"
         @mouseleave="nav_menu_area_status = false">
      <div v-for="item in nav_menu_list" :key="item.titleId" class="nav-menu-item">
        <router-link :to="item.url" class="nav-menu-title">{{ item.title }}</router-link>
        <div class="nav-menu-sub">
          <div class="nav-menu-sub-item" v-for="sub_item in item.children"
               :key="sub_item.titleId" @click="router.push(sub_item.url)">{{ sub_item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nav-bottom-board" :class="{active: nav_menu_area_status}"></div>
</template>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  z-index: 2;
}

.logo-area {
  padding: 0 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  flex-grow: 2;
}

.logo-text-en, .logo-text-zh {
  color: $y-color-text-white;
  font-size: 7px;
  transition: all 0.2s ease-in-out;
}

.active .logo-text-en, .active .logo-text-zh {
  color: $y-color-text-black;
}

.logo-text-zh {
  line-height: normal;
  font-weight: 600;
}

.logo-text-en {
  display: flex;
  font-weight: 600;
}

.nav-menu-area {
  padding: 0 0 0 16rem; // 上 右 下 左
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-grow: 4;
}

.nav-menu-area .nav-menu-item {
  position: relative;
  height: 100%;
}

.nav-menu-area .nav-menu-item .nav-menu-title {
  height: 100%;
  padding: 0 3rem;

  font-size: 1.2rem;
  font-weight: 600;

  /* 内部文字居中 */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $y-color-text-white;
}

.active .nav-menu-area .nav-menu-item .nav-menu-title {
  color: $y-color-text-black;
}

.nav-menu-area .nav-menu-item .nav-menu-title:after {
  content: "";
  position: absolute;
  width: 0;
  bottom: 16px;
  left: 25%;
  height: 4px;
  background-color: $y-color-text-black;
  transition: all 0.2s ease-in-out;
  z-index: 2;
}

.nav-menu-area .nav-menu-item .nav-menu-sub {
  position: absolute;
  top: 100%;
  width: 100%;
  visibility: hidden;
  opacity: 0;

  /* 内部文字居中 */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.nav-menu-area .nav-menu-item:hover {
  .nav-menu-title {
  }

  .nav-menu-title:after {
    width: 50%;
  }

  .nav-menu-sub {
    visibility: visible;
    opacity: 1;
    transition: all 0.3s ease-in-out;

    .nav-menu-sub-item {
      transform: translateY(0);
      transition: all 0.3s ease-in-out;
    }
  }
}

.nav-menu-sub-item {
  top: -100%;
  height: 3.3rem;

  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transform: translateY(-50%);
  transition: all 0.2s ease-in-out;
}

.nav-menu-sub-item:hover {
  font-weight: 500;
  font-size: 1.3rem;
  transition: all 0.2s ease-in-out;
}

.nav-bottom-board {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: $y-color-white-light-1;
  transition: all .3s ease-in-out;
  z-index: 1;
}

.nav-bottom-board.active {
  height: 300px;
  transition: all .3s ease-in-out;
}


@media (max-width: 1270px) {
  .nav-menu-area {
    display: none;
  }
}
</style>