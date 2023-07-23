import {useEffect, useState} from 'react';
import {Maybe} from 'graphql/jsutils/Maybe';
import {useFetcher} from '@remix-run/react';
import {Collection} from '@shopify/hydrogen/storefront-api-types';
import Product from './Product';
import styled from '@emotion/styled';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  collection: Collection;
}

export default function ProductList({collection}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(collection.products.nodes || []);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = useFetcher();

  async function fetchProducts(cursor: Maybe<string>) {
    setIsLoading(true);
    fetcher.load(`?index&cursor=${cursor}`);
  }

  useEffect(() => {
    try {
      if (!fetcher.data) {
        return;
      }

      const {collection} = fetcher.data;

      setProducts([...collection.products.nodes]);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher.data]);

  const click = (_: React.ChangeEvent<unknown>, page: number): void => {
    const shouldGoToNextPage = page > currentPage;

    if (shouldGoToNextPage) {
      fetchProducts(collection.products.pageInfo.endCursor);
    } else {
      fetchProducts(collection.products.pageInfo.startCursor);
    }

    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    );
  }

  return (
    <>
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
    </>
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
  margin-block: 15px;

  & > ul > li > button {
    color: white;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
