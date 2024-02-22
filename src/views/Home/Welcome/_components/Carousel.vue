<script setup>
// 轮播图的高度
const height = "65rem";





// 获取assets下的所有图片
const urls = ["https://media.xinyipurification.com/images/events/126asdfnaei3nd.jpg",
  "https://media.xinyipurification.com/images/events/asdfasdfasasdfe.jpg",
  "https://media.xinyipurification.com/images/events/asdfdavcfsadaf.jpg",
]




</script>

<template>
  <div class="el-carousel-placeholder"></div>
  <el-carousel :interval="8000" :height="height" arrow="never">
    <el-carousel-item v-for="(url, index) in urls" :key="index">
      <div class="carousel-image-container" :style="{ backgroundImage: `url(${url})` }"></div>
    </el-carousel-item>
  </el-carousel>
  <hr>
</template>

<style scoped lang="scss">
.el-carousel-placeholder {
  height: 60rem;
  width: 100%;
}

.el-carousel {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

.carousel-image-container {
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 100%;
}

.carousel-image-container::after {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

</style>