import { PreviewProps } from '../components/Preview/Preview'

import { ButtonAction } from './../components/ActionsBar/ActionsBar'

export type Data = {
  id: string,
  username: string,
  repo: string,
  action: ButtonAction,
  theme: PreviewProps['theme'],
}

export type GithubLinksDataProps = {
  data: Data[]
}

export const githubLinksData: Data[] = []