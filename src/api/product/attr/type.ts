// 分类相关数据类型

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
