<template>
  <form @submit.stop.prevent="nextStepper">
    <h2 class="part-title">寄送地址</h2>
    <div class="address-detail">
      <div class="form-row gender">
        <label>稱謂</label>
        <div class="select-wrapper">
          <select v-model="info.genderId" name="genderId" id="a-type" required>
            <option value="" selected disabled>--請選擇--</option>
            <option
              v-for="gender in genders"
              :key="gender.id"
              :value="gender.id"
            >
              {{ gender.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row real-name">
        <label for="">姓名</label>
        <input
          v-model="info.name"
          id="bank-code"
          type="text"
          name="name"
          placeholder="請輸入姓名"
        />
      </div>

      <div class="form-row mobile">
        <label for="">電話</label>
        <input
          v-model="info.tel"
          id="bank-code"
          type="text"
          name="tel"
          placeholder="請輸入行動電話"
        />
      </div>

      <div class="form-row email">
        <label for="">Email</label>
        <input
          v-model="info.email"
          id="bank-code"
          type="text"
          name="email"
          placeholder="請輸入電子郵件"
        />
      </div>

      <div class="form-row county">
        <label>縣市</label>
        <div class="select-wrapper">
          <select v-model="info.countyId" name="countyId" id="a-type" required>
            <option value="" disabled selected>請選擇縣市</option>
            <option
              v-for="county in counties"
              :key="county.id"
              :value="county.id"
            >
              {{ county.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row address">
        <label for="">地址</label>
        <input
          v-model="info.address"
          id="bank-code"
          type="text"
          name="address"
          placeholder="請輸入地址"
        />
      </div>
    </div>

    <div class="btn computer-btn">
      <button
        type="submit"
        class="btn-next computer-next"
      >
        下一步 →
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    genders: {
      type: Array,
      required: true,
    },
    counties: {
      type: Array,
      required: true,
    },
    initialStepperId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      info: {
        genderId: "",
        name: "",
        tel: "",
        email: "",
        countyId: "",
        address: "",
      },
      stepperId: this.initialStepperId,
    };
  },
  methods: {
    nextStepper(e) {
      const form = e.target
      const formData = new FormData(form) 
      this.stepperId += 1;
      this.$emit("after-submit", formData, this.stepperId, this.info);
    },
  },
};
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

.address-detail {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-gap: 30px;

  grid-template-areas:
    "gender  real-name real-name real-name"
    "mobile mobile email email"
    "county  address address address";
}

.address-detail input {
  width: 100%;
  height: 30px;
  font-size: 15px;
}

.address-detail select {
  width: 100%;
  height: 35px;
  font-size: 15px;
}

.gender {
  grid-area: gender;
}

.real-name {
  grid-area: real-name;
}

.mobile {
  grid-area: mobile;
}

.email {
  grid-area: email;
}

.county {
  grid-area: county;
}

.address {
  grid-area: address;
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