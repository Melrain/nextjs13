import React from 'react';

interface orderDetailsProps {
  params: {
    orderId: string;
  };
}

const orderDetails = ({ params }: orderDetailsProps) => {
  return <div>orderDetails:{params.orderId}</div>;
};

export default orderDetails;
