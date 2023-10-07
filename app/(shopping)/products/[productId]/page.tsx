import React from 'react';

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetails = ({ params }: ProductDetailsProps) => {
  return <div>Details about the product:{params.productId}</div>;
};

export default ProductDetails;
