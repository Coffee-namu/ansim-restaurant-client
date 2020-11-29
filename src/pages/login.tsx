import { Heading, TextInput } from 'grommet'
import { NextPage } from 'next'
import React, { useState } from 'react'
import styled from 'styled-components'
import { apiHost } from '../utils/api-host'
import AnsimButton from '../components/AnsimButton'
import axios from 'axios'

const $LoginPage = styled.div`
  margin: auto;
  width: calc(100% - 30px);
  max-width: 500px;
`

const Page: NextPage = () => {
  const [state, setState] = useState({ username: '', password: '' })

  return (
    <$LoginPage>
      <Heading>로그인</Heading>
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
            .post(apiHost('/api/auth/login'), {
              username: state.username,
              password: state.password,
            })
            .then(({ data }) => {
              console.log(data)
              window.location.href = '/list'
              localStorage.setItem('member_id', data['member_id'])
            })
            .catch(() => {
              alert('아이디 패스워드를 다시 한 번 확인해주세요')
            })
        }}
      >
        완료
      </AnsimButton>
    </$LoginPage>
  )
}

export default Page
