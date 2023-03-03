test("test runs with custom path", () => {
  const dotenv_action = require("./dotenv_action");
  expect(dotenv_action("fixtures/.env")).toEqual({ fixtures_1: "123" });
});

test("test runs with different path", () => {
  const dotenv_action = require("./dotenv_action");
  expect(dotenv_action("fixtures/.another.env")).toEqual({
    fixtures_2: "xyz",
    other_key: "this",
  });
});

test("test runs with broken path", () => {
  const dotenv_action = require("./dotenv_action");
  expect(() => {
    dotenv_action("nosuchfile");
  }).toThrow(Error);
});

test("test runs with expanded values", () => {
  const dotenv_action = require("./dotenv_action");
  expect(dotenv_action("fixtures/.expand.env")).toEqual({
    fixtures_3: "xyz",
    expanded: "123-xyz",
    expanded_2: "123-xyz",
  });
});

test("test runs with bypass case for keys", () => {
  const dotenv_action = require("./dotenv_action");
  expect(dotenv_action("fixtures/.case.env", "bypass")).toEqual({
    FIXTURES_4: "foo",
    fixtures_5: "bar",
    Fixtures_6: "abc",
  });
});

test("test runs with lower case for keys", () => {
  const dotenv_action = require("./dotenv_action");
  expect(dotenv_action("fixtures/.case.env", "lower")).toEqual({
    fixtures_4: "foo",
    fixtures_5: "bar",
    fixtures_6: "abc",
  });
});

test("test runs with upper case for keys", () => {
  const dotenv_action = require("./dotenv_action");
  expect(dotenv_action("fixtures/.case.env", "upper")).toEqual({
    FIXTURES_4: "foo",
    FIXTURES_5: "bar",
    FIXTURES_6: "abc",
  });
});
