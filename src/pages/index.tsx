import { Button } from 'grommet'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" />
      <Link href="/list">
        <Button label="시작하기" className={styles.start} />
      </Link>
    </div>
  )
}
