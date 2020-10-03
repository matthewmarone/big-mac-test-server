const axios = require("axios");

const instance = axios.create({
  baseURL: "https://ipvigilante.com/",
  timeout: 5000,
});

/**
 * TODO
 * @param {*} ip
 * 
 */
const getLocation = async (ip) => {
  try {
    const {
      data: { data, status },
    } = await instance.get(`/${ip}`);

    if (status !== "success")
      throw new Error(`Could not lookup location info for ip address: ${ip}`);
      
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
module.exports = getLocation;
