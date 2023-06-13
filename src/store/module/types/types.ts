import { RouteRecordRaw } from "vue-router";
import { CategoryObject } from "@/api/product/attr/type.ts";

interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}
export type { UserState };

export interface CategorySate {
  c1Id: number | string;
  c1Attr: CategoryObject[];
}
