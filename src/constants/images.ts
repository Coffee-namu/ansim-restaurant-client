export const IMAGES = {
  '한식': [
    'https://www.gyeongju.go.kr/upload/content/thumb/20200506/A2557E525C964580890E3878AA677A90.jpg',
    'https://www.fsnews.co.kr/news/photo/201902/32707_27510_4314.jpg',
    'https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/07/01/20190701000670_0.jpg',
    'https://image.ytn.co.kr/general/jpg/2016/0424/201604241752313492_t.jpg',
    'https://img4.tmon.kr/cdn3/deals/2020/04/27/3455335334/original_3455335334_front_20a3d_1587970761production.jpg',
    'https://t1.daumcdn.net/liveboard/SNUH/3b80ed1c420a47a0af3c411cfc00326c.JPG',
    'https://cdn.mkhealth.co.kr/news/photo/201911/img_MKH191128001_0.jpg',
    'https://newsimg.hankookilbo.com/cms/articlerelease/2020/06/11/202006111362061920_7.jpg',
    'https://image.yes24.com/momo/TopCate2049/MidCate10/204897291.jpg'
  ],
  '일식': [
    'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956&q=80&rw=750&rh=536',
    'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F171AEF4850F77B8A13',
    'https://t1.daumcdn.net/cfile/tistory/122959414F35DF7D2B',
    'https://www.kr.jal.co.jp/world/en/guidetojapan/detail/img/bentoboxes/bentoboxes_01.jpg',
    'https://d3hg7snzn13jf0.cloudfront.net/files/allabout/268/268--707c736225200ed281d50fcb6e378198.jpg'
  ],
  '중식': [
    'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9928F7345DD5007724',
    'https://menu.mt.co.kr/moneyweek/thumb/2018/10/17/06/2018101708548057667_1.jpg',
    'https://www.cctvnews.co.kr/news/photo/201604/47966_49851_1143.JPG',
    'https://lh3.googleusercontent.com/proxy/v3OKBvRQ-qSBediy0EcNcCIQNYA8PgQnOTs7OIDWIO8b8RTD2dQE0Tm_2rDH-isIAuWqk7u0BRd2xZjTxcKIQRwNVYZHxHXY0pwWGZ2zkp5DZ-g',
    'https://lh3.googleusercontent.com/proxy/IQ49haq1zO0QKGiIddLdQUjR1uiNBGhZ7jKhskvPrcOScxR7XAUm3CfwI9AQWsGIrGPhFBDsIvn2eQEblNFKJzFV4KgAwvXbS2lgg5P8RcsHPq2ZaV80aJxB5UZxbhKqBKEqzUvBU6fWEDzXmQ'
  ],
  '서양식': [
    'https://lh3.googleusercontent.com/proxy/8_iyru6Sj3CUl8ST8sAO1To0v67ttGlgBDHX8xewzD1OcSxKB-WZYoGxUfWc8maOBlcM7WiOi9kHc6bayuM2JI4-unFBNducwMWN0eTr4NDGAbWz2hIIEXCgPk5e0fF7zXxOZcyKn8GTwPmnnvpw3SrtjJylFw',
    'https://image.yes24.com/images/chyes/bookshelf/newyork/20110401/02.jpg',
    'https://t1.daumcdn.net/cfile/tistory/9906C1335A1C70842A',
    'https://image.edaily.co.kr/images/Photo/files/NP/S/2011/12/PS11122600066.JPG',
    'https://cdn.crowdpic.net/list-thumb/thumb_l_D49378726BA3EA2D18DDFB37A519F0E0.jpg'
  ],
  '기타외국식': [
    'https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2018/08/5b7e023328857_5b7e02117ec3f_1869520439.jpg',
    'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/2Xzt/image/L53gDsE8gGmehcK6OzlHYshpjqk.jpg',
    'https://homecuisine.co.kr/files/attach/images/142/608/021/e04470476c1a435f70ffba93b9de2ba7.jpg',
    'https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2019/05/16/788f68160a664524b804b9af0be4fa0b_Hanoi-best-pho.jpg'
  ],
  '기타 음식점': [
    'https://img.hankyung.com/photo/201912/99.11408081.1.jpg',
    'https://cdn.dominos.co.kr/admin/upload/goods/20200508_meNt8ICm.jpg',
    'https://img.hani.co.kr/imgdb/resize/2017/0709/149948783091_20170709.JPG',
    'https://kr.savorjapan.com/gg/content_image/t0264_001.jpg'
  ]
}

export const getCategoryImage = (category, number) => IMAGES[category][number % IMAGES[category].length]