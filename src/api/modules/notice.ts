import { ResPage } from "@/api/interface/index";
import { Notice } from "@/api/interface/noticeModel";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 公告管理模块
 */
// 获取公告列表
export const getList = (params: Notice.ReqParams) => {
  return http.get<ResPage<Notice.ResList>>(PORT1 + `/notice`, params);
};

// 新增公告
export const addInfo = (params: { id: string }) => {
  return http.post(PORT1 + `/notice/create`, params);
};

// 编辑公告
export const editInfo = (params: { id: string }) => {
  return http.post(PORT1 + `/notice/update`, params);
};

// 删除公告
export const deleteInfo = (params: { id: string[] }) => {
  return http.post(PORT1 + `/notice/delete/` + params.id, params);
};

// 切换公告状态
export const changeInfoStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/notice/change`, params);
};

// 导出公告数据
export const exportInfo = (params: Notice.ReqParams) => {
  return http.download(PORT1 + `/user/export`, params);
};
