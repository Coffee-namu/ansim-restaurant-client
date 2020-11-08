import { Card, CardBody, CardHeader, Text, Heading } from 'grommet'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import style from '../styles/list.module.scss'

const mockRestaurantList = [
  {
    id: 1,
    name: '새마을식당1',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc:
      'http://ph.spotvnews.co.kr/news/photo/201902/267761_329304_0743.jpg',
  },
  {
    id: 2,
    name: '새마을식당2',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjBfMTA1/MDAxNTg3MzA5NDkwNjc4.HxVAbVkabnOZf3u7xatnzrdfdoIR9JsUZVijjN8WWbIg.hGmumxpWbJ19iIQgZlLFPhVtchaRERSJtha4mAB65tog.JPEG.eett7777/IMG_2966.jpg?type=w800',
  },
  {
    id: 3,
    name: '새마을식당3',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc:
      'https://i.pinimg.com/originals/5c/03/0c/5c030c3a53a3d7e7d39471a2dfa7abe1.jpg',
  },
  {
    id: 4,
    name: '새마을식당4',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc: 'https://i.ytimg.com/vi/1CWN3XzQHIA/maxresdefault.jpg',
  },
  {
    id: 5,
    name: '새마을식당1',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc:
      'http://ph.spotvnews.co.kr/news/photo/201902/267761_329304_0743.jpg',
  },
  {
    id: 6,
    name: '새마을식당2',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDA0MjBfMTA1/MDAxNTg3MzA5NDkwNjc4.HxVAbVkabnOZf3u7xatnzrdfdoIR9JsUZVijjN8WWbIg.hGmumxpWbJ19iIQgZlLFPhVtchaRERSJtha4mAB65tog.JPEG.eett7777/IMG_2966.jpg?type=w800',
  },
  {
    id: 7,
    name: '새마을식당3',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc:
      'https://i.pinimg.com/originals/5c/03/0c/5c030c3a53a3d7e7d39471a2dfa7abe1.jpg',
  },
  {
    id: 8,
    name: '새마을식당4',
    location: {
      sido: '경기도',
      sigungu: '군포시',
    },
    category: '한식',
    imgSrc: 'https://i.ytimg.com/vi/1CWN3XzQHIA/maxresdefault.jpg',
  },
]

const List: React.FC = () => {
  return <div>디테일</div>
}

export default List
