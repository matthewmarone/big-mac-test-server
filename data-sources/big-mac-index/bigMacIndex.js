var fs = require("fs").promises;
const path = require("path");
// File must be grouped by Country, and sorted by date descending
const relFilePath = "./data-set/big-mac-index.csv";
const fileEncoding = "utf8";
const endOfLine = "\r\n";

class BigMacIndex {
  constructor(filePath, encoding) {
    this.filePath = filePath;
    this.encoding = encoding;
    this.dataMap = null;
  }

  /**
   * Same as calling this.getIndex(null, 1)
   * @see this.getIndex(countryFilterArray, entryLimit)
   */
  async getLatestIndex() {
    return await this.getIndex(null, 1);
  }

  /**
   * Same as calling this.getIndex(countryFilterArray, 1)
   * @see this.getIndex(countryFilterArray, entryLimit)
   */
  async getLatestIndex(countryFilterArray) {
    return await this.getIndex(countryFilterArray, 1);
  }

  /**
   *
   * @param {*} countryFilterArray
   * @param {*} entryLimit
   */
  async getIndex(countryFilterArray, entryLimit = Number.MAX_SAFE_INTEGER) {
    const data = await this.getDataMap();
    const keys = countryFilterArray || data.keys();
    const retVal = {};
    for (const k of keys) {
      const value = data.get(k); // returns undefined if non existant
      if (value) {
        const targetArr = [];
        for (let i = 0; i < value.length && i < entryLimit; i++) {
          targetArr[targetArr.length] = { ...value[i] };
        }
        retVal[k] = targetArr;
      } else {
        retVal[k] = undefined;
      }
    }
    return retVal;
  }

  /**
   *
   */
  async getCountries() {
    const data = await this.getDataMap();
    const retVal = [];
    for (const k of data.keys()) retVal[retVal.length] = k;
    return retVal;
  }

  async getDataMap() {
    return this.dataMap || (await this.lazyLoadData());
  }

  async lazyLoadData() {
    try {
      const data = await fs.readFile(
        path.resolve(__dirname, this.filePath),
        fileEncoding
      );

      const lines = data.split(endOfLine);
      //   console.log(lines);

      const retVal = new Map();

      lines.forEach((ln, idx) => {
        if (idx > 0) {
          const [
            country,
            date,
            localPrice,
            dollarExchange,
            dollarPrice,
            dollarPPP,
            dollarValuation,
          ] = ln.split(",");

          // Get the existing mapped country array, or create and get a new one
          const countryData =
            retVal.get(country) || retVal.set(country, []).get(country);

          // Update the mapped array
          countryData[countryData.length] = {
            country,
            date,
            localPrice,
            dollarExchange,
            dollarPrice,
            dollarPPP,
            dollarValuation,
          };
        }
      });

      this.dataMap = retVal;
      return retVal;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Created for testing.  Prints the dataMap instance var.
   */
  async print() {
    const str = await this.getDataMap();
    console.log(str);
  }
}

const instance = new BigMacIndex(relFilePath, fileEncoding);
// const test = async () => {
//   //   await instance.print();
//   //   const countries = await instance.getCountries();
//   //   console.log(countries);
// //   const allDate = await instance.getIndex([],1);
//   const allDate = await instance.getLatestIndex();
//   console.log(JSON.stringify(allDate, null, "\t"));
// };

// test();

// /**
//  * Returns the entire index of Big Mac prices for each country
//  */
// const getFullIndex = async () => {};

module.exports = instance;
