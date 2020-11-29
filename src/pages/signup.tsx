import { NextPage } from 'next'
import { TextInput, Heading } from 'grommet'
import AnsimButton from '../components/AnsimButton'
import { useState } from 'react'
import axios from 'axios'
import { apiHost } from '../utils/api-host'

const Page: NextPage = () => {
  const [state, setState] = useState({ username: '', password: '' })

  return (
    <div
      style={{
        margin: 'auto',
        width: 'calc(100% - 30px)',
        maxWidth: 500,
      }}
    >
      <Heading>회원가입</Heading>
      <TextInput
        type="text"
        placeholder="아이디"
        value={state.username}
        onChange={(e) => {
          setState({
            ...state,
            username: e.currentTarget.value,
          })
        }}
      />
      <TextInput
        type="password"
        placeholder="패스워드"
        style={{
          marginTop: 15,
        }}
        value={state.password}
        onChange={(e) => {
          setState({
            ...state,
            password: e.currentTarget.value,
          })
        }}
      />

      <AnsimButton
        style={{
          marginTop: 15,
        }}
        onClick={() => {
          axios
            .post(apiHost('/api/v1/members'), {
              username: state.username,
              password: state.password,
            })
            .then(() => {
              window.location.href = '/list'
            })
            .catch(() => {
              alert('아이디 패스워드를 다시 한 번 확인해주세요')
            })
        }}
      >
        완료
      </AnsimButton>
    </div>
  )
}

export default Page
