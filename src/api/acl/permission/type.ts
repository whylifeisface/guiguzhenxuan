import { PermissionNode } from "@/api/user/type.ts";
import { ResponseData } from "@/api/type.ts";

export interface hasPermissionResponse extends ResponseData {
  data: PermissionNode[];
}
