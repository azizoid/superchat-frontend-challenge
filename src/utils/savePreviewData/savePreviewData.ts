import { Data } from '../../store/_data'

export type SavePreviewData = Omit<Data, 'id'>

export const savePreviewData = async (
  { username, repo, action, theme }: SavePreviewData
): Promise<any | undefined> => { // you should replace `any` with the actual type of the response
  try {
    const response = await fetch('/api/githublink', {
      method: 'POST',
      body: JSON.stringify({
        username,
        repo,
        action,
        theme,
      }),
    })

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('savePreviewData', error)
  }
}