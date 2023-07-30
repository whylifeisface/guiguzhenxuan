import { PermissionNode } from "@/api/user/type";
import { ResponseData } from "@/api/type";

export interface hasPermissionResponse extends ResponseData {
  data: PermissionNode[];
}
