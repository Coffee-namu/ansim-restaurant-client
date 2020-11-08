import { format } from 'date-fns'
import GoogleMapReact from 'google-map-react'
import { Box, Button, Heading, Image, Paragraph, TextArea } from 'grommet'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import styles from '../../styles/details.module.scss'

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
    <div className={styles['new-review-modal']}>
      <div className={styles['body']}>
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
    <div className={styles['review-item']}>
      <div className={styles['username-date']}>
        <span className={styles['username']}>{username}</span>
        <span className={styles['date']}>
          {format(reviewdAt, 'MM/dd HH:mm')}
        </span>
      </div>
      <div>{content}</div>
    </div>
  )
}

type DetailsPageProps = {
  restaurantName: string
}

const Details: React.FC<DetailsPageProps> = ({ restaurantName }) => {
  const [newReviewModalOpen, setNewReviewModalOpen] = useState(false)

  return (
    <div id={styles['details-page']}>
      <button
        onClick={() => {
          window.history.back()
        }}
      >
        뒤로가기
      </button>
      <Heading>{restaurantName}</Heading>
      <div className={styles['image-wrapper']}>
        <Image
          className={styles['image']}
          fit="cover"
          src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20180922025357836_photo1_73870946ffb8.jpg"
        />
      </div>
      <Paragraph fill className={styles.description}>
        식당 설명임
      </Paragraph>

      <div className={styles.map}>
        <GoogleMapReact
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        ></GoogleMapReact>
      </div>

      <section className={styles['reviews']}>
        <div className={styles['review-header']}>
          <h2 className={styles['title']}>리뷰</h2>
          <button
            className={styles.button}
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

        <button
          className={styles.button}
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          리뷰 더
        </button>
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

export const getServerSideProps: GetServerSideProps<DetailsPageProps> = async ({
  params,
}) => {
  console.log(typeof params.restaurantId)
  // 레스토랑 정보 fetch

  return {
    props: {
      restaurantName: '홍콩반점',
    },
  }
}
