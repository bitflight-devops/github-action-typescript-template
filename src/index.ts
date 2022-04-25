import * as core from '@actions/core';
import * as github from '@actions/github';
import { getInputs } from 'helpers';

import { RunAction } from './RunAction';

await (async function (): Promise<void> {
  const action = new RunAction(github.context, getInputs());
  const result = await action.execute();

  if (result) {
    return core.info('Completed');
  }
  throw core.setFailed('Failed');
})();
