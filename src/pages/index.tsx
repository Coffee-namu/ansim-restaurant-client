import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" className={styles.logo} />
      <Link href="/list">
        <button className={styles.start}>시작하기</button>
      </Link>
    </div>
  )
}
