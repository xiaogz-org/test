<template>
  <div class="ship-menu" v-if="isShow" :style="{top: point.y + 'px', left: point.x + 'px'}">
    <div class="ship-menu-head">
      123
    </div>
    <div class="ship-menu-body">
      12312
    </div>
  </div>
</template>
<script>
  export default {
    name: "shipMenu" 
  }
</script>
<script setup>
  import { onMounted, ref, reactive, watch, watchEffect, toRefs, nextTick } from 'vue'
  import { useStore } from 'vuex'

  const isShow = ref(false),
        store = useStore()
  const state = reactive({
    point: {
      x: 0,
      y: 0
    }
  })

  /* watchEffect(() => {
    console.log('watchEffect');
    console.log(store.state.showShipInfo);
  }) */

  watch(() => store.state.showShipInfo, (val) => {
    //console.log(val);
    isShow.value = val.isShow
    
    nextTick(() => {
      let domW = document.querySelector('.ship-menu').offsetWidth,
          domH = document.querySelector('.ship-menu').offsetHeight
      state.point.x = val.x - domW / 2
      state.point.y = val.y - domH
    })
  }, {deep: true})

  onMounted(() => {
    console.log('mounted');
  })

  const { point } = toRefs(state)
</script>

<style lang='scss' scope>
.ship-menu {
  position: absolute;
  z-index: 99999;
  background-color: rgba( 233, 255, 255, 0.6);
  padding: 10px;
  border-radius: 10px;
}
</style>