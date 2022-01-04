import { useState } from "react"
import { NextPage } from "next"

import { PageStateProps } from "../index"
import { Loader } from "../../ui/Loader/Loader"

import styles from "../../styles/r.page.module.scss"

export const GetGithubLink: NextPage = () => {
  const [pageState, setPageState] = useState(PageStateProps.Loading)

  return (
    <div className="container">
      <div className={styles.previewPage}>
        <div className="col-md-12 col-lg-8 offset-lg-2">
          {pageState === PageStateProps.Loading && (
            <span className="list-group-item text-center">
              <Loader />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default GetGithubLink
