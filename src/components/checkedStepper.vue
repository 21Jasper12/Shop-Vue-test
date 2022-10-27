<template>
  <div class="comtainer">
    <div class="checked-title">
      <h2>結帳</h2>
    </div>

    <div class="checked-stepper">
      <div 
        :class="['step', { active: stepperId === 1 }, { checked: stepperId > 1}]"
      >
        <div class="circle-container"></div>
        <div class="label-container">寄送地址</div>
      </div>
      <div 
        :class="['step', { active: stepperId === 2 }, { checked: stepperId > 2}]"
      >
        <div class="circle-container"></div>
        <span class="connect-line"></span>
        <div class="label-container">運送方式</div>
      </div>
      <div 
        :class="['step', { active: stepperId === 3 }]"
      >
        <div class="circle-container"></div>
        <span class="connect-line"></span>
        <div class="label-container">付款資訊</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stepperId: {
      type: Number,
      required: true,
    },
  },
};
</script>


<style scoped>
.checked-stepper {
  display: flex;
}
.step {
  position: relative;
  flex: 1;
}
.step:nth-child(1) .circle-container::after {
  content: "1";
}
.step:nth-child(2) .circle-container::after {
  content: "2";
}
.step:nth-child(3) .circle-container::after {
  content: "3";
}
.circle-container {
  position: absolute;
  left: 15px;
  height: 32px;
  width: 32px;
  border: 1px solid #afb1bd;
  border-radius: 50%;
  color: #afb1bd;
}
.circle-container::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.connect-line {
  display: block;
  width: 60px;
  height: 1px;
  background-color: #2a2a2a;
  position: absolute;
  top: 15.5px;
  right: calc(50%);
  left: calc(-50% + 40px);
}
.label-container {
  position: absolute;
  top: 5px;
  left: 60px;
}

.step.checked .circle-container::after {
  content: "\2714";
}

.step.checked .circle-container,
.step.active .circle-container {
  background-color: #2a2a2a;
  color: #ffffff;
}

.step.checked .circle-container .label-container,
.step.active .circle-container .label-container {
  color: #18253d;
}
</style>

