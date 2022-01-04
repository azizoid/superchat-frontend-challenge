import type { NextPage } from "next"
import React, { ChangeEvent, useEffect, useState } from "react"

import { MdLightMode, MdDarkMode } from "react-icons/md"
import { BsGithub } from "react-icons/bs"

import { GetRepoProps, getRepos } from "../utils/getRepos/getRepos"
import { getUser, GetUserProps } from "../utils/getUser/getUser"

import { ActionsBar, ButtonActions } from "../components/ActionsBar/ActionsBar"
import { Loader } from "../ui/Loader/Loader"
import { Preview, PreviewProps } from "../components/Preview/Preview"
import { savePreviewData } from "../utils/savePreviewData/savePreviewData"
import { ProgressBar } from "../components/ProgressBar/ProgressBar"
import { NotFound } from "../ui/NotFound/NotFound"
import Head from "next/head"
import classNames from "classnames"

import styles from "../styles/home.page.module.scss"

export enum PageStateProps {
  Init,
  Loading,
  Ready,
  Error,
}

export const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [user, setUser] = useState<GetUserProps>()
  const [action, setAction] = useState<PreviewProps["action"]>(
    ButtonActions.Follow
  )
  const [repo, setRepo] = useState<PreviewProps["repo"]>("")
  const [repositories, setRepositories] = useState<GetRepoProps[]>([])
  const [theme, setTheme] = useState<PreviewProps["theme"]>("dark")
  const [tweetId, setTweetId] = useState<string>("")

  const [pageState, setPageState] = useState(PageStateProps.Init)

  const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setPageState(PageStateProps.Loading)

    if (username?.length === 0) {
      setPageState(PageStateProps.Error)
      return
    }

    getUser(username)
      .then((data) => setUser(data))
      .catch(() => setPageState(PageStateProps.Error))
      .finally(() => setPageState(PageStateProps.Ready))
  }

  const onPreviewSaveHandler = () => {
    if (user && repo && action && theme) {
      savePreviewData({ username: user.username, repo, action, theme })
        .then((data) => setTweetId(data.data.id))
        .catch((error) => console.error(error))
    }
  }

  useEffect(() => {
    if (user?.username && pageState === PageStateProps.Ready) {
      getRepos(user.username)
        .then((data) => {
          setRepo("")
          setRepositories(data)
        })
        .catch(() => setPageState(PageStateProps.Error))
        .finally(() => setPageState(PageStateProps.Ready))
    } else {
      setRepositories([])
    }
  }, [pageState, user?.username])

  useEffect(() => {
    setTweetId("")
  }, [action, repo, theme, user])

  return (
    <main className={styles.home}>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="author" content="Aziz" />
        <title>Superchat Frontend Challenge</title>
      </Head>
      <div className="container">
        <h3 className={styles.pageHeader}>Creative GitHub Link Generator</h3>

        <div className="row">
          <div className="col-md-12 col-lg-5">
            <form className="form-inline" onSubmit={onSubmitHandler}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  onChange={onUsernameChangeHandler}
                />

                <button type="submit" className="btn btn-outline-primary">
                  Repos
                </button>

                {theme === "light" ? (
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => setTheme("dark")}
                    data-cy="lightModeBtn"
                  >
                    <MdLightMode /> Mode
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => setTheme("light")}
                    data-cy="darkModeBtn"
                  >
                    <MdDarkMode /> Mode
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={onPreviewSaveHandler}
                  disabled={!!tweetId || !user || !repo}
                  data-cy="saveBtn"
                >
                  Save
                </button>
              </div>
            </form>

            <hr />

            <div className="row">
              <ActionsBar action={action} setAction={setAction} />
            </div>

            <hr />

            <div className="row">
              {pageState === PageStateProps.Init && (
                <span
                  className="list-group-item text-center"
                  data-cy="noRepositoryPanel"
                >
                  No repositories to display
                </span>
              )}
              {pageState === PageStateProps.Loading && (
                <span
                  className="list-group-item text-center"
                  data-cy="loadingPanel"
                >
                  <Loader />
                </span>
              )}
              {pageState === PageStateProps.Ready && (
                <div
                  className={classNames(
                    "list-group list-group-flush",
                    styles.repositoryList
                  )}
                  data-cy="repository-list"
                >
                  {repositories.length > 0 &&
                    repositories?.map(({ id, name, html_url }) => (
                      <a
                        key={id}
                        className="list-group-item list-group-item-action"
                        onClick={() => setRepo(name)}
                        data-cy="repository-item"
                      >
                        <BsGithub /> {name} <br />
                        <small>{html_url}</small>
                      </a>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-lg-7 text-center">
            <ProgressBar user={user} repo={repo} tweetId={tweetId} />

            <hr />

            {pageState === PageStateProps.Ready &&
              user &&
              repo &&
              action &&
              theme && (
                <Preview
                  user={user}
                  repo={repo}
                  action={action}
                  theme={theme}
                  tweetId={tweetId}
                />
              )}
            {pageState === PageStateProps.Error && (
              <NotFound message="User Not Found." />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
