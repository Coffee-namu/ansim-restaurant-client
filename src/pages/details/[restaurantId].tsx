import Axios from 'axios'
import { format } from 'date-fns'
import GoogleMapReact from 'google-map-react'
import { Box, Button, Heading, Image, Paragraph, TextArea } from 'grommet'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/details.module.scss'
import { apiHost } from '../../utils/api-host'

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
        <Box
          direction="row"
          justify="center"
          margin={{
            top: '20px',
          }}
        >
          <button
            onClick={() => {
              setContent('')
              done(null)
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              setContent('')
              done(content)
            }}
          >
            완료
          </button>
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
  restaurantInfo: {
    restaurant_id: number
    category_id: number
    member_id: number
    name: string
    owner: boolean | null
    phone: boolean | null
    location: string
    geolocation_x: number
    geolocation_y: number
    description: string
    api_code_mafra: string
    api_code_gg: string
    is_trusty: number
    created: string
  }
}

const Details: React.FC<DetailsPageProps> = ({ restaurantInfo }) => {
  const [newReviewModalOpen, setNewReviewModalOpen] = useState(false)
  const [memberId, setMemberId] = useState(null)

  useEffect(() => {
    setMemberId(localStorage.getItem('member_id'))
  }, [setMemberId])

  return (
    <div id={styles['details-page']}>
      <button
        onClick={() => {
          window.history.back()
        }}
        className={styles.back}
      >
        &lt; 뒤로가기
      </button>
      <Heading>{restaurantInfo['name']}</Heading>
      {/* <div className={styles['image-wrapper']}>
        <Image
          className={styles['image']}
          fit="cover"
          src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20180922025357836_photo1_73870946ffb8.jpg"
        />
      </div> */}

      <a
        href={`https://map.naver.com/v5/search/${restaurantInfo['location']}`}
        target="_blank"
        className={styles['location']}
      >
        <div className={styles['naver']}>네이버 지도에서 보기</div>
        <div>{restaurantInfo['location']}</div>
      </a>

      {/* <div className={styles.map}>
        <GoogleMapReact
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={11}
        ></GoogleMapReact>
      </div> */}

      <section className={styles['reviews']}>
        <div className={styles['review-header']}>
          <h2 className={styles['title']}>리뷰</h2>
          {memberId && (
            <button
              className={styles.button}
              onClick={() => {
                setNewReviewModalOpen(true)
              }}
            >
              리뷰 남기기
            </button>
          )}
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
              Axios.put(
                apiHost(
                  `/api/v1/ansim/restaurant/${restaurantInfo['restaurant_id']}`
                ),
                {
                  restaurant_id: restaurantInfo['restaurant_id'],
                  member_id: memberId,
                  content,
                  score: 1,
                  created: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                }
              )
                .catch(() => {})
                .finally(() => {
                  alert('등록되었습니다.')
                })
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
  // 레스토랑 정보 fetch
  const { data: restaurantInfo } = await Axios.get(
    apiHost(`/api/v1/ansim/restaurant/${params.restaurantId}`)
  )

  console.log(restaurantInfo)

  return {
    props: {
      restaurantInfo,
    },
  }
}
