import styled from '@emotion/styled';
import {Image, Money} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';

interface Props {
  product: Product;
}

export default function Product({product}: Props) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const hasDiscount = !!(
    compareAtPrice &&
    price &&
    Number(compareAtPrice.amount) > Number(price.amount)
  );

  const onClick = (): void => {
    alert('This feature will be availabe on the next version. Sorry 🥲');
  };

  return (
    <Section onClick={onClick}>
      <StyledImage
        data={product.variants.nodes[0].image || {}}
        alt={product.title}
        height={230}
        width={230}
      />
      <ProductDetails>
        <ProductName>{product.title}</ProductName>
        <VendorName>{product.vendor}</VendorName>

        <ProductPrice>
          <ProductCurrentPrice data={price} />
          {hasDiscount && (
            <ProductOldPriceContent>
              RRP: <ProductOldPrice data={compareAtPrice!} />
            </ProductOldPriceContent>
          )}
        </ProductPrice>
      </ProductDetails>
    </Section>
  );
}

const Section = styled.section`
  color: #dedbd7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid rgb(51, 55, 57);
  border-radius: 4px;
  padding: 2rem 1rem;
  height: 400px;
  width: 250px;

  &:hover {
    cursor: pointer;
    background-color: #262e37;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductName = styled.span`
  padding-block: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const VendorName = styled.span`
  padding-block: 1rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
`;

const ProductCurrentPrice = styled(Money)`
  font-weight: bold;
  font-size: 1.5rem;
`;

const ProductOldPriceContent = styled.div`
  display: flex;
  gap: 0.3rem;
  color: #b1aaa0;
`;

const ProductOldPrice = styled(Money)`
  color: #b1aaa0;
  font-size: 1rem;
  text-decoration: line-through;
`;
