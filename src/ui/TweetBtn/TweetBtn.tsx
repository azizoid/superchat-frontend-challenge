import { TwitterIcon, TwitterShareButton } from 'react-share'

export type TweetBtnProps = {
  urlId: string
  message?: string
}

export const TweetBtn = ({
  urlId,
  message = 'Follow our juicy link',
}: TweetBtnProps) => (
  <TwitterShareButton
    title={message}
    url={`${process.env.NEXT_PUBLIC_HOST}/r/${urlId}`}
  >
    <TwitterIcon round={true} size={32} />
  </TwitterShareButton>
)
