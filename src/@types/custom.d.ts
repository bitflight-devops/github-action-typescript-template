// Add your custom types here
// Example:
// export interface ProjectFilter {
//   projectsIncluded?: string[];
//   projectsExcluded?: string[];
// }
export interface Args extends BaseArgs {
  // Add any of your args here
  [key: string]: any;
}
