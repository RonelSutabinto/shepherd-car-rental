"use client"
import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentMethodId = urlParams.get('payment_method_id');

    if (paymentMethodId) {
      console.log('Payment Method ID:', paymentMethodId);
    } else {
      console.log('Payment method ID not found in the URL.');
    }
  }, []);

  return (
    <>
    <h1 className=' m-5 mt-36 text-[28px] text-secondary-blue font-bold'>
        Booking a car was successfully completed.
    </h1>
    </>
  )
};

export default Page;