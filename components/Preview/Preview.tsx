import React, { useEffect, useMemo, useState } from "react"

import classNames from "classnames"

import {
  ButtonActions,
  githubActionsButtonList,
} from "../ActionsBar/ActionsBar"
import { GetUserProps } from "../../utils/getUser/getUser"

import {
  ContributorsResponseProps,
  getContributors,
} from "../../utils/getContributors/getContributors"

import {
  getRepoDetails,
  RepoDetailsResponseProps,
} from "../../utils/getRepoDetails/getRepoDetails"

import { TopContributors } from "./children/TopContributors/TopContributors"
import { RepoDescription } from "./children/RepoDescription/RepoDescription"

import { BiUser } from "react-icons/bi"
import { RiGithubLine } from "react-icons/ri"

import styles from "./Preview.module.scss"
import { TweetBtn } from "../../ui/TweetBtn/TweetBtn"
import { FacebookBtn } from "../../ui/FacebookBtn/FacebookBtn"
import { LinkedinBtn } from "../../ui/Linkedin/LinkedinBtn"

export type PreviewProps = {
  user: GetUserProps
  repo: string
  action: ButtonActions
  theme: "light" | "dark"
  tweetId: string
}

export const Preview = ({
  user,
  repo,
  action,
  theme = "light",
  tweetId,
}: PreviewProps): JSX.Element => {
  const [contributors, setContributors] =
    useState<ContributorsResponseProps[]>()
  const [repoDetails, setRepoDetails] = useState<RepoDetailsResponseProps>()

  useEffect(() => {
    getContributors({ username: user.username, repo }).then((data) =>
      setContributors(data)
    )
    getRepoDetails({ username: user.username, repo }).then(
      (data) => data && setRepoDetails(data)
    )
  }, [repo, user.username])

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

  return (
    <div className="row" data-cy="preview">
      <div className={classNames("col-4", styles.preview)}>
        <div className="card text-start" data-cy="basic-info">
          <h6 className="card-header">Basic Info</h6>

          <div className={classNames("card-body", styles.data)}>
            <span data-cy="preview-username">
              <BiUser /> {user.username}
            </span>
            <hr />
            <span data-cy="preview-repo">
              <RiGithubLine /> {repo}
            </span>
            <hr />
            <button
              className={classNames(
                "btn",
                "btn-sm",
                theme === "light" ? "btn-light" : "btn-dark",
                styles.actionButton
              )}
              onClick={onStarHandler}
              data-cy="preview-theme"
            >
              {actionButton} <span>{action}</span> |{" "}
              <span data-cy="preview-stars">
                {repoDetails?.stargazers_count}
              </span>
            </button>
            <hr />
            {!tweetId.length ? (
              <small>Please press Save button to be able to share</small>
            ) : (
              <div data-cy="social-links">
                <TweetBtn urlId={tweetId} />
                <FacebookBtn urlId={tweetId} />
                <LinkedinBtn urlId={tweetId} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classNames("col-4")}>
        <RepoDescription
          repoDescription={repoDetails?.description}
          userAvatar={user.avatar_url}
          username={user.username}
        />
      </div>

      <div className={classNames("col-4")} data-cy="preview-contributors">
        <TopContributors contributors={contributors} />
      </div>
    </div>
  )
}
