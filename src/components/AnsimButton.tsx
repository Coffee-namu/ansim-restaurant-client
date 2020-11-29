import styled from 'styled-components'

const $Button = styled.button`
  border: none;
  border-radius: 10px;
  background: #000;
  color: #fff;
  outline: none;
  line-height: 1;
  cursor: pointer;
  padding: 13px 15px;
`

type AnsimButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const AnsimButton: React.FC<AnsimButtonProps> = (props) => {
  return <$Button {...props} />
}

export default AnsimButton
