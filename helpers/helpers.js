/**
 *
 * @param {*} ip a IPv4 string
 *
 * @returns true if the string is an ipv4 address
 */
const isIPv4 = (ip) => {
  if (ip && typeof ip === "string") {
    const [p1, p2, p3, p4, ...rest] = ip.split(".");
    return (
      rest.length === 0 &&
      isValidIPNumberRange(p1) &&
      isValidIPNumberRange(p2) &&
      isValidIPNumberRange(p3) &&
      isValidIPNumberRange(p4)
    );
  } else {
    return false;
  }
};

/**
 *
 * @param {*} numberStr - a number without any decimals
 *
 * @returns returns true if number is between 0 and 255
 */
const isValidIPNumberRange = (numberStr) => {
  const n = Number(numberStr);
  return Number.isInteger(n) && n >= 0 && n <= 255;
};

module.exports = isIPv4;
