import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"

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
import {
  ContributorsResponseProps,
  getContributors,
} from "../../utils/getContributors/getContributors"

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
  const [contributors, setContributors] =
    useState<ContributorsResponseProps[]>()

  const actionButton = useMemo(() => {
    const output = githubActionsButtonList.find(({ title }) => title === action)
    return output?.icon
  }, [action])

  const onStarHandler = () => {
    // TODO: implement authorisation and then try to star
    user?.username &&
      fetch(`https://api.github.com/user/starred/${user.username}/${repo}`, {
        method: "PUT",
        headers: {
          "Content-Length": "0",
        },
      })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          // For now will error with 401 because we are not authorisated
          console.error(error)
        })
        .finally(() => alert("Star / Unstar handler"))
  }

  useEffect(() => {
    getRepoDetails({ username: user.username, repo }).then(
      (data) => data && setRepoDetails(data)
    )
    getContributors({ username: user.username, repo }).then((data) =>
      setContributors(data)
    )
  }, [repo, user.username])

  return (
    <div className="row" data-cy="preview">
      <div className={classNames("col-4", styles.preview)}>
        <div className="card text-start">
          <h6 className="card-header">Basic Info</h6>

          <div className="card-body">
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
              onClick={onStarHandler}
            >
              {actionButton} <span>{action}</span> |{" "}
              <span>{repoDetails?.stargazers_count}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={classNames("col-4")}>
        <div className="card text-start">
          <h6 className="card-header">Description</h6>
          <div className="card-body">{repoDetails?.description}</div>

          <Image
            src={user.avatar_url}
            className="rounded"
            alt={user.username}
            width="200"
            height="200"
          />
        </div>
      </div>

      <div className={classNames("col-4")}>
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
      </div>
    </div>
  )
}
