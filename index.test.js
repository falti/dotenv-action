test('test runs with default path', () => {
    const dotenv_action = require('./dotenv_action');
    expect(dotenv_action(".env")).toEqual({abc: "123"});
})

test('test runs with custom path', () => {
    const dotenv_action = require('./dotenv_action');
    expect(dotenv_action("fixtures/.env")).toEqual({ fixtures_1: "123" });
})

test('test runs with broken path', () => {
    const dotenv_action = require('./dotenv_action');
    expect(() => { dotenv_action("nosuchfile")}).toThrow(Error);
})