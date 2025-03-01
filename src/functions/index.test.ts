import {
  type Access,
  filterLocation,
  formatFilterAccess,
  formatFilterLocation,
} from "./index";
import { describe, expect, test } from "vitest";
import type { ContextFacility, Locations } from "./type";

const facility: ContextFacility = {
  isMapDialog: false,
  isPointDialog: false,
  code: 7,
  name: "鎌倉山荘",
  image: "TODO",
  location: "神奈川県鎌倉市扇ｶﾞ谷四丁目1番3号",
  locationPrefecture: "神奈川県",
  locationCity: "鎌倉市",
  locationTown: "扇ｶﾞ谷",
  staff: ["occupationalTherapist"],
  latlon: {
    lat: 35.3263545,
    lng: 139.5488975,
  },
  siteUrl:
    "https://kaigo.benesse-style-care.co.jp/area_kanagawa/kamakura/home_gd-sansou",
  access: {
    train: [
      {
        line: "JR横須賀線",
        station_name: "鎌倉駅",
        gate: "",
        distance_from_station: 940,
        time_to_walk: 12,
      },
      {
        line: "江ノ島電鉄線",
        station_name: "鎌倉駅",
        gate: "",
        distance_from_station: 940,
        time_to_walk: 12,
      },
    ],
    bus: [],
  },
  vacantNum: 4,
  vacantData: [
    { roomNum: "205", roomArea: 19.8 },
    { roomNum: "212", roomArea: 19.8 },
    { roomNum: "213", roomArea: 19.8 },
  ],
  notes:
    "【1月9日更新：則松】\n※退去予測有\n\n☆トイレ無からトイレ有になりました！\n☆鎌倉駅から徒歩圏内。\n利便性と緑豊かな環境の両立。25室の小規模安心感で唯一無二のホーム。\n\n\n【空室状況】\nB1トイレ付\n\nB２トイレ付\n■102号室：予約あり\n□205号室：案内可\n□212号室：案内可\n□213号室：案内可（トレイ工事ありのため2月以降入居）\n\n\n\n※2名利用可能な居室は107・202・213のみ。それ以外は定員1名です。\n\nB1　1人　トイレ有　 2室　→　B1　1人　トイレ有　1室（残り104号のみ）\nB2　1人　トイレ有　14室　→　B1　1人　トイレ有　15室\n\n\n【ホーム情報：4月現在】\n・平均年齢：84.6歳 \n・平均介護度：2.5\n・男性2名/女性22名\n\n202305時点\n・作業療法士：週１\n・言語聴覚士：必要時依頼\n\n\n【付帯設備】\n空室にトイレ洗面あり\n\n\n【アピールポイント】\n★落ち着いた空間と源氏山の豊かな自然が魅力です。桜がキレイな中庭あり。 \n★介護度進行予防運動を取り入れています。",
  entranceFee: [0, 15800000],
  monthlyBudget: [281530, 722610],
  careLevels: [
    "自立",
    "要介護1",
    "要介護2",
    "要介護3",
    "要介護4",
    "要介護5",
    "要支援1",
    "要支援2",
  ],
  rooms: [
    {
      roomNumber: "100",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: false,
    },
    {
      roomNumber: "101",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "102",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "103",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "104",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "105",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "106",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "107",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "108",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "109",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "201",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "202",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "203",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: false,
    },
    {
      roomNumber: "204",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "205",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "206",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "207",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "208",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "209",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "210",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "211",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: false,
    },
    {
      roomNumber: "212",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "213",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: false,
    },
    {
      roomNumber: "214",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: true,
    },
    {
      roomNumber: "215",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: false,
    },
    {
      roomNumber: "216",
      hasKitchen: false,
      hasBath: false,
      area: 19.8,
      hasWashlet: false,
    },
  ],
  acceptances: [
    "suction",
    "homeOxygen",
    "tracheostomy",
    "ventilator",
    "insulinAdministration",
    "tubeNutrition",
    "centralVenousNutrition",
    "urinaryBalloon",
  ],
};

describe("formatFilterAccessテスト", () => {
  test("同じ路線で駅が2つ以上あり、そのうち空プロパティがある場合はプロパティを削除。", () => {
    const data: Access = {
      山手線: {
        "": Number.POSITIVE_INFINITY,
        目白駅: Number.POSITIVE_INFINITY,
      },
    };
    const expectedData: Access = {
      山手線: {
        目白駅: Number.POSITIVE_INFINITY,
      },
    };
    const formattedData = formatFilterAccess(data);
    expect(formattedData).toEqual(expectedData);
  });
  test("駅が一つしかなく、空のプロパティの場合は、access.tsの該当する値を入れて補完。", () => {
    const data: Access = {
      山手線: {
        "": Number.POSITIVE_INFINITY,
      },
    };
    const expectedData: Access = {
      山手線: {
        目白駅: Number.POSITIVE_INFINITY,
        恵比寿駅: Number.POSITIVE_INFINITY,
      },
    };
    const formattedData = formatFilterAccess(data);
    expect(formattedData).toEqual(expectedData);
  });
});

describe("formatFilterLocationテスト", () => {
  test("同じ都道府県で市区町村が2つ以上あり、そのうち空プロパティがある場合はプロパティを削除。", () => {
    const data: Locations = {
      北海道: {
        "": [],
        札幌市: [
          "中央区南21条西6丁目",
          "中央区南20条西",
          "中央区宮の森二条",
          "中央区北三条西",
        ],
      },
    };

    const expectedData: Locations = {
      北海道: {
        札幌市: [
          "中央区南21条西6丁目",
          "中央区南20条西",
          "中央区宮の森二条",
          "中央区北三条西",
        ],
      },
    };

    const formattedData = formatFilterLocation(data);
    expect(formattedData).toEqual(expectedData);
  });
  test("市区町村が一つしかなく、空のプロパティの場合は、location.tsの該当する都道府県の値を入れて補完。", () => {
    const data: Locations = {
      宮城県: {
        "": [],
      },
      千葉県: {
        "": [""],
      },
    };

    const expectedData: Locations = {
      宮城県: {
        仙台市: [
          "宮城野区鶴ヶ谷",
          "太白区長町",
          "青葉区堤通雨宮町",
          "青葉区米ケ袋",
        ],
      },
      千葉県: {
        船橋市: ["印内", "中野木", "夏見"],
        市川市: ["南八幡", "相之川", "大和田三丁目", "入船"],
        千葉市: ["中央区東千葉", "花見川区花園", "稲毛区黒砂台"],
        野田市: ["山崎"],
        松戸市: ["上本郷"],
        習志野市: ["谷津"],
      },
    };

    const formattedData = formatFilterLocation(data);
    expect(formattedData).toEqual(expectedData);
  });
  test("町名の配列が空の時はlocation.tsの該当する町名の値に補完", () => {
    const data: Locations = {
      埼玉県: {
        草加市: [""],
        川口市: ["大字小谷場", "青木", "本町", "朝日", "芝西1丁目"],
      },
      宮城県: {
        仙台市: [],
      },
    };

    const expectedData: Locations = {
      埼玉県: {
        草加市: ["氷川町", "草加二丁目"],
        川口市: ["大字小谷場", "青木", "本町", "朝日", "芝西1丁目"],
      },
      宮城県: {
        仙台市: [
          "宮城野区鶴ヶ谷",
          "太白区長町",
          "青葉区堤通雨宮町",
          "青葉区米ケ袋",
        ],
      },
    };

    const formattedData = formatFilterLocation(data);
    expect(formattedData).toEqual(expectedData);
  });
});

describe("filterLocationテスト", () => {
  test("filterに当てはまらない", () => {
    const filter: Locations = {
      北海道: {
        札幌市: [
          "中央区南21条西6丁目",
          "中央区南20条西",
          "中央区宮の森二条",
          "中央区北三条西",
        ],
        "": [],
      },
      埼玉県: {
        草加市: [""],
        川口市: ["大字小谷場", "青木", "本町", "朝日", "芝西1丁目"],
      },
      宮城県: {
        "": [],
      },
      千葉県: {
        "": [""],
      },
    };
    const result = filterLocation(filter, facility);

    expect(result).toBe(false);
  });
  test("filterの県一致", () => {
    const filter: Locations = {
      北海道: {
        札幌市: [
          "中央区南21条西6丁目",
          "中央区南20条西",
          "中央区宮の森二条",
          "中央区北三条西",
        ],
        "": [],
      },
      神奈川県: {
        "": [],
      },
      宮城県: {
        "": [],
      },
      千葉県: {
        "": [""],
      },
    };
    const result = filterLocation(filter, facility);

    expect(result).toBe(true);
  });
  test("filterの県・市区町村一致", () => {
    const filter: Locations = {
      北海道: {
        札幌市: [
          "中央区南21条西6丁目",
          "中央区南20条西",
          "中央区宮の森二条",
          "中央区北三条西",
        ],
        "": [],
      },
      神奈川県: {
        鎌倉市: [],
      },
      宮城県: {
        "": [],
      },
      千葉県: {
        "": [""],
      },
    };
    const result = filterLocation(filter, facility);

    expect(result).toBe(true);
  });
  test("filterの県・市区町村・町名一致", () => {
    const filter: Locations = {
      北海道: {
        札幌市: [
          "中央区南21条西6丁目",
          "中央区南20条西",
          "中央区宮の森二条",
          "中央区北三条西",
        ],
        "": [],
      },
      神奈川県: {
        鎌倉市: ["扇ｶﾞ谷"],
      },
      宮城県: {
        "": [],
      },
      千葉県: {
        "": [""],
      },
    };
    const result = filterLocation(filter, facility);

    expect(result).toBe(true);
  });
});
