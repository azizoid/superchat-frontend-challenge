import React from "react"
import { BsGithub, BsSuitHeart, BsStar } from "react-icons/bs"
import { GoEye, GoRepoForked } from "react-icons/go"
import { VscIssues, VscCommentDiscussion } from "react-icons/vsc"
import { HiDownload } from "react-icons/hi"
import classNames from "classnames"

export enum ButtonActions {
  Follow = "Follow",
  Sponsor = "Sponsor",
  Watch = "Watch",
  Star = "Star",
  Fork = "Fork",
  Issue = "Issue",
  Discuss = "Discuss",
  Download = "Download",
}

export const githubActionsButtonList = [
  {
    title: ButtonActions.Follow,
    icon: <BsGithub />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}`,
  },
  {
    title: ButtonActions.Sponsor,
    icon: <BsSuitHeart style={{ color: "red" }} />,
    href: (username: string, repo: string): string =>
      `https://github.com/sponsors/${username}}`,
  },
  {
    title: ButtonActions.Watch,
    icon: <GoEye />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/subscription`,
  },
  {
    title: ButtonActions.Star,
    icon: <BsStar />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}`,
  },
  {
    title: ButtonActions.Fork,
    icon: <GoRepoForked />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/fork`,
  },
  {
    title: ButtonActions.Issue,
    icon: <VscIssues />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/issues`,
  },
  {
    title: ButtonActions.Discuss,
    icon: <VscCommentDiscussion />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/discussions`,
  },
  {
    title: ButtonActions.Download,
    icon: <HiDownload />,
    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/archive/HEAD.zip`,
  },
]

export type ActionsBarProps = {
  action: ButtonActions
  setAction: Function
}

export const ActionsBar = ({
  action,
  setAction,
}: ActionsBarProps): JSX.Element => (
  <div className="list-group list-group-horizontal" data-cy="actions_bar">
    {githubActionsButtonList.map(({ title, icon }) => (
      <a
        className={classNames(
          "list-group-item list-group-item-action text-center",
          title === action && "list-group-item-primary"
        )}
        key={title}
        onClick={() => setAction(title)}
        data-bs-toggle="tooltip"
        data-bs-html={true}
        title={title}
      >
        {icon}
      </a>
    ))}
  </div>
)
