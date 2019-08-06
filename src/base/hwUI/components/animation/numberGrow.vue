<template>
  <span class="number-grow" ref="numberGrow" :data-time="time" :data-value="value">0</span>
</template>

<script>
  export default {
    name: 'hw-number-grow',
    props: {
      time: {
        type: Number,
        default: 2
      },
      value: {
        type: Number,
        default: 720000
      }
    },
    methods: {
      numberGrow(ele) {
        let _this = this
        let step = (_this.value * 10) / (_this.time * 1000)
        let current = 0
        let start = 0
        let t = setInterval(function() {
          start += step
          if (start > _this.value) {
            clearInterval(t)
            start = _this.value
            t = null
          }
          if (current === start) {
            return
          }
          current = start
          let r0 = String(current).length
          let r1 = String(_this.value).length
          if (r0 > r1) {
            let lm = String(current).substring(0, r1)
            current = Number(lm)
          }
          ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
        }, 10)
      }
    },
    watch: {
      value(r) {
        this.value = Number(this.value)
        this.numberGrow(this.$refs.numberGrow)
      }
    },
    mounted() {
      this.numberGrow(this.$refs.numberGrow)
    }
  }
</script>

<style>
  .number-grow {
    transform: translateZ(0);
    font-family: Arial-BoldMT;
    letter-spacing: 2.67px;
  }
</style>
