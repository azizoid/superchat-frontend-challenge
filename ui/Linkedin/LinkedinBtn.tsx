import { LinkedinIcon, LinkedinShareButton } from 'react-share'

export type LinkedinBtnProps = {
  urlId: string
  message?: string
}

export const LinkedinBtn = ({
  urlId,
  message = 'Follow our juicy link',
}: LinkedinBtnProps) => (
  <LinkedinShareButton
    title={message}
    url={`${process.env.NEXT_PUBLIC_HOST}/r/${urlId}`}
  >
    <LinkedinIcon round={true} size={32} />
  </LinkedinShareButton>
)
