export type GetRepoProps = {
  id: string
  name: string
  html_url: string
}

export const getRepos =
  async (username: string) =>
    await fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(data => data.map(({ id, name, html_url }: GetRepoProps) => ({ id, name, html_url })))
      .catch(error => console.error('getRepos', error))