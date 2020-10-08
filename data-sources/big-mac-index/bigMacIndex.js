var fs = require("fs").promises;
const path = require("path");
// File must be grouped by Country, and sorted by date descending
const relFilePath = "./data-set/big-mac-index.csv";
const fileEncoding = "utf8";
const endOfLine = "\r\n";

/**
 * Stores the big-max-index.csv as a map in memory and provides methods
 * for conveniently and quickly looks up specific data.
 */
class BigMacIndex {
  constructor(filePath, encoding) {
    this.filePath = filePath;
    this.encoding = encoding;
    this.dataMap = null; // Loads first time it is needed
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
   * @param {*} countryFilterArray - any countries to exlude from the big-mac-index.csv
   * @param {*} entryLimit - how far back in time you want to go, using 1 returns only the latest index for each country
   */
  async getIndex(countryFilterArray, entryLimit = Number.MAX_SAFE_INTEGER) {
    if (countryFilterArray && !Array.isArray(countryFilterArray))
      throw new Error("Expected array for countryFilterArray");

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
   * @returns an array set of each country supported in big-mac-index.csv
   */
  async getCountries() {
    const data = await this.getDataMap();
    const retVal = [];
    for (const k of data.keys()) retVal[retVal.length] = k;
    return retVal;
  }

  // Private getter for the in-memory map that is created after big-mac-index.csv
  // is read into memory
  async getDataMap() {
    return this.dataMap || (await this.lazyLoadData());
  }

  // Private method to instantiate dataMap
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

module.exports = instance;
