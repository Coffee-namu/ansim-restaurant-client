import { format } from 'date-fns'
import GoogleMapReact from 'google-map-react'
import { Box, Button, Heading, Image, Paragraph, TextArea } from 'grommet'
import React, { useState } from 'react'
import style from '../styles/details.module.scss'

type Review = {
  username: string
  content: string
  reviewdAt: number
}

const reviews: Review[] = [
  {
    username: '최현준',
    content: '맛없어요',
    reviewdAt: Date.now(),
  },
  {
    username: '최현준',
    content: '맛없어요',
    reviewdAt: Date.now(),
  },
  {
    username: '최현준',
    content: '맛없어요',
    reviewdAt: Date.now(),
  },
  {
    username: '최현준',
    content: '맛없어요',
    reviewdAt: Date.now(),
  },
  {
    username: '최현준',
    content: '맛없어요',
    reviewdAt: Date.now(),
  },
  {
    username: '최현준',
    content: '맛없어요',
    reviewdAt: Date.now(),
  },
]

const NewReviewModal: React.FC<{ done: (content: string) => void }> = ({
  done,
}) => {
  const [content, setContent] = useState('')

  return (
    <div className={style['new-review-modal']}>
      <div className={style['body']}>
        <h2>새 리뷰 작성</h2>
        <TextArea
          placeholder="내용을 입력해주세요."
          fill
          resize={false}
          style={{
            height: '500px',
          }}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Box direction="row">
          <Button
            label="취소"
            onClick={() => {
              setContent('')
              done(null)
            }}
          />
          <Button
            label="완료"
            onClick={() => {
              setContent('')
              done(content)
            }}
          />
        </Box>
      </div>
    </div>
  )
}

const ReviewItem: React.FC<Review> = ({ username, content, reviewdAt }) => {
  return (
    <div className={style['review-item']}>
      <div className={style['username-date']}>
        <span className={style['username']}>{username}</span>
        <span className={style['date']}>
          {format(reviewdAt, 'MM/dd HH:mm')}
        </span>
      </div>
      <div>{content}</div>
    </div>
  )
}

const Details: React.FC = () => {
  const [newReviewModalOpen, setNewReviewModalOpen] = useState(false)

  return (
    <div id={style['details-page']}>
      <button
        onClick={() => {
          window.history.back()
        }}
      >
        뒤로가기
      </button>
      <Heading>홍콩반점</Heading>
      <div className={style['image-wrapper']}>
        <Image
          className={style['image']}
          fit="cover"
          src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20180922025357836_photo1_73870946ffb8.jpg"
        />
      </div>
      <Paragraph fill className={style.description}>
        식당 설명임
      </Paragraph>

      <div className={style.map}>
        <GoogleMapReact
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        ></GoogleMapReact>
      </div>

      <section className={style['reviews']}>
        <div className={style['review-header']}>
          <h2 className={style['title']}>리뷰</h2>
          <button
            className={style['new']}
            onClick={() => {
              setNewReviewModalOpen(true)
            }}
          >
            리뷰 남기기
          </button>
        </div>
        {reviews.map((review, i) => (
          <ReviewItem
            {...{ ...review, reviewdAt: review.reviewdAt - i * 100000000 }}
            key={i}
          />
        ))}
      </section>

      <div
        style={{
          display: newReviewModalOpen ? 'block' : 'none',
        }}
      >
        <NewReviewModal
          done={(content) => {
            setNewReviewModalOpen(false)

            if (content) {
              // TODO: 리뷰 업로드
              console.log(content)
            }
          }}
        />
      </div>
    </div>
  )
}

export default Details
