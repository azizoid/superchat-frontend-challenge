export type GetUserProps = {
  avatar_url: string
  username: string
  bio: string
  html_url: string
}

type GithubUsersItem = {
  avatar_url: string
  login: string
  bio: string
  html_url: string
}

export const getUser = async (
  username: string,
): Promise<GetUserProps | undefined> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const { avatar_url, login, bio, html_url }: GithubUsersItem =
      await response.json()
    return {
      avatar_url,
      username: login,
      bio,
      html_url,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`getUser ${error}`)
  }
}
