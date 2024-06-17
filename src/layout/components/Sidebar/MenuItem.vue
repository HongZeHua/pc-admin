<template>
  <el-icon
    style="padding-right: 5px"
    v-if="icon.includes('el-icon')"
    :size="15"
  >
    <!-- 动态渲染icon -->
    <component :is="iconName()"></component>
  </el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
// 清除多余字符串
const iconName = () => {
  if (props.icon.includes('el-icon')) {
    const newIconName = props.icon.replace('el-icon-', '')
    return newIconName
  }
}
</script>
<style scoped lang="scss"></style>
