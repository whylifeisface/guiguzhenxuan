import { request } from "@/utils/request.ts";
import {
  AttrResponseData,
  AttrUpdateOrAddResponse,
  CategoryData,
} from "@/api/product/attr/type.ts";
enum API {
  Category1_URL = "/admin/product/getCategory1",
  Category2_URL = "/admin/product/getCategory2/",
  Category3_URL = "/admin/product/getCategory3/",
  //获取分类下已有的属性和属性值
  ATTR_URL = "/admin/product/attrInfoList/",
  // 添加或者修改Attr
  UPDATE_OR_ADD_URL = "/admin/product/saveAttrInfo",
  //删除已有属性
  DELETEATTR_URL = "/admin/product/deleteAttr/",
}
//获取一级分类的接口方法
export const reqC1 = () => request.get<never, CategoryData>(API.Category1_URL);
//获取二级分类的接口方法
export const reqC2 = (category1Id: number) =>
  request.get<never, CategoryData>(API.Category2_URL + category1Id);

export const reqC3 = (category2Id: number) =>
  request.get<never, CategoryData>(API.Category3_URL + category2Id);
export const reqAttr = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) =>
  request.get<never, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  );

export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<never, AttrUpdateOrAddResponse>(API.UPDATE_OR_ADD_URL, data);
//shang chu 某一个已有的属性
export const reqRemoveAttr = (category3Id: number) =>
  request.delete<never, any>(API.DELETEATTR_URL + category3Id);
