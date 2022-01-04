export type GetUserProps = {
  avatar_url: string
  username: string
  bio: string
  html_url: string
}

export const getUser = async (username: string) =>
  await fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json()
    }) //  workaround the catch 
    .then(({ avatar_url, login, bio, html_url }) => ({
      avatar_url,
      username: login,
      bio,
      html_url,
    }))
    .catch((error) => {
      throw Error(`getUser ${error}`)
    })


