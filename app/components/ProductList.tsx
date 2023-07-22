import {useEffect, useState} from 'react';
import {Maybe} from 'graphql/jsutils/Maybe';
import {useFetcher} from '@remix-run/react';
import {Collection} from '@shopify/hydrogen/storefront-api-types';
import Product from './Product';
import styled from '@emotion/styled';
import Pagination from '@mui/material/Pagination';

interface Props {
  collection: Collection;
}

export default function ProductList({collection}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(collection.products.nodes || []);

  const fetcher = useFetcher();

  function fetchProducts(cursor: Maybe<string>) {
    fetcher.load(`?index&cursor=${cursor}`);
  }

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }

    const {collection} = fetcher.data;

    setProducts([...collection.products.nodes]);
  }, [fetcher.data]);

  const click = (_: React.ChangeEvent<unknown>, page: number): void => {
    const isNextPage = page > currentPage;

    if (isNextPage) {
      fetchProducts(collection.products.pageInfo.endCursor);
    } else {
      fetchProducts(collection.products.pageInfo.startCursor);
    }

    setCurrentPage(page);
  };

  return (
    <section>
      <ProductSection>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductSection>
      <StyledPagination
        count={2}
        page={currentPage}
        color="primary"
        onChange={click}
      />
    </section>
  );
}

const ProductSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  & > ul > li > button {
    color: white;
  }
`;
