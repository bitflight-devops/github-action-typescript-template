import * as core from '@actions/core';
import { Args, Context } from '@types';

import { BaseAction } from './base-action-classes';
import EventManager from './EventManager';

export class RunAction extends BaseAction {
  constructor(context: Context, argv: Args) {
    super(context, argv);
  }

  initEventManager(): void {
    // This function runs as part of the BaseAction class constructor.
    this.eventManager = new EventManager(this.context, this.argv, { octokit: this.octokit });
  }

  async execute(): Promise<boolean> {
    try {
      await this.eventManager!.processEvent();
      return true;
    } catch (error) {
      core.error(error as Error);
      if (this.argv.failOnError) {
        return false;
      }
      return true;
    }
  }
}
