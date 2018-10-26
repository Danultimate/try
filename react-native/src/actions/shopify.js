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


/**
  * Fetch Collections from Shopify API
  */
export function getSharableCollections() {
    const shopify = Shopify.buildClient({
        domain: storeName,
        storefrontAccessToken: acessToken
    });

    //Fill the query fields
    const collectionQuery = {
        first: 3,
        reverse: true
      };
      
    return shopify.collection
        .fetchQuery(collectionQuery)
        .then(collections => {
            console.log('hey si entra a collectrions')
            console.log(collections.length);
        //   this.setState({
        //     isLoading: false,
        //     collections: collections
        //   });
            return collections;
        })
        .catch(error => {
            // this.setState({ error, isLoading: false })
            console.log('Error @fetching collections')
            console.log(error)
            return [];
        });
  
    // const productQuery = {
    //     first: 5,
    //     query: "tag:['halloween']"
    //   };
    //   shopify.product
    //     .fetchQuery(productQuery)
    //     .then(res => {
    //       //console.log(res);
    //       this.setState({
    //         products: res
    //       });
    //     })
    //     .catch(error => this.setState({ error, isLoading: false }));
}