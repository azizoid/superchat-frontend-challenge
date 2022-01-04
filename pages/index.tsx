import type { NextPage } from "next"
import { ChangeEvent, useState } from "react"

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!username?.length) return

    // TODO get user info
  }

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
        </div>
        <div className="col-7 text-center">Preview Area</div>
      </div>
    </main>
  )
}

export default Home
