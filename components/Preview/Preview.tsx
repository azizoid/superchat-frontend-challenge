import React, { useEffect, useMemo, useState } from "react"

import classNames from "classnames"

import {
  ButtonActions,
  githubActionsButtonList,
} from "../ActionsBar/ActionsBar"
import { GetUserProps } from "../../utils/getUser/getUser"

import { BiUser } from "react-icons/bi"
import { RiGithubLine } from "react-icons/ri"

import styles from "./Preview.module.scss"
import {
  getRepoDetails,
  RepoDetailsResponseProps,
} from "../../utils/getRepoDetails/getRepoDetails"

export type PreviewProps = {
  user: GetUserProps
  repo: string
  action: ButtonActions
  theme: "light" | "dark"
}

export const Preview = ({
  user,
  repo,
  action,
  theme = "light",
}: PreviewProps): JSX.Element => {
  const [repoDetails, setRepoDetails] = useState<RepoDetailsResponseProps>()

  const actionButton = useMemo(() => {
    const output = githubActionsButtonList.find(({ title }) => title === action)
    return output?.icon
  }, [action])

  useEffect(() => {
    getRepoDetails({ username: user.username, repo }).then(
      (data) => data && setRepoDetails(data)
    )
  }, [repo, user.username])

  return (
    <div className="row" data-cy="preview">
      <div className={classNames("col-4", styles.preview)}>
        <div className="card text-start">
          <h6 className="card-header">Basic Info</h6>

          <div className={classNames("card-body", styles.data)}>
            <BiUser /> {user.username}
            <hr />
            <RiGithubLine /> {repo}
            <hr />
            <button
              className={classNames(
                "btn",
                "btn-sm",
                theme === "light" ? "btn-light" : "btn-dark",
                styles.actionButton
              )}
            >
              {actionButton} <span>{action}</span> |{" "}
              <span>{repoDetails?.stargazers_count}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={classNames("col-4")}>Repo Description</div>

      <div className={classNames("col-4")}>Top Contributors</div>
    </div>
  )
}
