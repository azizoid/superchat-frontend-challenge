import React from "react"

import styles from "./Loader.module.scss"

export const Loader = (): JSX.Element => (
  <div className={styles.ldsEllipsis}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)
