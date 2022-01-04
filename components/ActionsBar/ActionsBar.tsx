import React from "react"

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

    href: (username: string, repo: string): string =>
      `https://github.com/${username}`,
  },
  {
    title: ButtonActions.Sponsor,

    href: (username: string, repo: string): string =>
      `https://github.com/sponsors/${username}}`,
  },
  {
    title: ButtonActions.Watch,

    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/subscription`,
  },
  {
    title: ButtonActions.Star,

    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}`,
  },
  {
    title: ButtonActions.Fork,

    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/fork`,
  },
  {
    title: ButtonActions.Issue,

    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/issues`,
  },
  {
    title: ButtonActions.Discuss,

    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/discussions`,
  },
  {
    title: ButtonActions.Download,

    href: (username: string, repo: string): string =>
      `https://github.com/${username}/${repo}/archive/HEAD.zip`,
  },
]

export type ActionsButtonsProps = {
  action: ButtonActions
  setAction: Function
}

export const ActionsButtons = ({
  action,
  setAction,
}: ActionsButtonsProps): JSX.Element => (
  <div className="list-group list-group-horizontal" data-cy="actions_bar">
    {githubActionsButtonList.map(({ title }) => (
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
        {title}
      </a>
    ))}
  </div>
)
