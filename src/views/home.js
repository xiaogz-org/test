import { reactive, computed, watch, watchEffect} from "vue"
const state = reactive({
    count: 1,
    switchBtn: true,
    date: new Date()
});

watchEffect(() => {
  if(!state.switchBtn) {
    console.log("开");
  }else {
    console.log("关");
  }
})

watch(() => state.count, (newV, oldV) => {
  console.log(newV);
  console.log(oldV);
});

const methods = {
  addCount() {
    state.count += 1;
  },
  nameCount: computed(function() {
    return "my" + state.count;
  })
}

export {state, methods}
