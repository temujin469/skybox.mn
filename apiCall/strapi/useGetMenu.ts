import QueryString from "qs";
import { createQuery } from "react-query-kit";
import { strapiApi } from "~/utilities/axios";

type Response = {
  data?: {
    id: number;
    attributes: Menu;
  }[];
};

  const query = QueryString.stringify(
    {
      populate: {
        categories: {
          populate: {
            subCategories: true,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );


const useGetMenu = createQuery<Response>({
  primaryKey: "/menus",
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api${primaryKey}?${query}`;
      // const res = await fetch(url, {
      //   headers: { Accept: "*/*", "Content-Type": "application/json" },
      //   cache: "no-store",
      // });
      const res = await strapiApi.get(`${primaryKey}?${query}`);
      // return res.json();
      return res.data
    } catch (err) {
      console.log(err);
    }
  },
  // suspense: true,
});

export default useGetMenu;
