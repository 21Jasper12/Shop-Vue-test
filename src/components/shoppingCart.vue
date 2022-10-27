<template>
  <div class="shopping-container">
    <div class="shopping-title">
      <h2>購物籃</h2>
    </div>

    <div class="shopping-content d-flex flex-column">
      <ul class="shopping-list">
        <li 
          v-for="commodity in commodities"
          :key="commodity.id"
          class="list-detail" 
          :id="commodity.id"
        >
          <img
            :src="require(`@/assets/images/${commodity.image}`)"
            alt="commodity"
            class="shopping-img"
          />
          <h4 class="commodity-title">{{ commodity.title }}</h4>
          <div class="shopping-btn">
            <button 
              @click.stop.prevent="reduceCount(commodity.id)"
              class="reduce list-btn"
            >
              -
            </button>
            <span class="count">{{ commodity.count }}</span>
            <button 
              @click.stop.prevent="addCount(commodity.id)"
              class="increase list-btn"
            >
              +
            </button>
          </div>
          <h5 class="price">${{ commodity.price | addPriceComma }}</h5>
        </li>

      </ul>

      <div class="transportation-fee">
        <p class="fee-title">
          運費
          <span class="fee-price">{{ sendMethods | changeTag }}</span>
        </p>
      </div>

      <div class="shopping-total">
        <p class="total-title">
          小計
          <span class="total">$<span class="total-price">{{ totalCount | addPriceComma }}</span></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialCommodities: {
      type:Array,
      required: true,
    },
    transportFee: {
      type: Array,
      required: true,
    },
    sendMethods: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      commodities: this.initialCommodities,
    }
  },
  computed: {
    totalCount(){
      let total = 0
      const cost = this.transportFee.find(feeId => feeId.id === this.sendMethods)
      for(let i = 0; i < this.commodities.length; i++ ){
        let commodityCount = this.commodities[i].count
        total += commodityCount * this.commodities[i].price
      }

      if(this.sendMethods > 0 && typeof cost.fee === 'number'){
        return total + cost.fee
      }
      else{
        return total
      }
    }
  },
  methods: {
    addCount(commodityId) {
      this.commodities = this.commodities.map(commodity => {
        if(commodity.id === commodityId){
        return{
          ...commodity,
          count: commodity.count + 1
        }
       }
        else{
          return commodity
        }

      })
    },
    reduceCount(commodityId) {
      this.commodities = this.commodities.map(commodity => {
        if(commodity.id === commodityId && commodity.count > 0){
        return{
          ...commodity,
          count: commodity.count - 1
        }
       }
        else{
          return commodity
        }

      })
    }
  },
  filters: {
    changeTag(tag){
      if(tag === 1){
        return '免費'
      }
      else if(tag === 2){
        return '$500'
      }
      else{
        return '請選擇用送方式'
      }
    },
    addPriceComma(price){
      return price.toLocaleString()
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

li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.shopping-container {
  width: 500px;
  height: 500px;
  border: 1px solid #dfdfe4;
  border-radius: 4px;
}

.shopping-title {
  display: block;
  margin: 32px 24px 0 24px;
}

.list-detail {
  position: relative;
  width: 100%;
  height: 118px;
}

.list-detail img {
  position: absolute;
  top: 18px;
  left: 18px;
  width: 100px;
  height: 100px;
}

.commodity-title {
  position: absolute;
  top: 0px;
  left: 140px;
}

.shopping-btn {
  position: absolute;
  top: 58px;
  left: 140px;
}

.shopping-btn button {
  width: 26px;
  height: 26px;
  background-color: #f0f0f5;
  border-radius: 50%;
  font-size: 20px;
}

.count {
  margin: 0 20px;
}

.price {
  position: absolute;
  top: 0px;
  left: 360px;
  font-size: 22px;
}

.transportation-fee,
.shopping-total {
  position: relative;
  border-top: 1px solid #dfdfe4;
  margin: 16px 16px 0 16px;
  height: 36px;
  padding: 16px 0;
}

.fee-price,
.total {
  position: absolute;
  right: 0px;
}

.fee-price {
  font-weight: 700;
}
</style>