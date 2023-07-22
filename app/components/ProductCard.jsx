import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductCard({product}) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div>
        <div>
          {isDiscounted && <p>Sale</p>}
          <Image data={product.variants.nodes[0].image} alt={product.title} />
        </div>
        <div>
          <h3>{product.title}</h3>
          <div>
            <span>{product.vendor}</span>
          </div>
          <div>
            <span>
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money withoutTrailingZeros data={compareAtPrice} />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
