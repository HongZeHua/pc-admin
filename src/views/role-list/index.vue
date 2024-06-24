<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column :label="$t('msg.role.action')" #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            >{{ $t('msg.role.assignPermissions') }}</el-button
          >
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
// 监听语言变化
watchSwitchLang(getRoleList)

// 分配权限
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
