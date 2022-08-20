import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersLoadingStatus, loadingAllOrdersList, loadingOrdersListUser } from "../../store/orders";
import { getCurrentUser, getUsersLoadingStatus } from "../../store/user";
import OrderList from "./orderList";

const OrderBoard = () => {
  const dispatch = useDispatch();
  const isLoadingUsers = useSelector(getUsersLoadingStatus());
  const isLoadingOrder = useSelector(getOrdersLoadingStatus());
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => {
    if (!isLoadingUsers) {
      if (currentUser.isAdmin) {
        // @ts-ignore
        dispatch(loadingAllOrdersList());
      } else {
        // @ts-ignore
        dispatch(loadingOrdersListUser(currentUser._id));
      }
    }
  }, [isLoadingUsers]);

  return (
    <div
      className="px-24 py-12 text-gray-700 dark:text-gray-500 transition
			duration-500 ease-in-out flex flex-col "
    >
      <h2 className="text-4xl font-medium capitalize">
        {!isLoadingUsers && currentUser.isAdmin ? "Admin panel" : "Orders panel"}
      </h2>
      {!isLoadingOrder && !isLoadingUsers ? <OrderList isAdmin={currentUser.isAdmin} /> : "Загрузка..."}
    </div>
  );
};

export default OrderBoard;
