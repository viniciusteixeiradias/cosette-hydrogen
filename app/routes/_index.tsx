import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {GET_SNOW_BOARD_COLLECTION} from '../querys/snow-board-collection';
import styled from '@emotion/styled';
import ProductList from '../components/ProductList';

interface Props {
  context: any;
  request: any;
}

export async function loader({context, request}: Props) {
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {collection} = await context.storefront.query(
    GET_SNOW_BOARD_COLLECTION,
    {
      variables: {
        cursor,
      },
    },
  );

  if (!collection) {
    throw new Response(null, {status: 404});
  }

  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <Section>
      <CategoryName>{collection.title}</CategoryName>
      <ProductList collection={collection} />
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 3rem;
  min-width: 1180px;
`;

const CategoryName = styled.span`
  font-size: 1.5rem;
`;
