import Axios from 'axios'
import { Card, CardBody, Text, Heading } from 'grommet'
import { format } from 'path'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import style from '../styles/board.module.scss'
import { apiHost } from '../utils/api-host'

type Document = {
  id: number
  memberId: number
  title: string
  content: string
  created: Date
}

type Member = {
  id: number
  username: string
}

type Comment = {
  id: number
  memberId: number
  content: string
  created: Date
}

const formatTime = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
}

const Board: React.FC = () => {
  const boardPage = useRef(null)
  const documentInputWindow = useRef(null)
  const documentTitle = useRef(null)
  const documentContent = useRef(null)
  const [isShowDocumentInput, setIsShowDocumentInput] = useState<boolean>(false)
  const [documentList, setDocumentList] = useState<Document[]>([])
  const [memberList, setMemberList] = useState<Member[]>([])
  const [commentList, setCommentList] = useState<Comment[]>([])

  useEffect(() => {
    Axios.get(apiHost(`/api/v1/members/all`)).then(({ data }) => {
      setMemberList(
        data.map((member) => ({
          id: member.member_id,
          username: member.username,
        }))
      )

      Axios.get(apiHost(`/api/v1/board`)).then(({ data }) => {
        setDocumentList(
          data.map((document) => ({
            id: document.document_id,
            memberId: document.member_id,
            title: document.title,
            content: document.content,
            created: new Date(document.created),
          }))
        )
      })
    })
  }, [])

  const showDocumentInputWindow = () => {
    setIsShowDocumentInput(true)
    documentInputWindow.current.style.display = 'block'
  }

  const hideDocumentInputWindow = () => {
    setIsShowDocumentInput(false)
    documentInputWindow.current.style.display = 'none'
  }

  const submitDocument = () => {
    const memberId = +localStorage.getItem('member_id')
    if (!memberId) {
      alert('로그인이 필요한 기능입니다.')
    }
    const title = documentTitle.current.value
    const content = documentContent.current.value
    const created = new Date()

    Axios.post(apiHost(`/api/v1/board/document`), {
      member_id: memberId,
      title,
      content,
      created,
      board_id: 1,
      category_id: 1,
    }).then(({ data }) => {
      documentTitle.current.value = ''
      documentContent.current.value = ''
      hideDocumentInputWindow()

      setDocumentList([
        {
          id: data,
          memberId,
          title,
          content,
          created,
        },
        ...documentList,
      ])
    })
  }

  const showDocumentModal = (e, documentId) => {
    Axios.get(apiHost(`/api/v1/board/document/${documentId}`)).then(
      ({ data }) => {
        setCommentList(
          data.map((comment) => ({
            id: comment.comment_id,
            memberId: comment.member_id,
            content: comment.content,
            created: new Date(comment.created),
          }))
        )
      }
    )

    const $modal = e.target
      .closest('[data-card]')
      .querySelector(`[data-modal='${documentId}']`)
    $modal.style.display = 'flex'
    boardPage.current.classList.add('stop-scroll')
  }

  const closeDocumentModal = (e, documentId) => {
    const $modal = e.target.closest('[data-modal]')
    $modal.style.display = 'none'
    boardPage.current.classList.remove('stop-scroll')
  }

  const submitComment = (e, documentId) => {
    const memberId = +localStorage.getItem('member_id')
    if (!memberId) {
      alert('로그인이 필요한 기능입니다.')
    }

    const $content = e.target
      .closest('[data-modal]')
      .querySelector('[data-comment-input]')
    const created = new Date()

    Axios.post(apiHost(`/api/v1/board/document/${documentId}`), {
      member_id: memberId,
      document_id: documentId,
      content: $content.value,
      created,
    }).then(({ data }) => {
      setCommentList([
        ...commentList,
        {
          id: data,
          memberId,
          content: $content.value,
          created,
        },
      ])

      $content.value = ''
    })
  }

  return (
    <div id={style['board-page']} ref={boardPage}>
      <div className={style['header']}>
        <Heading level="2" className={style['page-title']}>
          자유게시판
        </Heading>
        {!isShowDocumentInput ? (
          <div className={style['add-btn']} onClick={showDocumentInputWindow}>
            +
          </div>
        ) : (
          <div className={style['add-btn']} onClick={hideDocumentInputWindow}>
            -
          </div>
        )}
      </div>
      <div className={style['document-add-window']} ref={documentInputWindow}>
        <input
          className={style['title-input']}
          placeholder="제목"
          ref={documentTitle}
        />
        <textarea
          className={style['content-input']}
          placeholder="내용"
          ref={documentContent}
        ></textarea>
        <button className={style['submit-btn']} onClick={submitDocument}>
          제출하기
        </button>
      </div>
      <div className={style['document-list']} data-card>
        {documentList.map((document) => (
          <Fragment key={document.id}>
            <Card
              background="light-1"
              className={style['card']}
              onClick={(e) => showDocumentModal(e, document.id)}
            >
              <CardBody className={style['body']}>
                <div className={style['info-wrapper']}>
                  <Text
                    size="medium"
                    color="dark-1"
                    weight={500}
                    className={style['title']}
                  >
                    {document.title}
                  </Text>
                  <Text color="dark-4">
                    {
                      memberList.find(
                        (member) => member.id === document.memberId
                      ).username
                    }
                  </Text>
                </div>
                <Text size="small" color="dark-2" className={style['content']}>
                  {document.content}
                </Text>
              </CardBody>
            </Card>

            <div
              className={style['modal-wrapper']}
              data-modal={document.id}
              onClick={(e) => closeDocumentModal(e, document.id)}
            >
              <div
                className={style['modal']}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style['document']}>
                  <Text
                    size="large"
                    color="dark-1"
                    weight={500}
                    className={style['title']}
                  >
                    {document.title}
                  </Text>
                  <div className={style['info']}>
                    <Text color="dark-2" className={style['author']}>
                      {
                        memberList.find(
                          (member) => member.id === document.memberId
                        ).username
                      }
                    </Text>
                    <Text
                      size="small"
                      color="dark-3"
                      className={style['created']}
                    >
                      {formatTime(document.created)}
                    </Text>
                  </div>
                  <Text
                    color="dark-1"
                    weight={500}
                    className={style['content']}
                  >
                    {document.content}
                  </Text>
                </div>
                <div className={style['comment-container']}>
                  <Text size="medium" className={style['title']}>
                    댓글
                  </Text>
                  {commentList.map((comment) => (
                    <div className={style['comment-wrapper']} key={comment.id}>
                      <Text
                        size="normal"
                        color="dark-1"
                        className={style['content']}
                      >
                        {comment.content}
                      </Text>
                      <div className={style['info']}>
                        <Text
                          size="small"
                          color="dark-2"
                          className={style['author']}
                        >
                          {
                            memberList.find(
                              (member) => member.id === document.memberId
                            ).username
                          }
                        </Text>
                        <Text size="small" color="dark-3">
                          {formatTime(comment.created)}
                        </Text>
                      </div>
                    </div>
                  ))}
                  <div className={style['comment-add-window']}>
                    <textarea
                      className={style['content-input']}
                      placeholder="댓글 내용"
                      data-comment-input
                    ></textarea>
                    <button
                      className={style['submit-btn']}
                      onClick={(e) => submitComment(e, document.id)}
                    >
                      입력
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Board
