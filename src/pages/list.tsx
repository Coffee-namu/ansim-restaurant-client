import { Card, CardBody, CardHeader, Text, Heading } from 'grommet'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/list.module.scss'

type Restaurant = {
  id: number
  name: string
  location: {
    sido: string
    sigungu: string
  }
  category: string
  imgSrc: string
}

const mockRestaurantList: Restaurant[] = [
  {
    id: 1,
    name: '봉이돈까스',
    location: {
      sido: '서울시',
      sigungu: '관악구',
    },
    category: '양식',
    imgSrc:
      'http://ph.spotvnews.co.kr/news/photo/201902/267761_329304_0743.jpg',
  },
  {
    id: 2,
    name: '쿠모식당',
    location: {
      sido: '서울시',
      sigungu: '관악구',
    },
    category: '일식',
    imgSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjBfMTA1/MDAxNTg3MzA5NDkwNjc4.HxVAbVkabnOZf3u7xatnzrdfdoIR9JsUZVijjN8WWbIg.hGmumxpWbJ19iIQgZlLFPhVtchaRERSJtha4mAB65tog.JPEG.eett7777/IMG_2966.jpg?type=w800',
  },
  {
    id: 3,
    name: '그림나베',
    location: {
      sido: '서울시',
      sigungu: '서초구',
    },
    category: '일식',
    imgSrc:
      'https://i.pinimg.com/originals/5c/03/0c/5c030c3a53a3d7e7d39471a2dfa7abe1.jpg',
  },
  {
    id: 4,
    name: '유타로',
    location: {
      sido: '인천시',
      sigungu: '남동구',
    },
    category: '일식',
    imgSrc: 'https://i.ytimg.com/vi/1CWN3XzQHIA/maxresdefault.jpg',
  },
  {
    id: 5,
    name: '준호네 부대찌개',
    location: {
      sido: '서울시',
      sigungu: '동작구',
    },
    category: '한식',
    imgSrc: 'https://img.hankyung.com/photo/201905/03.19618685.1.jpg',
  },
  {
    id: 6,
    name: '아방궁',
    location: {
      sido: '서울시',
      sigungu: '강남구',
    },
    category: '중식',
    imgSrc:
      'https://image.ytn.co.kr/osen/2020/07/ddfd0b77-73c5-4b18-9a07-33b65c12b312.jpg',
  },
  {
    id: 7,
    name: '토끼정',
    location: {
      sido: '서울시',
      sigungu: '강남구',
    },
    category: '일식',
    imgSrc: 'https://i.ytimg.com/vi/nSGjL2yHnuU/maxresdefault.jpg',
  },
  {
    id: 8,
    name: '은행골',
    location: {
      sido: '서울시',
      sigungu: '동작구',
    },
    category: '일식',
    imgSrc:
      'https://t1.daumcdn.net/liveboard/hairfit/8151c499a80f46d1bb70a621cf5d38e9.JPG',
  },
]

for (let i = 0; i < 136; i++) {
  const copy = { ...mockRestaurantList[i % 8] }
  copy.id = copy.id + (i + 1) * 8
  mockRestaurantList.push(copy)
}

const LOAD_GAP: number = 300
const LOAD_SIZE: number = 24
const TIME_GAP: number = 1000 * 60 * 10 // 600000ms = 10minutes

const restaurantListCache = (() => {
  const RESTAURANT_LIST: string = 'restaurantList'
  const PAGE_NUM: string = 'pageNum'
  const TIME: string = 'time'

  return {
    get(): [Restaurant[], number, Date] {
      return [
        JSON.parse(localStorage.getItem(RESTAURANT_LIST)),
        +localStorage.getItem(PAGE_NUM),
        new Date(localStorage.getItem(TIME)),
      ]
    },
    set: (restaurantList: Restaurant[], pageNum: number): void => {
      if (+localStorage.getItem(PAGE_NUM) !== pageNum)
        localStorage.setItem(TIME, new Date().toString())

      localStorage.setItem(RESTAURANT_LIST, JSON.stringify(restaurantList))
      localStorage.setItem(PAGE_NUM, JSON.stringify(pageNum))
    },
  }
})()

const List: React.FC = () => {
  const listPage = useRef(null)
  const [pageNum, setPageNum] = useState<number>(0)
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([])

  const loadRestaurants = (): void => {
    setTimeout(async () => {
      const loadAPI = () => {
        return new Promise<Restaurant[]>((resolve, reject) => {
          setTimeout(function () {
            const loadedList = mockRestaurantList.slice(
              pageNum * LOAD_SIZE,
              (pageNum + 1) * LOAD_SIZE
            )
            resolve(loadedList)
          }, 200)
        })
      }

      const loadedList = await loadAPI()

      if (loadedList.length > 0) {
        setRestaurantList([...restaurantList, ...loadedList])
        setPageNum(pageNum + 1)
      }
    }, 20)
  }

  useEffect(() => {
    const [
      cachedRestaurantList,
      cachedPageNum,
      cachedtime,
    ] = restaurantListCache.get()

    const timeGap = new Date().getTime() - cachedtime.getTime()

    if (timeGap < TIME_GAP && cachedRestaurantList && cachedPageNum) {
      setRestaurantList(cachedRestaurantList)
      setPageNum(cachedPageNum)
    } else {
      loadRestaurants()
    }
  }, [])

  useEffect(() => {
    if (restaurantList && pageNum)
      restaurantListCache.set(restaurantList, pageNum)
  }, [restaurantList, pageNum])

  let [isScrollAllow, isLoadAllow]: [boolean, boolean] = [true, true]
  const scrollHandler = (): void => {
    if (!isScrollAllow) return
    isScrollAllow = false

    setTimeout(() => {
      isScrollAllow = true
    })

    const { offsetHeight, scrollTop, scrollHeight } = listPage.current
    const gap = scrollHeight - (offsetHeight + scrollTop)

    if (gap <= LOAD_GAP) {
      if (!isLoadAllow) return
      isLoadAllow = false

      loadRestaurants()
    }
  }

  return (
    <div
      id={style['restaurant-list-page']}
      onScroll={scrollHandler}
      ref={listPage}
    >
      <Heading level="2" className={style['page-title']}>
        내 주변 안심 식당
      </Heading>
      <div className={style['restaurant-list']}>
        {restaurantList.map((restaurant) => {
          return (
            <Link href={`/details/${restaurant.id}`} key={restaurant.id}>
              <Card background="light-1" className={style['card']}>
                <CardHeader pad="none" className={style['header']}>
                  <div
                    className={style['restaurant-img']}
                    style={{
                      backgroundImage: `url(${restaurant.imgSrc})`,
                    }}
                  ></div>
                </CardHeader>
                <CardBody className={style['body']}>
                  <div className={style['info-wrapper']}>
                    <Text
                      size="medium"
                      color="dark-1"
                      weight={500}
                      className={style['restaurant-name']}
                    >
                      {restaurant.name}
                    </Text>
                    <Text
                      size="small"
                      color="dark-2"
                      className={style['restaurant-location']}
                    >
                      {restaurant.location.sido} {restaurant.location.sigungu}
                    </Text>
                  </div>
                  <div className={style['category']}>{restaurant.category}</div>
                </CardBody>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default List
