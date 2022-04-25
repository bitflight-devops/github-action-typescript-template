import * as github from '@actions/github';
import type { Args, Context, GithubOctokit } from '@types';
import { BaseEventManager } from 'base-action-classes';

export abstract class BaseAction {
  argv: Args;

  context: Context;

  eventManager?: BaseEventManager;

  octokit: GithubOctokit;

  constructor(context: Context, argv: Args) {
    this.argv = argv;
    this.context = context;
    this.octokit = github.getOctokit(this.argv.token);
    this.initEventManager();
  }

  initEventManager(): void {
    throw new Error(`Method not implemented.`);
  }

  async execute(): Promise<boolean> {
    throw new Error(`Method not implemented.`);
  }
}
