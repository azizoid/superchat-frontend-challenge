export type GetRepoDetailsProps = {
  username: string
  repo: string
}

export type RepoDetailsResponseProps = {
  description: string
  stargazers_count: number // changed this to number, as it would make more sense
}

export const getRepoDetails = async ({
  username,
  repo,
}: GetRepoDetailsProps): Promise<RepoDetailsResponseProps | undefined> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}`,
    )

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const { description, stargazers_count }: RepoDetailsResponseProps =
      await response.json()
    return { description, stargazers_count }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getRepoDetails', error)
  }
}
