import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

export interface ResStatus {
  Label: string;
  Value: number;
}

// 获取状态字典
export const getStatus = () => {
  return http.get<ResStatus[]>(PORT1 + `/common/get_status`);
};
