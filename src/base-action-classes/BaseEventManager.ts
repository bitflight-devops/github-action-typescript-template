import type { Context } from '@actions/github/lib/context';
import type { Args, GithubOctokit } from '@types';

export const ANY_EVENT = 'any';

export interface EventManagerOptions {
  octokit?: GithubOctokit;
  listenForEvents?: string[];
  // Add any of your options here
  [key: string]: any;
}

export abstract class BaseEventManager {
  context: Context;

  argv: Args;

  failOnError: boolean;

  listenForEvents: string[];

  options: EventManagerOptions;

  octokit?: GithubOctokit;

  constructor(context: Context, argv: Args, options?: EventManagerOptions) {
    this.context = context;
    this.argv = argv;
    this.failOnError = argv.failOnError;
    this.listenForEvents = options?.listenForEvents ?? [ANY_EVENT];
    this.octokit = options?.octokit;
    this.options = options ?? {};
    this.init();
  }

  init(): void {
    throw new Error(`Method not implemented.`);
  }

  async processEvent(options?: EventManagerOptions): Promise<any> {
    const combinedOptions = { ...this.options, ...options };
    throw new Error(`Method not implemented. ${JSON.stringify(combinedOptions)}`);
  }
}
