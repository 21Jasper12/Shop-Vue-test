<template>
  <div class="btn computer-btn">
    <button 
      class="btn-previous computer-previous"
      v-if="stepperId !== 1"
      @click.stop.prevent="previousStepper(stepperId)"
    >
      ← 上一步
    </button>

    <button 
      class="btn-next computer-next"
      @click.stop.prevent="nextStepper(stepperId)"
    >
      {{ stepperId | stepperEnd }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    initialStepperId: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      stepperId: this.initialStepperId
    }
  },
  methods: {
    nextStepper (id){
      if(id === 3){
        console.log('上極限')
        return
      }
      else{
        console.log('+1')
        this.stepperId = id + 1
        this.$emit('after-stepperId', this.stepperId)
      }
    },
    previousStepper (id){
      if(id === 1){
        console.log('下極限')
        return
      }
      else{
        console.log('-1')
        this.stepperId = id - 1
        this.$emit('after-stepperId', this.stepperId)
      }
    }
  },
  filters: {
    stepperEnd(id) {
      if(id === 3){
        return '確認下單'
      }
      else{
        return '下一步 →'
      }
    }
  }
} 
</script>

<style scoped>
button {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-size: 14px;
}

.btn {
  position: relative;
  display: flex;
  height: 110px;
  margin-top: 20px;
  padding-top: 24px;
  border-top: 1px solid #dfdfe4;
}

.btn-previous {
  width: 100px;
  height: 46px;
}

.btn-next {
  position: absolute;
  left: 450px;
  width: 174px;
  height: 46px;
  background-color: #f67599;
  color: white;
  border-radius: 7px;
}

</style>