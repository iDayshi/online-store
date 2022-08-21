import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder, updateOrder } from "../../store/orders";
import { toast } from "react-toastify";

const OrderList = (administrator: { isAdmin: string }) => {
  const { isAdmin } = administrator;
  const dispath = useDispatch();
  const orders = useSelector(getOrders());

  const handleConfirmOrder = (id) => {
    // @ts-ignore
    dispath(updateOrder(id));
  };

  const handleRemoveOrder = (id) => {
    // @ts-ignore
    dispath(deleteOrder(id));
  };

  const handleEditOrder = (id) => {
    // @ts-ignore
    toast.success("Дананя функуия находиться в разработке");
  };

  return (
    <>
      <div className="mt-1 mb-4 flex items-center justify-between  ">
        <span className="text-sm">
          Orders:
          <strong> {orders.length}</strong>
        </span>
      </div>
      {orders.map((order) => {
        return (
          <div key={order._id} className="flex flex-col mt-2">
            <div className="flex flex-row mt-2">
              <div
                className={`flex w-full items-center justify-between bg-white
						dark:bg-gray-800 px-8 py-6 border-4 ${order.confirm ? "border-green-600" : "border-red-600"} `}
              >
                <div className="flex">
                  <img className="h-12 w-12 rounded-full object-cover" src={order.userId.image} alt="infamous" />

                  <div className="flex flex-col ml-6">
                    <span className="text-lg font-bold">Order number: {order.orderId}</span>
                    <div className="mt-4 flex">
                      <div className="flex">
                        <svg
                          className="h-5 w-5 fill-current
											dark:text-gray-300"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 4a4 4 0 014 4 4 4 0 01-4 4
												4 4 0 01-4-4 4 4 0 014-4m0
												10c4.42 0 8 1.79 8
												4v2H4v-2c0-2.21 3.58-4 8-4z"
                          ></path>
                        </svg>
                        <span
                          className="ml-2 text-sm text-gray-600
											dark:text-gray-300 capitalize"
                        >
                          {order.userId.name}
                        </span>
                      </div>

                      <div className="flex ml-6">
                        <svg
                          className="h-5 w-5 fill-current
											dark:text-gray-300"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19
												19H5V8h14m-3-7v2H8V1H6v2H5c-1.11
												0-2 .89-2 2v14a2 2 0 002 2h14a2 2
												0 002-2V5a2 2 0 00-2-2h-1V1m-1
												11h-5v5h5v-5z"
                          ></path>
                        </svg>
                        <span
                          className="ml-2 text-sm text-gray-600
											dark:text-gray-300 capitalize"
                        >
                          Order date: {order.dateOrder}
                        </span>
                      </div>
                      <div className="flex ml-6">
                        <span
                          className={`ml-2 text-sm 
											 capitalize ${order.confirm ? "text-green-600" : "text-red-600"}`}
                        >
                          Confirm: {order.confirm.toString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex">
                      {isAdmin ? (
                        <button
                          onClick={() => handleConfirmOrder(order._id)}
                          className="flex items-center
										focus:outline-none border rounded-full
										py-2 px-6 leading-none border-green-500
										dark:border-green-600 select-none
										hover:bg-green-600 hover:text-white
										dark-hover:text-gray-200"
                        >
                          <span>Confirm</span>
                        </button>
                      ) : (
                        ""
                      )}

                      <button
                        onClick={() => handleRemoveOrder(order._id)}
                        className="flex items-center ml-4
										focus:outline-none border rounded-full
										py-2 px-6 leading-none border-red-500
										dark:border-red-600 select-none
										hover:bg-red-600 hover:text-white
										dark-hover:text-gray-200"
                      >
                        <span>Remove Order</span>
                      </button>

                      <button
                        onClick={handleEditOrder}
                        className="flex items-center ml-4
										focus:outline-none border rounded-full
										py-2 px-6 leading-none border-orange-500
										dark:border-orange-600 select-none
										hover:bg-orange-400 hover:text-white
										dark-hover:text-gray-200"
                      >
                        <svg
                          className="h-5 w-5 fill-current mr-2
											text-orange-600"
                          viewBox="0 0 576 512"
                        >
                          <path
                            d="M402.3 344.9l32-32c5-5
												13.7-1.5 13.7 5.7V464c0 26.5-21.5
												48-48 48H48c-26.5
												0-48-21.5-48-48V112c0-26.5
												21.5-48 48-48h273.5c7.1 0 10.7
												8.6 5.7 13.7l-32 32c-1.5 1.5-3.5
												2.3-5.7
												2.3H48v352h352V350.5c0-2.1.8-4.1
												2.3-5.6zm156.6-201.8L296.3
												405.7l-90.4 10c-26.2
												2.9-48.5-19.2-45.6-45.6l10-90.4L432.9
												17.1c22.9-22.9 59.9-22.9 82.7
												0l43.2 43.2c22.9 22.9 22.9 60 .1
												82.8zM460.1 174L402 115.9 216.2
												301.8l-7.3 65.3 65.3-7.3L460.1
												174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8
												0L436 82l58.1 58.1
												30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                          ></path>
                        </svg>
                        <span>Edit Order</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col py-1 sm:flex-row sm:justify-between p-2">
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <div className="flex flex-col justify-between w-full pl-6">
                          {order.itemsOrder.map((i) => {
                            return (
                              <div key={i._id} className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                  <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                    {i.brand + " " + i.name}
                                  </h3>
                                  <p className="text-sm dark:text-white">Count: {i.count}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg text-red-500 font-semibold">{i.price}$</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col -mt-10 mr-20">
                  <span
                    className="text-center text-2xl font-semibold text-green-500
								dark:text-green-300"
                  >
                    Total
                  </span>
                  <span
                    className=" text-center text-xl font-semibold text-green-500
								dark:text-green-300"
                  >
                    {order.itemsOrder.reduce((acc, i) => {
                      return acc + i.price * i.count;
                    }, 0)}
                    $
                  </span>
                  <span
                    className="text-lg text-green-700 dark:text-green-400
								mt-2"
                  >
                    Total count:{" "}
                    {order.itemsOrder.reduce((acc, i) => {
                      return acc + i.count;
                    }, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderList;
