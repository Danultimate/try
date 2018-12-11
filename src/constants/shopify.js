import Shopify from "shopify-buy";

const acessToken = "c00853c510a8221f272e03e862d884d7";
const storeName = "descubre-belleza.myshopify.com";

export default Shopify.buildClient({
    domain: storeName,
    storefrontAccessToken: acessToken
});