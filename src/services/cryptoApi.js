import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCryptos: build.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: build.query({
      query: () => createRequest("/exchanges"),
    }),
    getCryptoDetails: build.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: build.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
} = cryptoApi;
