//服务器全部接口返回的的数据类型
import { ResponseData } from "@/api/type.ts";

export interface SpuData {
  id?: number;
  spuName: number;
  description: string;
  category3Id: number | string;
  tmId: number; //品牌ID
  spuSaleAttrList: null;
  spuImageList: null;
}
//数组包含元素都是SPU数据类型
export type Records = SpuData[];
export interface HasSpuResponseDate extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
