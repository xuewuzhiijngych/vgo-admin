import { ResPage } from "@/api/interface/index";
import { Article } from "@/api/interface/articleModel";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 文章
 */
// 获取列表
export const getList = (params: Article.ReqParams) => {
  return http.get<ResPage<Article.ResList>>(PORT1 + `/articles`, params);
};

// 新增
export const addInfo = (params: { id: string }) => {
  return http.post(PORT1 + `/articles`, params);
};

// 编辑
export const editInfo = (params: { id: string }) => {
  return http.put(PORT1 + `/articles`, params);
};

// 删除
export const deleteInfo = (params: { id: string[] }) => {
  console.log(params);
  return http.delete(PORT1 + `/articles`, params);
};

// 切换状态
export const changeInfoStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/articles/change`, params);
};

// 导出数据
export const exportInfo = (params: Article.ReqParams) => {
  return http.download(PORT1 + `/user/export`, params);
};
