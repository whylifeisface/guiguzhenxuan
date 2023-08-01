import { ResponseData } from "@/api/type";

export interface skuRecord {
  id: number;
  spuId: number;
  price: number;
  skuName: string;
  skuDesc: string;
  weight: string;
  tmId: number;
  category3Id: number;
  skuDefaultImg: string;
  isSale: number;
  createTime: string;
  skuImageList: null;
  skuAttrValueList: null;
  skuSaleAttrValueList: null;
}
export interface HasSKuResponseData extends ResponseData {
  data: {
    records: skuRecord[];
    total: number;
    size: number;
    current: number;
    searchCount: true;
    pages: number;
  };
}
