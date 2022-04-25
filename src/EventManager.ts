import * as core from '@actions/core';
import type { Args, Context } from '@types';

import { BaseEventManager, EventManagerOptions } from './base-action-classes';

export default class EventManager extends BaseEventManager {
  constructor(context: Context, argv: Args, options?: EventManagerOptions) {
    super(context, argv, options);
  }

  init() {
    // Do nothing
  }

  async processEvent(options?: EventManagerOptions) {
    const combinedOptions = { ...this.options, ...options };
    core.setOutput('args', JSON.stringify(this.argv));
    core.setOutput('options', JSON.stringify(combinedOptions));
  }
}
