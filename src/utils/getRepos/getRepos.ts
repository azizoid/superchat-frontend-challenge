export type GetRepoProps = {
  id: string;
  name: string;
  html_url: string;
}

export const getRepos = async (
  username: string
): Promise<GetRepoProps[] | undefined> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const data: GetRepoProps[] = await response.json()
    return data.map(({ id, name, html_url }) => ({ id, name, html_url }))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getRepos', error)
  }
}
