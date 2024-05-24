import { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export function Container({ children }: PropsWithChildren<{}>) {
  return <section className={styles.container}>{children}</section>
}
