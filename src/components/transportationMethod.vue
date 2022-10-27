<template>
  <form @submit.stop.prevent="nextStepper">
    <h2 class="part-title">運送方式</h2>
    <div class="shipping-method">
      <div 
        class="form-row"
        v-for="method in transportFee"
        :key="method.id"
      >
        <input 
          v-model="sendMethods"
          name="tansport-method" 
          type="radio" 
          :value="method.id"
          required
        />
        <p class="tag-title">{{ method.title }}</p>
        <p class="tag-description">{{ method.description }}</p>
        <p class="tag-costs">{{ method.fee | changeTag }}</p>
      </div>
    </div>

    <div class="btn computer-btn">
      <button
        class="btn-previous computer-previous"
        @click.stop.prevent="previousStepper(stepperId)"
      >
        ← 上一步
      </button>

      <button type="submit" class="btn-next computer-next">下一步 →</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    initialStepperId: {
      type: Number,
      required: true,
    },
    initialSendMethods: {
      type: Number,
      required: true,
    },
    transportFee: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      stepperId: this.initialStepperId,
      sendMethods: this.initialSendMethods,
    };
  },
  methods: {
    nextStepper(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.stepperId += 1;
      this.$emit("after-submit-fee", formData, this.stepperId, this.sendMethods);
    },
    previousStepper() {
      this.stepperId -= 1;
      this.$emit("after-stepperId", this.stepperId);
    },
  },
  filters: {
    changeTag(fee) {
      // typeof回傳的是字串
      if(typeof fee === 'number'){
        return `$${fee}`
      }
      else{
        return fee
      }
    }
  },
};
</script>

<style scoped>
form {
  margin-top: 50px;
  width: 100%;
  height: 310px;
}

.form-row {
  position: relative;
  border: 1px solid #dfdfe4;
  border-radius: 4px;
  width: 346px;
  height: 60px;
  margin-bottom: 24px;
}

.form-row input {
  position: absolute;
  top: 20px;
  left: 20px;
  bottom: 20px;
  right: 306px;
}

.tag-title {
  position: absolute;
  top: 0px;
  left: 60px;
  bottom: 29px;
  right: 83px;
  font-size: 14px;
  font-weight: 400;
}

.tag-description {
  position: absolute;
  top: 20px;
  left: 60px;
  bottom: 31px;
  right: 20px;
  font-size: 14px;
  font-weight: 400;
}

.tag-costs {
  position: absolute;
  top: 13px;
  left: 302px;
  bottom: 11px;
  right: 83px;
  font-size: 12px;
  font-weight: 400;
  width: 30px;
}

.fast {
  font-weight: 700;
}

/* 按鈕 */
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