export type GetContributorProps = {
  username: string;
  repo: string
}

export type ContributorsResponseProps = {
  username: string;
  html_url: string
}

export const getContributors =
  async ({ username, repo }: GetContributorProps) =>
    await fetch(`https://api.github.com/repos/${username}/${repo}/contributors?per_page=10&anon=true`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(data => data.map(({ login, html_url }: { login: string, html_url: string }) => ({ username: login, html_url })))
      .catch(error => console.error('getContributors', error))