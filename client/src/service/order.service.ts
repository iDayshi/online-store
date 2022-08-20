import httpServise from "./http.services";

const orderEndpoint = "order/";

const orderService = {
  createOrder: async (payload) => {
    const { data } = await httpServise.post(orderEndpoint, payload);
    return data;
  },
  getOrdersUser: async (userId: string) => {
    const { data } = await httpServise.get(orderEndpoint, {
      params: {
        equalTo: `${userId}`,
      },
    });
    return data;
  },
  getAllOrders: async () => {
    const { data } = await httpServise.get(orderEndpoint);
    return data;
  },
  removeOrder: async (orederId: string) => {
    const { data } = await httpServise.delete(orderEndpoint + orederId);
    return data;
  },
  updateOrder: async (orederId: string) => {
    const { data } = await httpServise.patch(orderEndpoint + orederId);
    return data;
  },
};
export default orderService;
