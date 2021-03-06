# Big Mac Test - Server

Severing up your Big Mac Pricing needs.

Jump to:

- [About the App](#about)
- [Writing a Client](#writing-an-efficient-client)
- [Install and Run](#install-and-run)
- [Available Scripts](#available-scripts)

The following server was built with Node and uses [Apollo Server](https://www.apollographql.com/docs/apollo-server/), an industry leading GraphQl web server. The test client for this server can be found [here](https://github.com/matthewmarone/bigmac-client).

## About the Server

The server provides a GraphQL API to request **_Location_** information by pubic ipv4 (ip-vigilante) and **_Big Mac Pricing_** (big-mac-index.csv).

The API defines four queries:

1. getLocation(ipv4: String!)
   - Essentially, ip-vigilante wrapped in GraphQL
2. listLatestBigMacIndex
   - Returns the entire contents of big-mac-index.csv, but filtered on date, returning only the most recent/latest index.
3. getLatestBigMacIndex(country: String!)
   - The same as listLatestBigMacIndex, but for a single country
4. listSupportedCountries
   - Returns a list of every country in the big-mac-index.csv

#### Writing an Efficient Client

A properly written client, with a persisted cache, would only need to request **getLocation** and **listLatestBigMacIndex** just one time. The client would then have enough data to run its calculations.

However, it could be advantageous on that first visit to make asynchronous calls to the smaller queries until the cache has been fully hydrated.

This example [client](https://github.com/matthewmarone/bigmac-client) follows the above suggested design.

## Install and Run

```
git clone https://github.com/matthewmarone/big-mac-test-server
npm install
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Launches the server at [http://localhost:4000](http://localhost:4000). There is a web GUI that could be fun to check out.

### `npm test`

Launches a test server and runs all tests.
