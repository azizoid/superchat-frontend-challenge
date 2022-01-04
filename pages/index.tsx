import type { NextPage } from "next"
import { ChangeEvent, useEffect, useState } from "react"
import {
  ActionButtons,
  ButtonActions,
} from "../components/ActionsBar/ActionsBar"
import { GetRepoProps, getRepos } from "../utils/getRepos/getRepos"
import { getUser, GetUserProps } from "../utils/getUser/getUser"

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

  const [pageState, setPageState] = useState(PageStateProps.Init)

  const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!username?.length) return

    getUser(username)
      .then((data) => setUser(data))
      .catch(() => setPageState(PageStateProps.Error))
      .finally(() => setPageState(PageStateProps.Ready))
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
            </div>
          </form>

          <hr />

          <div className="row">
            <ActionButtons action={action} setAction={setAction} />
          </div>

          <div className="row">
            {pageState === PageStateProps.Init && (
              <span
                className="list-group-item text-center"
                data-cy="noRepositoryPanel"
              >
                No repositories to display
              </span>
            )}
          </div>
        </div>
        <div className="col-7 text-center">Preview Area</div>
      </div>
    </main>
  )
}

export default Home
