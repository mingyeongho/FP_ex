/**
 * 구독자들에게 쿠폰을 보내주는 기능.
 * 구독자의 친구 추천 수에 따라 보내주는 쿠폰의 등급이 다름.
 * 1. 추천 수가 10명 이상일 경우에는 BEST 등급의 쿠폰을 보내줌.
 * 2. 그렇지 않을 경우에는 GOOD 등급의 쿠폰을 보내줌.
 * 쿠폰은 NORMAL, GOOD, BEST 등급이 있음.
 * NORMAL 등급의 쿠폰은 구독자들에게 보내주지 않음.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var COUPON_RANK;
(function (COUPON_RANK) {
    COUPON_RANK[COUPON_RANK["NORMAL"] = 0] = "NORMAL";
    COUPON_RANK[COUPON_RANK["GOOD"] = 1] = "GOOD";
    COUPON_RANK[COUPON_RANK["BEST"] = 2] = "BEST";
})(COUPON_RANK || (COUPON_RANK = {}));
var COUPON_DB = [
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
var SUBSCRIBER_DB = [
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
function fetchCoupons() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(COUPON_DB);
                    }, 1000);
                })];
        });
    });
}
function fetchSubscribers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(SUBSCRIBER_DB);
                    }, 1000);
                })];
        });
    });
}
function sendMail(_a) {
    var subscriber = _a.subscriber, targetCoupons = _a.targetCoupons;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        console.log("".concat(subscriber.name, "\uB2D8\uAED8 ").concat(targetCoupons
                            .map(function (coupon) { return coupon.name; })
                            .join(", "), " \uCFE0\uD3F0\uC744 \uBCF4\uB0C8\uC2B5\uB2C8\uB2E4."));
                        resolve(undefined);
                    }, 1000);
                })];
        });
    });
}
// 함수형 사고 아님.
function main() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var coupons, subscribers, _d, subscribers_1, subscribers_1_1, subscriber, targetCoupons, targetCoupons, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, fetchCoupons()];
                case 1:
                    coupons = _e.sent();
                    return [4 /*yield*/, fetchSubscribers()];
                case 2:
                    subscribers = _e.sent();
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 11, 12, 17]);
                    _d = true, subscribers_1 = __asyncValues(subscribers);
                    _e.label = 4;
                case 4: return [4 /*yield*/, subscribers_1.next()];
                case 5:
                    if (!(subscribers_1_1 = _e.sent(), _a = subscribers_1_1.done, !_a)) return [3 /*break*/, 10];
                    _c = subscribers_1_1.value;
                    _d = false;
                    subscriber = _c;
                    if (!(subscriber.recommendCount >= 10)) return [3 /*break*/, 7];
                    targetCoupons = coupons.filter(function (coupon) { return coupon.rank === COUPON_RANK.BEST; });
                    return [4 /*yield*/, sendMail({ subscriber: subscriber, targetCoupons: targetCoupons })];
                case 6:
                    _e.sent();
                    return [3 /*break*/, 9];
                case 7:
                    targetCoupons = coupons.filter(function (coupon) { return coupon.rank === COUPON_RANK.GOOD; });
                    return [4 /*yield*/, sendMail({ subscriber: subscriber, targetCoupons: targetCoupons })];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9:
                    _d = true;
                    return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _e.trys.push([12, , 15, 16]);
                    if (!(!_d && !_a && (_b = subscribers_1.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _b.call(subscribers_1)];
                case 13:
                    _e.sent();
                    _e.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
// ------------------------------------------------------------------------------
// 위 코드에서 불편한 점.
// 1. main을 실행하기 전까지 누가 어떤 쿠폰을 받는지 확인할 수 없음. -> 누구에게 어떤 쿠폰을 보낼것인지 함수로 만들어놓으면 테스트하기 좋음.
// 2. targetCoupons의 구현이 중복됨. -> 함수로 빼서 중복을 제거.
function getCouponsByRank(_a) {
    var coupons = _a.coupons, rank = _a.rank;
    return coupons.filter(function (coupon) { return coupon.rank === rank; });
}
// 구독자 한 명이 받을 이메일 내용을 만드는 함수
function makeMail(_a) {
    var subscriber = _a.subscriber, goodCoupons = _a.goodCoupons, bestCoupons = _a.bestCoupons;
    var targetCoupons = subscriber.recommendCount >= 10 ? bestCoupons : goodCoupons;
    return {
        from: "Me",
        to: subscriber.name,
        coupons: targetCoupons.map(function (coupon) { return coupon.name; }),
    };
}
// 모든 구독자들에게 보낼 이메일 목록을 만드는 함수
function makeMails(_a) {
    var subscribers = _a.subscribers, goodCoupons = _a.goodCoupons, bestCoupons = _a.bestCoupons;
    return subscribers.map(function (subscriber) {
        return makeMail({ subscriber: subscriber, goodCoupons: goodCoupons, bestCoupons: bestCoupons });
    });
}
function sendMail2(mails) {
    var _a, mails_1, mails_1_1;
    var _b, e_2, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, e_2_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 6, 7, 12]);
                    _loop_1 = function () {
                        var mail;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = mails_1_1.value;
                                    _a = false;
                                    mail = _d;
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            setTimeout(function () {
                                                console.log("".concat(mail.from, "\uB2D8\uC774 ").concat(mail.to, "\uB2D8\uAED8 ").concat(mail.coupons
                                                    .map(function (coupon) { return coupon; })
                                                    .join(", "), "\uCFE0\uD3F0\uC744 \uBCF4\uB0C8\uC2B5\uB2C8\uB2E4."));
                                                resolve(undefined);
                                            }, 1000);
                                        })];
                                case 1:
                                    _f.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = true, mails_1 = __asyncValues(mails);
                    _e.label = 1;
                case 1: return [4 /*yield*/, mails_1.next()];
                case 2:
                    if (!(mails_1_1 = _e.sent(), _b = mails_1_1.done, !_b)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1()];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = mails_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(mails_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// 함수형 사고 적용
function main2() {
    return __awaiter(this, void 0, void 0, function () {
        var coupons, subscribers, bestCoupons, goodCoupons, mails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCoupons()];
                case 1:
                    coupons = _a.sent();
                    return [4 /*yield*/, fetchSubscribers()];
                case 2:
                    subscribers = _a.sent();
                    bestCoupons = getCouponsByRank({ coupons: coupons, rank: COUPON_RANK.BEST });
                    goodCoupons = getCouponsByRank({ coupons: coupons, rank: COUPON_RANK.GOOD });
                    mails = makeMails({ subscribers: subscribers, goodCoupons: goodCoupons, bestCoupons: bestCoupons });
                    //   console.log(mails);
                    return [4 /*yield*/, sendMail2(mails)];
                case 3:
                    //   console.log(mails);
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main2();
