<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useI18n } from 'vue-i18n'
import steps from './steps'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

let driverObj = null
const initDriver = () => {
  driverObj = driver({
    showProgress: true,
    // 点击蒙版关闭
    allowClose: true,
    doneBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    steps: steps(i18n)
  })
}
onMounted(() => {
  initDriver()
})
const onClick = () => {
  driverObj.drive()
}

// 语言切换时，重新初始化 driver
watchSwitchLang(initDriver)
</script>

<style scoped lang="scss"></style>
