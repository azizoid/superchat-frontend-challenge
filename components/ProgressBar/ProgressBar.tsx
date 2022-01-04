import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

import { GetUserProps } from "../../utils/getUser/getUser"

export type ProgressBarProps = {
  user?: GetUserProps
  repo?: string
  tweetId?: string
}

export const ProgressBar = ({
  user,
  repo,
  tweetId,
}: ProgressBarProps): JSX.Element => (
  <div className="row" data-cy="progress-bar">
    <div className="col">
      Username
      <br />
      {user ? <AiOutlinePlus /> : <AiOutlineMinus />}
    </div>
    <div className="col">
      Repo
      <br />
      {repo ? <AiOutlinePlus /> : <AiOutlineMinus />}
    </div>
    <div className="col">
      Action
      <br />
      <AiOutlinePlus />
    </div>
    <div className="col">
      Theme
      <br />
      <AiOutlinePlus />
    </div>
    <div className="col">
      TweetId
      <br />
      {tweetId ? <AiOutlinePlus /> : <AiOutlineMinus />}
    </div>
  </div>
)
