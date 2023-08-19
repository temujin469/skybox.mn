import QueryString from "qs";
import { createQuery } from "react-query-kit";

type SiteConfiguration = {
  agreement: string;
  faqs: string;
  hemjeeRazmer:string
  privacy: string;
  aboutUs: {
    id: number;
    content: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
  contactUs: {
    location: string;
    email: string;
    phoneNumber: string;
    workingHours: string;
    facebook: string;
    instagram: string;
    googleMapSrc: string;
  };
};

type Response = {
  data: {
    id: number;
    attributes: SiteConfiguration;
  };
};

const query = QueryString.stringify(
  {
    populate: {
      aboutUs:{
        populate:{
          image:{
            fields:["url"]
          }
        }
      },
      contactUs:true
    },
  },
  { encodeValuesOnly: true }
);

const useSiteConfiguration = createQuery<Response>({
  primaryKey: "/site-configuretion",
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

export default useSiteConfiguration;
