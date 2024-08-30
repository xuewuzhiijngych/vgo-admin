import { ReqPage } from "@/api/interface/index";
// 公告管理模块
export namespace Notice {
  export interface ReqParams extends ReqPage {
    title: string;
    createTime: string[];
    status: number;
  }
  export interface ResList {
    id: number;
    created_at: string;
    updated_at: string;
    gender: number;
    title: string;
    status: number;
    content: string;
    remark: string;
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
}
