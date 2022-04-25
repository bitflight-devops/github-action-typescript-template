import { GitHub } from '@actions/github/lib/utils';

export type { Context } from '@actions/github/lib/context';
export type GithubOctokit = InstanceType<typeof GitHub>;
export interface BaseArgs {
  token: string;
  failOnError: boolean;
  listenForEvents: string[];
}

export * from './custom.d';
