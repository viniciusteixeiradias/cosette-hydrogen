const SNOW_BOARD_COLLECTION_ID = 'gid://shopify/Collection/452209738006';
const QUANTITY_FOR_PAGE = 10;

const GET_SNOW_BOARD_COLLECTION = `#graphql
query CollectionDetails($cursor: String) {
  collection(id: "${SNOW_BOARD_COLLECTION_ID}") {
    title
    products(first: ${QUANTITY_FOR_PAGE}, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        publishedAt
        handle
        vendor
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}
`;

export {GET_SNOW_BOARD_COLLECTION};
