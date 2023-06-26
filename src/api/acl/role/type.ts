import { ResponseData } from "@/api/product/attr/type.ts";
import { Role } from "@/api/user/type.ts";

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
