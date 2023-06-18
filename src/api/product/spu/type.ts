//服务器全部接口返回的的数据类型
import { ResponseData } from "@/api/type.ts";

export interface spuImageType {
  id: number;
  imgName: string;
  imgUrl: string;
  spuId: number;
}

export interface spuSaleAttrValueType {
  baseSaleAttrId: number;
  id: number;
  isChecked: string;
  saleAttrName: string;
  saleAttrValueName: string;
  spuId: number;
}
export interface spuSaleAttrType {
  baseSaleAttrId: number;
  id: number;
  spuSaleAttrValueList: spuSaleAttrValueType[];
}
export interface SpuData {
  id?: number;
  spuName: number;
  description: string;
  category3Id: number | string;
  tmId: number; //品牌ID
  spuSaleAttrList: null | spuSaleAttrType[];
  spuImageList: null | spuImageType[];
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

//品牌数据类型
export interface TradeMark {
  id: number;
  tmName: string;
  logoUrl: string;
}
export interface AllTradeMarkResponseData extends ResponseData {
  data: TradeMark[];
}
//商品图片的ts类型
export interface SpuImage {
  id?: number;
  imgName?: string;
  creatTime?: string;
  updateTime?: string;
  spuId?: number;
  name?: string;
  url?: string;
  imageUrl?: string;
}

//定义已有的SPU照片墙数据类型
export interface SpuHasImage extends ResponseData {
  data: SpuImage[];
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  creatTime: string;
  updateTime: string;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked: null;
}

export type SaleAttrValueList = SaleAttrValue[];

//销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  creatTime: string;
  updateTime: string;
  spuId: number;
  baseSaleAttrId: number;
  SaleAttrValueName: string;
  spuSaleAttrValueList: SaleAttrValueList;
}
//SPU已有的销售属性接口返回的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

//已有的全部的SPU返回数据ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData{
  data: HasSaleAttr[];
}
