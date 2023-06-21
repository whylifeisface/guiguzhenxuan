import { request } from "@/utils/request.ts";
import {
  AllTradeMarkResponseData,
  defaultResponse,
  HasSaleAttrResponseData,
  HasSpuResponseDate,
  SaleAttrResponseData,
  SkuData,
  SkuInfoResponseData,
  SpuData,
  SpuHasImage,
} from "@/api/product/spu/type.ts";
// import { TradeMarkUpOrSaOrDel_Response } from "@/api/product/trademark/type.ts";
enum API {
  HASSPU_URL = "/admin/product/",
  ALL_TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList", //获取全部品牌数据
  //获取某一个SPU下面全部的照片的数据
  Image_URL = "/admin/product/spuImageList/",
  //获取某一个SPU下面的已有的销售属性地址
  SPU_HAS_SALE_ATTR = "/admin/product/spuSaleAttrList/",
  //获取整个项目全部的销售属性 最多三个
  ALL_SALE_ATTR_URL = "/admin/product/baseSaleAttrList",
  //追加一个新的SPU
  ADD_SPU_URL = "/admin/product/saveSpuInfo",
  // 更新已有SPU
  UPDATE_SPU_URL = "/admin/product/saveSpuInfo",
  SPU_SAVE_URL = "/admin/product/saveSkuInfo",
  //获取SKU的table列表信息
  SPU_TABLE_INFO_URL = "/admin/product/findBySpuId/",
  //删除
  DELETE_URL = "/admin/product/deleteSpu/",
}

export const reqHasSpu = (
  pageNum: number,
  pageSize: number,
  category3Id: number,
) =>
  request.get<never, HasSpuResponseDate>(
    API.HASSPU_URL + `${pageNum}/${pageSize}?category3Id=${category3Id}`,
  );
//获取全部SPU的品牌的数据
export const reqAllTradeMark = () =>
  request.get<never, AllTradeMarkResponseData>(API.ALL_TRADEMARK_URL);

export const reqSpuImageList = (id: number) =>
  request.get<never, SpuHasImage>(API.Image_URL + `${id}`);

export const reqSpuHasSaleAttr = (id: number) =>
  request.get<never, SaleAttrResponseData>(API.SPU_HAS_SALE_ATTR + id);

//获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<never, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL);

//添加一个新的SPU
//修改一个已有SPU
//response data = null
export const reqAddOrUpdateSpu = (spu: SpuData) => {
  if (spu.id) return request.post<never, defaultResponse>(API.ADD_SPU_URL, spu);
  else return request.post<never, defaultResponse>(API.UPDATE_SPU_URL, spu);
};

export const reqSkuDataSave = (sku: SkuData) => {
  return request.post<never, defaultResponse>(API.SPU_SAVE_URL, sku);
};

export const reqSkuInfo = (skuId: number) => {
  return request.get<never, SkuInfoResponseData>(
    API.SPU_TABLE_INFO_URL + skuId,
  );
};

export const reqDelete = (skuId: number) => {
  return request.delete<never, defaultResponse>(API.DELETE_URL + skuId);
};
