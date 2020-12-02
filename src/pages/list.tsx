import Axios from 'axios'
import { Card, CardBody, CardHeader, Text, Heading } from 'grommet'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CATEGORIES } from '../constants/categories'
import { getCategoryImage } from '../constants/images'
import { CAU_LOCATION } from '../constants/locations'
import style from '../styles/list.module.scss'
import { apiHost } from '../utils/api-host'

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

const LOAD_GAP: number = 300
const LOAD_SIZE: number = 24
const TIME_GAP: number = 1000 * 60 * 10 // 600000ms = 10minutes
const IMAGE_KEYS = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
}

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

  const loadRestaurants = async () => {
    const loadAPI = async () => {
      try {
        const { data } = await Axios.get(apiHost(`/api/v1/ansim`), {
          params: {
            x: CAU_LOCATION.x,
            y: CAU_LOCATION.y,
            pageNum,
            pageSize: LOAD_SIZE,
          },
        })

        return data.map((restaurant) => {
          IMAGE_KEYS[restaurant.category_id]++

          return {
            id: restaurant.restaurant_id,
            name: restaurant.name,
            location: {
              sido: restaurant.location.split(' ')[0],
              sigungu: restaurant.location.split(' ')[1],
            },
            category: CATEGORIES[restaurant.category_id],
            imgSrc: getCategoryImage(
              CATEGORIES[restaurant.category_id],
              IMAGE_KEYS[restaurant.category_id]
            ),
          }
        })
      } catch (e) {
        console.log(e)
      }
    }

    const loadedList = await loadAPI()

    if (loadedList.length > 0) {
      setRestaurantList([...restaurantList, ...loadedList])
      setPageNum(pageNum + 1)
    }
  }

  useEffect(() => {
    const [
      cachedRestaurantList,
      cachedPageNum,
      cachedtime,
    ] = restaurantListCache.get()

    const timeGap = cachedtime
      ? new Date().getTime() - cachedtime.getTime()
      : Infinity

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
      <header className={style['header']}>
        <Heading level="2" className={style['page-title']}>
          내 주변 안심 식당
        </Heading>
        <Link href={'/board'}>게시판</Link>
      </header>
      <div className={style['restaurant-list']}>
        {restaurantList.map((restaurant) => (
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
        ))}
      </div>
    </div>
  )
}

export default List
