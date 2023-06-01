import Image from 'next/image'

import { RepoDetailsResponseProps } from '../../../../utils/getRepoDetails/getRepoDetails'

export type RepoDescriptionProps = {
  repoDescription?: RepoDetailsResponseProps['description']
  userAvatar: string
  username: string
}

export const RepoDescription = ({
  repoDescription,
  userAvatar,
  username,
}: RepoDescriptionProps): JSX.Element => (
  <div className="card text-start">
    <h6 className="card-header">Description</h6>
    <div className="card-body">{repoDescription}</div>

    <Image
      src={userAvatar}
      className="rounded"
      alt={username}
      width="200"
      height="200"
    />
  </div>
)
