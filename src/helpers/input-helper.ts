import * as core from '@actions/core';
import { Args } from '@types';
import * as path from 'node:path';

import * as fsHelper from './fs-helper';
/* eslint-disable no-secrets/no-secrets */
export function getInputs(): Args {
  const obj = {} as unknown;
  const result = obj as Args;

  result.token = core.getInput('token') || process.env.GITHUB_TOKEN || '';
  result.failOnError = core.getBooleanInput('fail_on_error');
  result.listenForEvents = (core.getInput('listen_for_events') || '').split(',');

  // GitHub workspace
  let githubWorkspacePath = process.env.GITHUB_WORKSPACE;
  if (!githubWorkspacePath) {
    throw new Error('GITHUB_WORKSPACE not defined');
  }
  githubWorkspacePath = path.resolve(githubWorkspacePath);
  core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`);
  fsHelper.directoryExistsSync(githubWorkspacePath, true);

  return result;
}
/* eslint-enable no-secrets/no-secrets */
