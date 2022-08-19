import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersLoadingStatus, loadingAllOrdersList, loadingOrdersListUser } from "../../store/orders";
import { getCurrentUser } from "../../store/user";
import OrderList from "./orderList";

const OrderBoard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getOrdersLoadingStatus());
  const currentUser = useSelector(getCurrentUser());
  useEffect(() => {
    if (currentUser.isAdmin) {
      // @ts-ignore
      dispatch(loadingAllOrdersList());
    } else {
      // @ts-ignore
      dispatch(loadingOrdersListUser(currentUser._id));
    }
  }, []);

  return (
    <div
      className="px-24 py-12 text-gray-700 dark:text-gray-500 transition
			duration-500 ease-in-out flex flex-col "
    >
      <h2 className="text-4xl font-medium capitalize">Admin panel</h2>
      {!isLoading ? <OrderList /> : "Загрузка..."}
    </div>
  );
};

export default OrderBoard;
