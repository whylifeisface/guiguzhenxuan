import { request } from "@/utils/request.ts";
import {
  AllTradeMarkResponseData,
  HasSaleAttrResponseData,
  HasSpuResponseDate,
  SaleAttrResponseData,
  SpuData,
  SpuHasImage,
} from "@/api/product/spu/type.ts";
import { TradeMarkUpOrSaOrDel_Response } from "@/api/product/trademark/type.ts";
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
export const reqAddOrUpdateSpu = async (spu: SpuData) => {
  if (spu.id)
    await request.post<never, TradeMarkUpOrSaOrDel_Response>(
      API.ADD_SPU_URL,
      spu,
    );
  else
    await request.post<never, TradeMarkUpOrSaOrDel_Response>(
      API.UPDATE_SPU_URL,
      spu,
    );
};
