const { it, expect } = require("@jest/globals");

const dotenvAction = require("./dotenv_action");

it("fails when path does not exist and 'ensure-exists' is 'true'", () => {
  expect(() =>
    dotenvAction({
      path: "nosuchfile",
      ensureExists: true,
    }),
  ).toThrow(Error);
});

it("runs when path does not exist and 'ensure-exists' is 'false'", () => {
  const actual = dotenvAction({
    path: "nosuchfile",
    ensureExists: false,
  });

  expect(actual).toEqual({});
});

it("runs with custom path", () => {
  const actual = dotenvAction({
    path: "fixtures/.env",
  });

  expect(actual).toEqual({
    fixtures_1: "123",
  });
});

it("runs with another custom path", () => {
  const actual = dotenvAction({
    path: "fixtures/.another.env",
  });

  expect(actual).toEqual({
    fixtures_2: "xyz",
    other_key: "this",
  });
});

it("runs with expanded values", () => {
  const actual = dotenvAction({
    path: "fixtures/.expand.env",
  });

  expect(actual).toEqual({
    fixtures_3: "xyz",
    expanded: "123-xyz",
    expanded_2: "123-xyz",
  });
});

it("runs with bypass case for keys", () => {
  const actual = dotenvAction({
    path: "fixtures/.case.env",
    keysCase: "bypass",
  });

  expect(actual).toEqual({
    FIXTURES_4: "foo",
    fixtures_5: "bar",
    Fixtures_6: "abc",
  });
});

it("runs with lower case for keys", () => {
  const actual = dotenvAction({
    path: "fixtures/.case.env",
    keysCase: "lower",
  });

  expect(actual).toEqual({
    fixtures_4: "foo",
    fixtures_5: "bar",
    fixtures_6: "abc",
  });
});

it("runs with upper case for keys", () => {
  const actual = dotenvAction({
    path: "fixtures/.case.env",
    keysCase: "upper",
  });

  expect(actual).toEqual({
    FIXTURES_4: "foo",
    FIXTURES_5: "bar",
    FIXTURES_6: "abc",
  });
});
