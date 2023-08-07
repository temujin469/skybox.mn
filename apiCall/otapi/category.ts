import { otApi, strapiApi } from "~/utilities/axios";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

export const getBriefCatalog = async () => {
    const res = await otApi.get(
        `/GetBriefCatalog?instanceKey=${key}`
    );
    return res.data;
};

export const getCategorySubcategoryInfoList = async (parentCatId:string) => {
    const res = await otApi.get(
      `/GetCategorySubcategoryInfoList?instanceKey=${key}&parentCategoryId=${parentCatId}`
    );
    return res.data;
};



export const FindCategoryItemSimpleInfoListFrame = async ({filter,start,limit}:{filter:ProductFilter,start:number,limit:number}) => {
  const res = await otApi.get(
    `/FindCategoryItemSimpleInfoListFrame?instanceKey=${key}&parentCategoryId=${filter}&categoryId=${filter.CategoryId}&categoryItemFilter=&framePosition=${start}&frameSize=${limit}`
  );
  return res.data;
};


