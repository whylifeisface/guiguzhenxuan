import { RouteRecordRaw } from "vue-router";
import { CategoryObject } from "@/api/product/attr/type.ts";

interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: any[];
}
export type { UserState };

export interface CategorySate {
  c1Id: number | string;
  c1Attr: CategoryObject[];
  c2Id: number | string;
  c2Attr: CategoryObject[];
  c3Id: number | string;
  c3Attr: CategoryObject[];
}
