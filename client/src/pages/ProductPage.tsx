import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import СolorСircles from "../components/common/colorСircles";
import { getPhonesLoadingStatus, loadingPhonesList } from "../store/phones";

import PhoneInfoBoard from "../components/ui/phoneInfoBoar";

const ProductPage = () => {
  const isLoading = useSelector(getPhonesLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(loadingPhonesList());
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-9 mx-auto">{isLoading ? "Loading" : <PhoneInfoBoard />}</div>
      </section>
    </>
  );
};

export default ProductPage;
