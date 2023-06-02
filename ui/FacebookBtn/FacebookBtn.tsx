import { FacebookIcon, FacebookShareButton } from 'react-share'

export type FacebookBtnProps = {
  urlId: string
  message?: string
}

export const FacebookBtn = ({
  urlId,
  message = 'Follow our juicy link',
}: FacebookBtnProps) => (
  <FacebookShareButton
    title={message}
    url={`${process.env.NEXT_PUBLIC_HOST}/r/${urlId}`}
  >
    <FacebookIcon round={true} size={32} />
  </FacebookShareButton>
)
