/**
 * 구독자들에게 쿠폰을 보내주는 기능.
 * 구독자의 친구 추천 수에 따라 보내주는 쿠폰의 등급이 다름.
 * 1. 추천 수가 10명 이상일 경우에는 BEST 등급의 쿠폰을 보내줌.
 * 2. 그렇지 않을 경우에는 GOOD 등급의 쿠폰을 보내줌.
 * 쿠폰은 NORMAL, GOOD, BEST 등급이 있음.
 * NORMAL 등급의 쿠폰은 구독자들에게 보내주지 않음.
 */

enum COUPON_RANK {
  NORMAL,
  GOOD,
  BEST,
}

type Coupon = {
  name: string;
  rank: COUPON_RANK;
};

type Subscriber = {
  name: string;
  recommendCount: number;
};

const COUPON_DB: Coupon[] = [
  { name: "Coupang", rank: COUPON_RANK.GOOD },
  { name: "11st", rank: COUPON_RANK.BEST },
  { name: "Gmarket", rank: COUPON_RANK.GOOD },
  { name: "Musinsa", rank: COUPON_RANK.NORMAL },
  { name: "Samsung", rank: COUPON_RANK.BEST },
  { name: "Apple", rank: COUPON_RANK.GOOD },
  { name: "Xiaomi", rank: COUPON_RANK.NORMAL },
  { name: "Microsoft", rank: COUPON_RANK.BEST },
  { name: "Amazon", rank: COUPON_RANK.GOOD },
  { name: "Nvidia", rank: COUPON_RANK.BEST },
  { name: "SSG", rank: COUPON_RANK.GOOD },
  { name: "Naver", rank: COUPON_RANK.NORMAL },
  { name: "Kakao", rank: COUPON_RANK.BEST },
  { name: "Benz", rank: COUPON_RANK.GOOD },
  { name: "Coca-cola", rank: COUPON_RANK.NORMAL },
  { name: "Nike", rank: COUPON_RANK.BEST },
  { name: "McDonald", rank: COUPON_RANK.GOOD },
  { name: "Intel", rank: COUPON_RANK.BEST },
  { name: "Tesla", rank: COUPON_RANK.GOOD },
  { name: "Google", rank: COUPON_RANK.NORMAL },
];

const SUBSCRIBER_DB: Subscriber[] = [
  { name: "김철수", recommendCount: 5 },
  { name: "이영희", recommendCount: 12 },
  { name: "박민수", recommendCount: 8 },
  { name: "최지우", recommendCount: 15 },
  { name: "정수현", recommendCount: 3 },
  { name: "한지민", recommendCount: 20 },
  { name: "카리나", recommendCount: 7 },
  { name: "신동엽", recommendCount: 11 },
  { name: "유재석", recommendCount: 9 },
  { name: "강호동", recommendCount: 13 },
  { name: "김혜수", recommendCount: 6 },
  { name: "송중기", recommendCount: 14 },
  { name: "전지현", recommendCount: 4 },
  { name: "이병헌", recommendCount: 10 },
  { name: "김태희", recommendCount: 2 },
  { name: "장동건", recommendCount: 18 },
  { name: "원빈", recommendCount: 1 },
  { name: "이준기", recommendCount: 16 },
  { name: "수지", recommendCount: 19 },
  { name: "아이유", recommendCount: 17 },
];

async function fetchCoupons(): Promise<Coupon[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(COUPON_DB);
    }, 1000);
  });
}

async function fetchSubscribers(): Promise<Subscriber[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SUBSCRIBER_DB);
    }, 1000);
  });
}

async function sendMail({
  subscriber,
  targetCoupons,
}: {
  subscriber: Subscriber;
  targetCoupons: Coupon[];
}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        `${subscriber.name}님께 ${targetCoupons
          .map((coupon) => coupon.name)
          .join(", ")} 쿠폰을 보냈습니다.`
      );
      resolve(undefined);
    }, 1000);
  });
}

// 함수형 사고 아님.
async function main() {
  const coupons = await fetchCoupons();
  const subscribers = await fetchSubscribers();

  for await (const subscriber of subscribers) {
    if (subscriber.recommendCount >= 10) {
      const targetCoupons = coupons.filter(
        (coupon) => coupon.rank === COUPON_RANK.BEST
      );
      await sendMail({ subscriber, targetCoupons });
    } else {
      const targetCoupons = coupons.filter(
        (coupon) => coupon.rank === COUPON_RANK.GOOD
      );
      await sendMail({ subscriber, targetCoupons });
    }
  }
}

// ------------------------------------------------------------------------------

// 위 코드에서 불편한 점.
// 1. main을 실행하기 전까지 누가 어떤 쿠폰을 받는지 확인할 수 없음. -> 누구에게 어떤 쿠폰을 보낼것인지 함수로 만들어놓으면 테스트하기 좋음.
// 2. targetCoupons의 구현이 중복됨. -> 함수로 빼서 중복을 제거.

function getCouponsByRank({
  coupons,
  rank,
}: {
  coupons: Coupon[];
  rank: COUPON_RANK;
}) {
  return coupons.filter((coupon) => coupon.rank === rank);
}

type Mail = {
  from: string;
  to: string;
  coupons: string[];
};

// 구독자 한 명이 받을 이메일 내용을 만드는 함수
function makeMail({
  subscriber,
  goodCoupons,
  bestCoupons,
}: {
  subscriber: Subscriber;
  goodCoupons: Coupon[];
  bestCoupons: Coupon[];
}): Mail {
  const targetCoupons =
    subscriber.recommendCount >= 10 ? bestCoupons : goodCoupons;

  return {
    from: "Me",
    to: subscriber.name,
    coupons: targetCoupons.map((coupon) => coupon.name),
  };
}

// 모든 구독자들에게 보낼 이메일 목록을 만드는 함수
function makeMails({
  subscribers,
  goodCoupons,
  bestCoupons,
}: {
  subscribers: Subscriber[];
  goodCoupons: Coupon[];
  bestCoupons: Coupon[];
}) {
  return subscribers.map((subscriber) =>
    makeMail({ subscriber, goodCoupons, bestCoupons })
  );
}

async function sendMail2(mails: Mail[]) {
  for await (const mail of mails) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `${mail.from}님이 ${mail.to}님께 ${mail.coupons
            .map((coupon) => coupon)
            .join(", ")}쿠폰을 보냈습니다.`
        );
        resolve(undefined);
      }, 1000);
    });
  }
}

// 함수형 사고 적용
async function main2() {
  const coupons = await fetchCoupons();
  const subscribers = await fetchSubscribers();
  const bestCoupons = getCouponsByRank({ coupons, rank: COUPON_RANK.BEST });
  const goodCoupons = getCouponsByRank({ coupons, rank: COUPON_RANK.GOOD });
  const mails = makeMails({ subscribers, goodCoupons, bestCoupons }); // 이메일을 보낼 전체 목록을 만듦으로써 실제로 메일을 보내지 않아도 테스트하기 쉬워짐.
  //   console.log(mails);
  await sendMail2(mails);
}

main2();
