import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { NextPage } from 'next'

import { Preview } from '../../components/Preview/Preview'
import { Data } from '../../store/_data'
import styles from '../../styles/r.page.module.scss'
import { Loader } from '../../ui/Loader/Loader'
import { NotFound } from '../../ui/NotFound/NotFound'
import { getUser, GetUserProps } from '../../utils/getUser/getUser'
import { PageStateProps } from '../index'

export const GetGithubLink: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [pageState, setPageState] = useState(PageStateProps.Loading)
  const [previewData, setPreviewData] = useState<Data>()
  const [user, setUser] = useState<GetUserProps>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/githublink/${id}`)
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          const data = await response.json()
          setPreviewData(data)
          setPageState(PageStateProps.Ready)
        }
      } catch (error) {
        setPageState(PageStateProps.Error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (previewData?.username) {
          const data = await getUser(previewData.username)
          setUser(data)
          setPageState(PageStateProps.Ready)
        }
      } catch (error) {
        setPageState(PageStateProps.Error)
      }
    }
    fetchUser()
  }, [previewData?.username])

  return (
    <div className="container">
      <div className={styles.previewPage}>
        <div className="col-md-12 col-lg-8 offset-lg-2">
          {pageState === PageStateProps.Loading ? (
            <span className="list-group-item text-center">
              <Loader />
            </span>
          ) : null}

          {pageState === PageStateProps.Error ? (
            <NotFound message="User Not Found." />
          ) : null}

          {pageState === PageStateProps.Ready && previewData && user ? (
            <Preview
              user={user}
              repo={previewData.repo}
              action={previewData.action}
              theme={previewData.theme}
              tweetId={previewData.id}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default GetGithubLink
