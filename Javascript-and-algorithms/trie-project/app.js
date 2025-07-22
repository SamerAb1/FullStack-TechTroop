#!/usr/bin/env node
const readline = require('node:readline');
const { handleCommand, printUsage } = require('./commandHandler');

console.log('=== AutoComplete Trie Console ===');
console.log("Type 'help' for commands\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
rl.prompt();

rl.on('line', line => {
  const [cmd, ...args] = line.trim().split(/\s+/);
  if (!cmd) { rl.prompt(); return; }
  handleCommand(cmd, args);
  rl.prompt();
});
