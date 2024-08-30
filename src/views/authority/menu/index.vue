<template>
  <div class="main-box">
    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="id"
        :indent="20"
        :columns="columns"
        :request-api="getTreeList"
        :request-auto="true"
        :data-callback="dataCallback"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <UserDrawer ref="drawerRef" />
    </div>
  </div>
</template>

<script setup lang="tsx" name="menuAuthority">
import { reactive, ref } from "vue";
import { MenuModel } from "@/api/interface/menuModel";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { CirclePlus, QuestionFilled, Delete, EditPen, View } from "@element-plus/icons-vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";
import { getTreeList, deleteInfo, editInfo, addInfo } from "@/api/modules/menu";
import { boolStatus, menuTypes } from "@/utils/dict";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data
  };
};

// 表格配置项
const columns = reactive<ColumnProps<MenuModel.ResList>[]>([
  { type: "index", label: "#", width: 80 },
  { prop: "title", label: "路由标题" },
  {
    prop: "name",
    label: "路由Name",
    headerRender: scope => {
      return (
        <>
          路由Name&nbsp;
          <el-tooltip className="box-item" effect="dark" trigger="click" content="用于权限标识" placement="top-start">
            <el-icon size="small">
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </>
      );
    }
  },
  { prop: "component", label: "Component" },
  { prop: "path", label: "Path" },
  {
    prop: "type",
    label: "类型",
    tag: true,
    enum: menuTypes
  },
  {
    prop: "isHide",
    label: "是否在菜单中隐藏",
    tag: true,
    enum: boolStatus
  },
  {
    prop: "isAffix",
    label: "是否固定标签",
    tag: true,
    enum: boolStatus
  },
  {
    prop: "isKeepAlive",
    label: "是否缓存",
    tag: true,
    enum: boolStatus
  },
  { prop: "sort", label: "排序" },
  { prop: "operation", label: "操作", width: 300, fixed: "right" }
]);

// 删除用户信息
const deleteAccount = async (params: MenuModel.ResList) => {
  await useHandleData(deleteInfo, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<MenuModel.ResList> = {}) => {
  const params = {
    title,
    row: { ...row },
    isView: title === "查看",
    api: title === "新增" ? addInfo : title === "编辑" ? editInfo : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
