import { request } from "@/utils/request";
import { HasSKuResponseData } from "@/api/product/sku/type";
import { defaultResponse } from "@/api/product/spu/type";

enum API {
  //分页获取sku
  HAS_SKU = "/admin/product/list/",
  DELETE_SKU = "/admin/product/deleteSku/",
}

export const hasSKU = (pageNum: number, pageSize: number) =>
  request.get<never, HasSKuResponseData>(
    API.HAS_SKU + `${pageNum}/${pageSize}`,
  );
//删除指定id的sku
export const reqDeleteSku = (skuId: number) =>
  request.delete<never, defaultResponse>(API.DELETE_SKU + skuId);
