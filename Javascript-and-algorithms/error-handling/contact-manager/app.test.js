// app.test.js
jest.mock('./commands/commandHandler');

const path = require('path');

// Delay requiring app.js until after mocks are set
const { handleCommand, printUsage } = require('./commands/commandHandler');

describe('app.js CLI entry', () => {
  const OLD_ARGV = process.argv;
  let logSpy, exitSpy;

  beforeEach(() => {
    jest.resetModules(); // Clears app.js require cache between tests
    process.argv = [...OLD_ARGV];
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    handleCommand.mockClear();
    printUsage.mockClear();
  });

  afterEach(() => {
    process.argv = OLD_ARGV;
    logSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it('prints error and usage and exits if no command provided', () => {
    process.argv = ['node', 'app.js']; // No command
    require('./app');
    expect(logSpy).toHaveBeenCalledWith('Error: No command provided');
    expect(printUsage).toHaveBeenCalledWith(true);
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(handleCommand).not.toHaveBeenCalled();
  });

  it('calls handleCommand with command and args', () => {
    process.argv = ['node', 'app.js', 'add', 'John', 'john@example.com', '555-1234'];
    require('./app');
    expect(handleCommand).toHaveBeenCalledWith(
      'add',
      ['John', 'john@example.com', '555-1234'],
      path.join(__dirname, 'contacts.json')
    );
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('calls handleCommand with correct params for search', () => {
    process.argv = ['node', 'app.js', 'search', 'John'];
    require('./app');
    expect(handleCommand).toHaveBeenCalledWith(
      'search',
      ['John'],
      path.join(__dirname, 'contacts.json')
    );
    expect(exitSpy).not.toHaveBeenCalled();
  });
});
