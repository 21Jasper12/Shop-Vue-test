<template>
  <form @submit.stop.prevent="nextStepper">
    <h2 class="part-title">付款資訊</h2>
    <div class="payment-info">
      <div class="form-row card-name">
        <label for="">持卡人姓名</label>
        <input 
          id="bank-code" 
          type="text" p
          laceholder="John Doe"
          name="name"
          v-model="payment.name" 
        />
      </div>

      <div class="form-row card-id">
        <label for="">卡號</label>
        <input 
          id="bank-code" 
          type="text" 
          placeholder="1111 2222 3333 4444"
          name="cardID"
          v-model="payment.cardID" 
        />
      </div>

      <div class="form-row card-date-line">
        <label for="">有效期限</label>
        <input 
          id="bank-code" 
          type="text" 
          placeholder="MM/YY"
          name="deadline"
          v-model="payment.deadLine" 
        />
      </div>

      <div class="form-row card-cvc">
        <label for="">CVC/CCV</label>
        <input 
          id="bank-code" 
          type="text" 
          placeholder="123"
          name="CVC"
          v-model="payment.cvc" 
        />
      </div>
    </div>

    <div class="btn computer-btn">
      <button
        class="btn-previous computer-previous"
        @click.stop.prevent="previousStepper(stepperId)"
      >
        ← 上一步
      </button>

      <button type="submit" class="btn-next computer-next">確認下單</button>
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
  },
  data() {
    return {
      stepperId: this.initialStepperId,
      payment: {
        name: '',
        cardID: '',
        deadLine: '',
        cvc: '',
      },
    }
  },
  methods: {
    nextStepper(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit-payment", formData, this.stepperId, this.payment);
      alert('已下單')
      this.payment = {
        name: '',
        cardID: '',
        deadLine: '',
        cvc: '',
      }
    },
    previousStepper() {
      this.stepperId -= 1;
      this.$emit("after-stepperId", this.stepperId);
    },
  },
}
</script>

<style scoped>
form {
  margin-top: 50px;
  width: 100%;
  height: 310px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  height: 30px;
  font-size: 15px;
}

.payment-info {
  display: grid;
  grid-template-columns: repeat(2, 158px);
  grid-gap: 30px;
  grid-template-areas:
    "card-name card-name"
    "card-id card-id"
    "card-date-line card-cvc";
}

.card-name {
  grid-area: card-name;
}

.card-id {
  grid-area: card-id;
}

.card-date-line {
  grid-area: card-date-line;
}

.card-cvc {
  grid-area: card-cvc;
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