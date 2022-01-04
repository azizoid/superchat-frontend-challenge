export type GetRepoDetailsProps = {
  username: string;
  repo: string;
}

export type RepoDetailsResponseProps = {
  description: string,
  stargazers_count: string
}

export const getRepoDetails =
  async ({ username, repo }: GetRepoDetailsProps) =>
    await fetch(`https://api.github.com/repos/${username}/${repo}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(({ description, stargazers_count }: RepoDetailsResponseProps) => ({ description, stargazers_count }))
      .catch(error => console.error('getRepoDetails', error))