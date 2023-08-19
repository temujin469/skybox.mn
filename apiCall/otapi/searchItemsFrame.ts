import xmljs from "xml2js";

const key = process.env.NEXT_PUBLIC_INSTANCE_KEY;

type Response = {
  Result?: {
    Items?: {
      Content?: ProductInfo[];
      TotalCount: number;
    };
    CurrentFrameSize: number;
    MaximumPageCount: number;
  };
};

type Variables = {
  filters?: Partial<ProductFilter>;
  start: number;
  limit: number;
};

const searchItemsFrame  = async (variables:Variables)=>{
  const builder = new xmljs.Builder();
  const filters = variables.filters;
  const xml = builder.buildObject({
    SearchItemsParameters: {
      MinPrice: filters?.MinPrice || undefined,
      MaxPrice: filters?.MaxPrice || undefined,
      CategoryId: filters?.CategoryId || undefined,
      BrandId: filters?.BrandId || undefined,
      OrderBy: filters?.OrderBy || undefined,
      ItemTitle: filters?.ItemTitle || undefined,
    },
  });
  try {
    const uri = `https://otapi.net/service-json/SearchItemsFrame?instanceKey=${key}&xmlParameters=${xml}&framePosition=${variables.start}&frameSize=${variables.limit}`;
    const encoded = encodeURI(uri);
    const res = await fetch(encoded);
   const data:Response = await res.json();
   return data;
  } catch (err) {
    console.log(err);
  }
}

export default searchItemsFrame;
