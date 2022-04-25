import { graphql } from '@octokit/graphql';
import {
  CommitHistoryConnection,
  GitObject,
  Maybe,
  Ref,
  Repository,
} from '@octokit/graphql-schema';

export interface CommitHistory extends GitObject {
  history?: Maybe<CommitHistoryConnection>;
}
export interface RefCommits extends Ref {
  target?: Maybe<CommitHistory>;
}
export interface RepositoryDateRange extends Repository {
  startPoint?: Maybe<RefCommits>;
  endPoint?: Maybe<RefCommits>;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export class QueryProcessor {
  graphqlWithAuth: typeof graphql;

  GetStartAndEndPoints = `
query getStartAndEndPoints($owner: String!, $repo: String!, $headRef: String!,$baseRef: String!) {
  repository(owner: $owner, name: $repo) {
    endPoint: ref(qualifiedName: $headRef) {
      ...internalBranchContent
    }
    startPoint: ref(qualifiedName: $baseRef) {
      ...internalBranchContent
    }
  }
}

fragment internalBranchContent on Ref {
  target {
    ... on Commit {
      history(first: 1) {
        edges {
          node {
            committedDate
          }
        }
      }
    }
  }
}
`;

  listCommitMessagesInPullRequest = `
query listCommitMessagesInPullRequest($owner: String!, $repo: String!, $prNumber: Int!, $after: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $prNumber) {
      baseRef {
        name
      }
      headRef {
        name
      }
      commits(first: 100, after: $after) {
        nodes {
          commit {
            message
          }
        }
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`;

  constructor(token: string) {
    this.graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }
}
