const axios = require("axios");
const isIPv4 = require("../../helpers");

const instance = axios.create({
  baseURL: "https://ipvigilante.com/",
  timeout: 15000,
});

/**
 * Makes a rest request to https://ipvigilante.com/{ip} and returns the results
 * @param {*} ip - Any public ipv4
 * @returns - { ipv4, continent_name, country_name, subdivision_1_name,
 *              subdivision_2_name, city_name, latitude, longitude }
 *
 */
const getLocation = async (ip) => {
  if (!isIPv4(ip)) throw new Error("Invalid ipv4 addresss");
  // eslint-disable-next-line no-useless-catch
  try {
    const {
      data: { data, status },
    } = await instance.get(`/${ip}`);

    if (status !== "success")
      throw new Error(`Could not lookup location info for ip address: ${ip}`);
    // console.log(data);
    return data;
  } catch (e) {
    // console.error(e);
    throw e;
  }
};
module.exports = getLocation;
