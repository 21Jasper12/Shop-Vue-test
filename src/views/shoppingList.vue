<template>
  <div class="container">
    <section class="send-info">
      <checkedStepper :stepperId="stepperId"/>

      <infoForm 
        :genders="genders"
        :counties="counties"
        :initial-stepper-id="stepperId"
        @after-submit="handleAfterSubmit"
        v-if="stepperId === 1"
      />

      <transportationMethod 
        :initial-stepper-id="stepperId"
        :transportFee="transportFee"
        :initial-send-methods="sendMethods"
        @after-submit-fee="handleAfterSubmitFee"
        @after-stepperId="previousStepperBtn"
        v-if="stepperId === 2"
      />

      <paymentInfo 
        :initial-stepper-id="stepperId"
        @after-stepperId="previousStepperBtn"
        @after-submit-payment="handeAfterSubmitPayment"
        v-if="stepperId === 3"
      />

    </section>
    <section class="shopping-cart">
      <shoppingCart 
        :initial-commodities="commodity"
        :transportFee="transportFee"
        :sendMethods="sendMethods"
      />
    </section>
  </div>
  
</template>

<script>
import checkedStepper from './../components/checkedStepper.vue'
import infoForm from './../components/infoForm.vue'
import transportationMethod from './../components/transportationMethod.vue'
import paymentInfo from './../components/paymentInfo.vue'
import shoppingCart from './../components/shoppingCart.vue'

const dummyData = {
  "gender": [
    {
      "id": 1,
      "title": "先生"
    },
    {
      "id": 2,
      "title": "小姐"
    },
  ],
  "county": [
    {
      "id": 1,
      "title": "台北"
    },
    {
      "id": 2,
      "title": "台中"
    },
    {
      "id": 3,
      "title": "高雄"
    },
  ],
  transportFee: [
    {
      id: 1,
      title: '標準運送',
      description: '約3~7個工作天',
      fee: '免費'
    },
    {
      id: 2,
      title: 'DHL 貨運',
      description: '48小時內送達',
      fee: 500
    }
  ],
  commodity: [
    {
      id: 1,
      title: '破壞補丁修身牛仔褲',
      image: 'commodity-1@2x.png',
      count: 0,
      price: 3999
    },
    {
      id: 2,
      title: '刷色直筒牛仔褲',
      image: 'commodity-2@2x.png',
      count: 0,
      price: 1299
    }
  ]
}


export default {
  components: {
    checkedStepper,
    infoForm,
    transportationMethod,
    paymentInfo,
    shoppingCart,
  },
  data () {
    return {
      genders:[],
      counties: [],
      transportFee: [],
      commodity: [],
      sendMethods: -1,
      payment: {
        name: '',
        cardID: '',
        dateLine: '',
        cvc: '',
      },
      info:{},
      stepperId: 1,
    }
  },
  created() {
    this.fetchPaymentInfo()
  },
  methods: {
    fetchPaymentInfo() {
      this.genders = dummyData.gender
      this.counties = dummyData.county
      this.transportFee = dummyData.transportFee
      this.commodity = dummyData.commodity
    },
    previousStepperBtn(id){
      this.stepperId = id
    },
    handleAfterSubmit (formData, id, info) {
      // 接收infoForm.vue資料
      this.info = {...info}

      // 傳送頁面id
      this.stepperId = id

      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    },
    handleAfterSubmitFee(formData, id, feechoose){
      // 傳送運送方式id
      this.sendMethods = feechoose

      // 傳送頁面id
      this.stepperId = id

      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    },
    handeAfterSubmitPayment(formData, id, payInfo){
      // 接收infoForm.vue資料
      this.payment = {...payInfo}

      // 傳送頁面id
      this.stepperId = id

      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
  }
  .send-info {
    flex-basis: 50%;
  }
  .shopping-cart {
    margin-left: 100px;
    flex-basis: 50%;
  }

</style>