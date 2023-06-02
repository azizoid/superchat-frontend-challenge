export type NotFoundProps = {
  message?: string
}

export const NotFound = ({
  message = 'Link Not Found or Expired',
}) => <div className="alert alert-danger">{message}</div>
