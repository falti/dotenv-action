test('test runs with custom path', () => {
    const dotenv_action = require('./dotenv_action');
    expect(dotenv_action("fixtures/.env")).toEqual({ fixtures_1: "123" });
})

test('test runs with different path', () => {
    const dotenv_action = require('./dotenv_action');
    expect(dotenv_action("fixtures/.another.env")).toEqual({ fixtures_2: "xyz", "other_key": "this" });
})

test('test runs with broken path', () => {
    const dotenv_action = require('./dotenv_action');
    expect(() => { dotenv_action("nosuchfile")}).toThrow(Error);
})

test('test runs with expanded values', () => {
    const dotenv_action = require('./dotenv_action');
    expect(dotenv_action("fixtures/.expand.env")).toEqual({ fixtures_3: "xyz", "expanded": "123-xyz", "expanded_2": "123-xyz" });
})