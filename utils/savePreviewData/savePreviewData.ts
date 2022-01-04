import { Data } from "../../store/_data"

export type SavePreviewData = Omit<Data, 'id'>

export const savePreviewData =
  async ({ username, repo, action, theme }: SavePreviewData) =>
    await fetch("/api/githublink", {
      method: "POST",
      body: JSON.stringify({
        username,
        repo,
        action,
        theme,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        return data
      })
      .catch(error => console.error('getRepos', error))