/**
 * @jest-environment node
 */

const isIPv4 = require("../helpers");

it("is an IPv4 ('255.80.0.8')", () =>
  expect(isIPv4("255.80.0.8")).toBeTruthy());
it("Not an IPv4 (null)", () => expect(isIPv4(null)).toBeFalsy());
it("Not an IPv4 ()", () => expect(isIPv4()).toBeFalsy());
it("Not an IPv4 ('8.8.8')", () => expect(isIPv4("8.8.8")).toBeFalsy());
it("Not an IPv4 ('2001:0db8:85a3:0000:0000:8a2e:0370:7334')", () =>
  expect(isIPv4("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBeFalsy());
it("Not an IPv4 ('192.168.1.256')", () =>
  expect(isIPv4("192.168.1.256")).toBeFalsy());
it("Not an IPv4 ('192.168.1.-1')", () =>
  expect(isIPv4("192.168.1.-1")).toBeFalsy());
