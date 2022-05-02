/* eslint-disable security/detect-object-injection */
import * as core from '@actions/core';
import * as github from '@actions/github';
import * as path from 'path';

import { Args } from '../src/@types';
import { RunAction } from '../src/RunAction';
import * as fsHelper from '../src/helpers/fs-helper';
import * as inputHelper from '../src/helpers/input-helper';

const gitHubWorkspace = path.resolve('/checkout-tests/workspace');

// Inputs for mock @actions/core
interface InputsInterface {
  [key: string]: string;
}
let inputs: InputsInterface = {} as InputsInterface;
let [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
// Shallow clone original @actions/github context
export const originalContext = { ...github.context };
export const originalGitHubWorkspace = process.env.GITHUB_WORKSPACE;

describe('GitHub Action Tests', () => {
  beforeAll(() => {
    jest.setTimeout(50000);
    // Mock getInput
    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      // eslint-disable-next-line security/detect-object-injection
      return inputs[name];
    });
    jest.spyOn(core, 'getBooleanInput').mockImplementation((name: string) => {
      const regMatTrue = /(true|True|TRUE)/;
      const regMatFalse = /(false|False|FALSE)/;
      if (regMatTrue.test(inputs[name] as string)) {
        return true;
      } else if (regMatFalse.test(inputs[name] as string)) {
        return false;
      }
      // eslint-disable-next-line security/detect-object-injection
      throw new Error(`
      TypeError: Input does not meet YAML 1.2 "Core Schema" specification: ${name}
      Support boolean input list: true | True | TRUE | false | False | FALSE
    `);
    });
    // Mock error/warning/info/debug
    jest.spyOn(core, 'error').mockImplementation(console.log);
    jest.spyOn(core, 'warning').mockImplementation(console.log);
    jest.spyOn(core, 'info').mockImplementation(console.log);
    jest.spyOn(core, 'debug').mockImplementation(console.log);
    jest.spyOn(core, 'notice').mockImplementation(console.log);

    // Mock github context
    jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
      return {
        owner: owner,
        repo: repo,
      };
    });

    github.context.ref = 'refs/heads/DVPS-331';
    github.context.sha = '1234567890123456789012345678901234567890';

    // Mock ./fs-helper directoryExistsSync()
    jest.spyOn(fsHelper, 'directoryExistsSync').mockImplementation((fspath: string) => fspath === gitHubWorkspace);

    // GitHub workspace
    process.env.GITHUB_WORKSPACE = gitHubWorkspace;
  });

  beforeEach(() => {
    // Reset inputs to defaults
    inputs = {};
    inputs.token = process.env.GITHUB_TOKEN ?? 'NO_TOKEN';
    inputs.fail_on_error = 'true';
    inputs.listen_for_events = 'any';
    // Add your inputs here
    // inputs.myInput = 'myInputValue';
    core.info(JSON.stringify(inputs));
  });
  afterAll(() => {
    // Restore GitHub workspace
    process.env.GITHUB_WORKSPACE = undefined;
    if (originalGitHubWorkspace) {
      process.env.GITHUB_WORKSPACE = originalGitHubWorkspace;
    }

    // Restore @actions/github context
    github.context.ref = originalContext.ref;
    github.context.sha = originalContext.sha;

    // Restore
    jest.restoreAllMocks();
  });

  it('sets defaults', () => {
    const settings: Args = inputHelper.getInputs();
    expect(settings).toBeTruthy();
  });

  it('GitHub Event: pull_request', async () => {
    // expect.hasAssertions()
    github.context.payload = {
      pull_request: {
        head: { ref: 'refs/heads/DVPS-331' },
        base: { ref: 'refs/heads/dev' },
        number: 2770,
        title: 'DVPS-336',
      },
    };
    github.context.eventName = 'pull_request';
    const settings: Args = inputHelper.getInputs();
    const action = new RunAction(github.context, settings);
    const result = await action.execute();
    expect(result).toEqual(true);
  });

  it('GitHub Event: push', async () => {
    // expect.hasAssertions()
    github.context.eventName = 'push';
    const settings: Args = inputHelper.getInputs();
    const action = new RunAction(github.context, settings);
    const result = await action.execute();
    expect(result).toEqual(true);
  });

  it('GitHub Event: repository_dispatch', async () => {
    // expect.hasAssertions()
    inputs.ref = 'UNICORN-8403';
    inputs.head_ref = 'refs/heads/UNICORN-8403';
    inputs.base_ref = 'dev';
    github.context.eventName = 'repository_dispatch';
    const settings: Args = inputHelper.getInputs();
    const action = new RunAction(github.context, settings);
    const result = await action.execute();
    expect(result).toEqual(true);
  });
});
