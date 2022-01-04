import { ContributorsResponseProps } from "../../../../utils/getContributors/getContributors"

import { BiUser } from "react-icons/bi"

export type TopContributorsProps = {
  contributors?: ContributorsResponseProps[]
}
export const TopContributors = ({
  contributors,
}: TopContributorsProps): JSX.Element => (
  <div className="card text-start">
    <h6 className="card-header">Top Contributors</h6>
    <div className="card-body">
      {!contributors?.length && (
        <span className="list-group-item list-group-item-action">
          No Contributor
        </span>
      )}
      <ul className="list-group list-group-flush">
        {contributors?.map(({ username, html_url }, index) => (
          <li key={index} className="list-group-item">
            <a href={html_url} target="_blank" rel="noreferrer">
              <BiUser /> {username}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
