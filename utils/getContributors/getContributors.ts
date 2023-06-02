export type GetContributorProps = {
  username: string;
  repo: string;
}

export type ContributorsResponseProps = {
  username: string;
  html_url: string;
}

type GithubResponseItem = {
  login: string;
  html_url: string;
}

export const getContributors = async (
  { username, repo }: GetContributorProps
): Promise<ContributorsResponseProps[] | undefined> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contributors?per_page=10&anon=true`)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const data: GithubResponseItem[] = await response.json()

    const result = data.map(({ login, html_url }) => ({
      username: login,
      html_url,
    }))
    return result

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getContributors', error)
  }
}
