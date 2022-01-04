import { useEffect, useState } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"

import { PageStateProps } from "../index"
import { Loader } from "../../ui/Loader/Loader"

import styles from "../../styles/r.page.module.scss"
import { Data } from "../../store/_data"
import { getUser, GetUserProps } from "../../utils/getUser/getUser"
import { Preview } from "../../components/Preview/Preview"

export const GetGithubLink: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [pageState, setPageState] = useState(PageStateProps.Loading)
  const [previewData, setPreviewData] = useState<Data>()
  const [user, setUser] = useState<GetUserProps>()

  useEffect(() => {
    if (id) {
      fetch(`/api/githublink/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then((data) => {
          setPreviewData(data)
          setPageState(PageStateProps.Ready) // Switching state to ready just in case so we will not get stuck in Loading Mode
        })
        .catch(() => setPageState(PageStateProps.Error))
    }
  }, [id])

  useEffect(() => {
    if (previewData?.username) {
      getUser(previewData?.username)
        .then((data) => {
          setUser(data)
          setPageState(PageStateProps.Ready)
        })
        .catch(() => setPageState(PageStateProps.Error))
    }
  }, [previewData?.username])

  return (
    <div className="container">
      <div className={styles.previewPage}>
        <div className="col-md-12 col-lg-8 offset-lg-2">
          {pageState === PageStateProps.Loading && (
            <span className="list-group-item text-center">
              <Loader />
            </span>
          )}
          {pageState === PageStateProps.Ready && previewData && user && (
            <Preview
              user={user}
              repo={previewData.repo}
              action={previewData.action}
              theme={previewData.theme}
              tweetId={previewData.id}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GetGithubLink
