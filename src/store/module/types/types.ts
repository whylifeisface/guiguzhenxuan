import { RouteRecordRaw } from "vue-router";

interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}
export type { UserState };
