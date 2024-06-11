<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input placeholder="username" name="username" type="text" />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon><Avatar /></el-icon>
        </span>
        <el-input placeholder="password" name="password" />
        <span class="show-pwd">
          <el-icon><Avatar /></el-icon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped></style>
