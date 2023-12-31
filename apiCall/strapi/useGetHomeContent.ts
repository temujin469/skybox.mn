import QueryString from "qs";
import { createQuery } from "react-query-kit";



type Response = {
  data: {
    id: number;
    attributes: HomeContent;
  };
};



const query = QueryString.stringify(
  {
    populate: {
      banner: {
        populate: {
          banner_main: true,
          banner_1: true,
          banner_2: true,
        },
      },
      promotion_section: {
        populate: {
          promotions: {
            populate: {
              image: true,
            },
          },
        },
      },
      featured_categories: {
        populate: {
          image: true,
        },
      },
      featured_products: true,
      productCollections:{
        populate:{
          products:true
        }
      }
    },
  },
  { encodeValuesOnly: true }
);



const useGetHomeContent = createQuery<Response>({
  primaryKey: "/home",
  queryFn: async ({ queryKey: [primaryKey] }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api${primaryKey}?${query}`;
      const res = await fetch(url, {
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        // cache: "no-store",
      });
      // const res = await strapiApi.get(`${primaryKey}?${query}`);
      return res.json();
      // return res.data;
    } catch (err) {
      console.log(err);
    }
  },
});

export default useGetHomeContent;
