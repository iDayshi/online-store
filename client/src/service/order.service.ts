import httpServise from "./http.services";
import localStorageService from "./localStorage.service";

const orderEndpoint = "order/";

const orderService = {
  createOrder: async (payload) => {
    const { data } = await httpServise.post(orderEndpoint, payload);
    return data;
  },
  getOrdersUser: async (pageId) => {
    const { data } = await httpServise.get(orderEndpoint, {
      params: {
        orderBy: "pageId",
        equalTo: `${pageId}`,
      },
    });
    return data;
  },
  getAllOrders: async () => {
    const { data } = await httpServise.get(orderEndpoint);
    return data;
  },
  removeOrder: async (orederId) => {
    const { data } = await httpServise.delete(orderEndpoint + orederId);
    return data;
  },
  updateOrder: async (payload) => {
    const { data } = await httpServise.patch(orderEndpoint + localStorageService.getUserId(), payload);
    return data;
  },
};
export default orderService;
