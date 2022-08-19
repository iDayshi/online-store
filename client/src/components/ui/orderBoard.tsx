import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getOrdersLoadingStatus, loadingAllOrdersList } from "../../store/orders";
import OrderList from "./orderList";

const OrderBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(loadingAllOrdersList());
  }, []);
  const isLoading = useSelector(getOrdersLoadingStatus());
  const allOrders = useSelector(getOrders());
  // onRemove={handleRemoveComment}

  return (
    <div
      className="px-24 py-12 text-gray-700 dark:text-gray-500 transition
			duration-500 ease-in-out"
    >
      <h2 className="text-4xl font-medium capitalize">Admin panel</h2>
      {!isLoading ? <OrderList orders={allOrders} /> : "Загрузка..."}
    </div>
  );
};

export default OrderBoard;
