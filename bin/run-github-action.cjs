#!/usr/bin/env node

// require = require('esm')(module /*, options*/);
process.env['INPUT_FAIL_ON_ERROR'] = process.env['INPUT_FAIL_ON_ERROR'] ?? 'true';
process.env['INPUT_LISTEN_FOR_EVENTS'] = process.env['INPUT_LISTEN_FOR_EVENTS'] ?? 'any';
process.env['INPUT_TOKEN'] = process.env['INPUT_TOKEN'] ?? process.env['GITHUB_TOKEN'];
process.env['GITHUB_WORKSPACE'] = process.env['GITHUB_WORKSPACE'] ?? process.env['PWD'];
import('../lib/main.js');
