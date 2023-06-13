import { request } from "@/utils/request.ts";
import { CategoryData } from "@/api/product/attr/type.ts";
enum API {
  Category1_URL = "admin/product/getCategory1",
  Category2_URL = "admin/product/getCategory2/",
  Category3_URL = "admin/product/getCategory3/",
}
//获取一级分类的接口方法
export const reqC1 = () => request.get<never, CategoryData>(API.Category1_URL);
//获取二级分类的接口方法
export const reqC2 = (category1Id: number) =>
  request.get<never, CategoryData>(API.Category2_URL + category1Id);

export const reqC3 = (category2Id: number) =>
  request.get<never, CategoryData>(API.Category3_URL + category2Id);
