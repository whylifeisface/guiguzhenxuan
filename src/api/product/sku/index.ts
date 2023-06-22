import { request } from "@/utils/request.ts";
import { HasSKuResponseData } from "@/api/product/sku/type.ts";

enum API {
  //分页获取sku
  HAS_SKU = "/admin/product/list/",
}

export const hasSKU = (pageNum: number, pageSize: number) =>
  request.get<never, HasSKuResponseData>(
    API.HAS_SKU + `${pageNum}/${pageSize}`,
  );
