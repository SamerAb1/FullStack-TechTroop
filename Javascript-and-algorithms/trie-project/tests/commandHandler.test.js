/**
 * We test handleCommand’s observable behavior: what it logs.
 * We mock console.log / console.error and inspect calls.
 */
jest.mock('../autoCompleteTrie', () => {
  // Use the real implementation to keep behavior accurate.
  return jest.requireActual('../autoCompleteTrie');
});

const { handleCommand, printUsage } = require('../commandHandler');

describe('commandHandler', () => {
  let logSpy, errSpy, exitSpy;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('help prints usage', () => {
    handleCommand('help', []);
    expect(logSpy).toHaveBeenCalled();
    const joined = logSpy.mock.calls.flat().join('\n');
    expect(joined).toMatch(/Commands:/);
    expect(joined).toMatch(/add <word>/);
  });

  test('add -> find happy path', () => {
    handleCommand('add', ['cat']);
    expect(logSpy).toHaveBeenLastCalledWith("Added 'cat' to dictionary");

    handleCommand('find', ['cat']);
    expect(logSpy).toHaveBeenLastCalledWith("'cat' exists in dictionary");
  });

  test('find missing word', () => {
    handleCommand('find', ['dog']);
    expect(logSpy).toHaveBeenLastCalledWith("'dog' not found in dictionary");
  });

  test('complete prints suggestions', () => {
    handleCommand('add', ['car']);
    handleCommand('add', ['card']);
    handleCommand('complete', ['ca']);

    const call = logSpy.mock.calls.at(-1)[0];
    expect(call).toMatch(/Suggestions for 'ca':/);
    expect(call).toMatch(/car/);
    expect(call).toMatch(/card/);
  });

  test('validation errors', () => {
    handleCommand('add', ['123']);
    expect(errSpy).toHaveBeenCalledWith(expect.stringMatching(/Invalid word/));

    handleCommand('unknown', []);
    expect(errSpy).toHaveBeenCalledWith(expect.stringMatching(/Unknown command/));
  });

  test('exit command exits with code 0', () => {
    expect(() => handleCommand('exit', [])).toThrow('exit');
    expect(logSpy).toHaveBeenLastCalledWith('Goodbye!');
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});
