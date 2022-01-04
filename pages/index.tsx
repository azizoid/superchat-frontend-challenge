import type { NextPage } from "next"
import { ChangeEvent, useEffect, useState } from "react"

import { MdLightMode, MdDarkMode } from "react-icons/md"
import { BsGithub } from "react-icons/bs"

import { GetRepoProps, getRepos } from "../utils/getRepos/getRepos"
import { getUser, GetUserProps } from "../utils/getUser/getUser"

import { ActionsBar, ButtonActions } from "../components/ActionsBar/ActionsBar"
import { Loader } from "../ui/Loader/Loader"
import { Preview } from "../components/Preview/Preview"
import { savePreviewData } from "../utils/savePreviewData/savePreviewData"
import { ProgressBar } from "../components/ProgressBar/ProgressBar"
import { NotFound } from "../ui/NotFound/NotFound"

export enum PageStateProps {
  Init,
  Loading,
  Ready,
  Error,
}

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [user, setUser] = useState<GetUserProps>()
  const [action, setAction] = useState<ButtonActions>(ButtonActions.Follow) //I prefer to state the type even if we state default value. for the structure of the code
  const [repo, setRepo] = useState<string>("")
  const [repositories, setRepositories] = useState<GetRepoProps[]>([])
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [tweetId, setTweetId] = useState<string>("")

  const [pageState, setPageState] = useState(PageStateProps.Init)

  const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setPageState(PageStateProps.Loading)

    if (!username?.length) return

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
    if (user?.username) {
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
  }, [user?.username])

  useEffect(() => {
    setTweetId("")
  }, [action, repo, theme, user])

  return (
    <main className="container">
      <h3>Creative GitHub Link Generator</h3>

      <div className="row">
        <div className="col-5">
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
              <div className="list-group list-group-flush" id="repositoryList">
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
            {pageState === PageStateProps.Error && (
              <NotFound message="User Not Found." />
            )}
          </div>
        </div>
        <div className="col-7 text-center">
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
        </div>
      </div>
    </main>
  )
}

export default Home
