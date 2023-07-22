import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import ProductGrid from '../components/ProductGrid';

const seo = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export async function loader({params, context, request}) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  });
}

export function meta({data}) {
  return [
    {title: data?.collection?.title ?? 'Collection'},
    {description: data?.collection?.description},
  ];
}

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <>
      <header>
        <h1>{collection.title}</h1>

        {collection.description && (
          <div>
            <div>
              <p>{collection.description}</p>
            </div>
          </div>
        )}
      </header>
      <ProductGrid
        collection={collection}
        url={`/collections/${collection.handle}`}
      />
    </>
  );
}
// Image, Vendor, Title, Price and Compare at price.
const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 4, after: $cursor) {
        pageInfo {
          hasNextPage
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
