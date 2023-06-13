import { ResponseData } from "@/api/type.ts";

//product 的类型
export interface ResponseProduct extends ResponseData {
  data: ProductData;
}

interface ProductData {
  total: number;
  records: Records;
  size: number;
  searchCount: boolean;
  pages: number;
  current: number;
}
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}
//全部品牌数据
export type Records = TradeMark[];

export interface TradeMarkUpOrSaOrDel_Response extends ResponseData {
  data: null;
}
