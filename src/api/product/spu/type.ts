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
  spuName: number | string; //为什么是number
  description: string;
  category3Id: number | string;
  tmId: number; //品牌ID
  spuSaleAttrList: null | SaleAttrs[];
  spuImageList: null | SpuImage[];
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
  id?: number; //save need
  imgName?: string; //save need
  creatTime?: string;
  updateTime?: string;
  spuId?: number; // save need
  name?: string;
  url?: string;
  imgUrl?: string; //save need
}

//定义已有的SPU照片墙数据类型
export interface SpuHasImage extends ResponseData {
  data: SpuImage[];
}
export interface defaultResponse extends ResponseData {
  data: null;
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  creatTime?: string;
  updateTime?: string;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked?: null;
}

export type SaleAttrValueList = SaleAttrValue[];

//销售属性对象ts类型

export interface SaleAttrs {
  inputText?: string;
  id?: number; // need
  creatTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number; // need
  SaleAttrValueName?: string;
  spuSaleAttrValueList: SaleAttrValueList;
  saleAttrName?: string; // ? need
}
//SPU已有的销售属性接口返回的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttrs[];
}

//已有的全部的SPU返回数据ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
