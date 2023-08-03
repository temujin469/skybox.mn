import axios from 'axios'

export const otApi = axios.create({
    baseURL: 'http://otapi.net/service-json',
});

export const strapiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL + "/api",
});


