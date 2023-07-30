import { ResponseData } from "@/api/product/attr/type";
import { Role } from "@/api/user/type";

export interface RoleListResponseData extends ResponseData {
  data: {
    records: Role[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}
