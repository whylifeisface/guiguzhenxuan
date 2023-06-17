import { request } from "@/utils/request.ts";
import { HasSpuResponseDate } from "@/api/product/spu/type.ts";
enum API {
  HASSPU_URL = "/admin/product/",
}

export const reqHasSpu = (
  pageNum: number,
  pageSize: number,
  category3Id: number,
) =>
  request.get<never, HasSpuResponseDate>(
    API.HASSPU_URL + `${pageNum}/${pageSize}?category3Id=${category3Id}`,
  );
