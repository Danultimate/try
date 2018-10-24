import Shopify from "shopify-buy";
const acessToken = "c00853c510a8221f272e03e862d884d7";
const storeName = "descubre-belleza.myshopify.com";


export function shopify() {
    const shopify = Shopify.buildClient({
    domain: storeName,
    storefrontAccessToken: acessToken
    });
    return shopify;
}

export function getSharableCollections() {
    const shopify = Shopify.buildClient({
        domain: storeName,
        storefrontAccessToken: acessToken
        });
    return shopify.collection.fetchAll()
}