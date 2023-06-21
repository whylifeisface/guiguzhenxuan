// 分类相关数据类型

import { TradeMarkUpOrSaOrDel_Response } from "@/api/product/trademark/type.ts";

export interface ResponseData {
  message: string;
  code: number;
  ok: boolean;
}

//分类的ts类型
export interface CategoryObject {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

export interface CategoryData extends ResponseData {
  data: CategoryObject[];
}
//属性值  的对象的ts类型
export interface AttrValue {
  flag: boolean; //标记编辑模式true

  id?: number;
  valueName: string;
  attrId?: number;
}
//每一个属性值的数组类型
export type AttrValueList = AttrValue[];
//属性对象
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
  orId: string; // 用于拼接SkU
}
//属性对象的数组ts类型
export type AttrList = Attr[];
export interface AttrResponseData extends ResponseData {
  data: AttrList;
}
export type AttrUpdateOrAddResponse = TradeMarkUpOrSaOrDel_Response;
