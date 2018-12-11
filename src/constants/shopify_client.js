import Client from "graphql-js-client";

// This is the generated type bundle from graphql-js-schema
import types from "./types";

const acessToken = "c00853c510a8221f272e03e862d884d7";
const storeUrl = "https://descubre-belleza.myshopify.com/api/graphql";

export const client = new Client(types, {
  url: storeUrl,
  fetcherOptions: {
    headers: {
      "X-Shopify-Storefront-Access-Token": acessToken
    }
  }
});
