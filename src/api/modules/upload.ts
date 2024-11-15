import { Upload } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(PORT1 + `/upload/local/img`, params, { cancel: false });
};

// 视频上传
export const uploadVideo = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(PORT1 + `/upload/local/video`, params, { cancel: false });
};

// 自动选择上传
export const uploadAuto = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(PORT1 + `/upload/auto`, params, { cancel: false });
};
