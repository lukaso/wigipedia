// Central site/repo configuration. Editing happens via GitHub PRs, so article
// pages link straight to the GitHub editor and commit history for their source file.
export const SITE = {
  title: 'Wigipedia',
  tagline: 'The Free Hair Encyclopedia',
  repo: 'https://github.com/lukaso/wigipedia',
  branch: 'main',
  contentDir: 'src/content/articles',
};

export const articleSourcePath = (id: string) => `${SITE.contentDir}/${id}.md`;
export const editUrl = (id: string) =>
  `${SITE.repo}/edit/${SITE.branch}/${articleSourcePath(id)}`;
export const historyUrl = (id: string) =>
  `${SITE.repo}/commits/${SITE.branch}/${articleSourcePath(id)}`;
export const newArticleUrl = () =>
  `${SITE.repo}/new/${SITE.branch}/${SITE.contentDir}`;
