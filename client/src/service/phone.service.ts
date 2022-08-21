import httpServise from "./http.services";

const phonesEndpoint = "phone/";

const phonesService = {
  get: async () => {
    const { data } = await httpServise.get(phonesEndpoint);
    return data;
  },
};
export default phonesService;
