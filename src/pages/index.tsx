import Link from 'next/link'
import styles from '../styles/home.module.scss'
import classNames from 'classnames'

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" className={styles.logo} />
      <div>
        <Link href="/login">
          <button className={styles.start}>로그인</button>
        </Link>
        <Link href="/signup">
          <button className={classNames(styles.start, styles.signUp)}>
            회원가입
          </button>
        </Link>
      </div>
    </div>
  )
}
