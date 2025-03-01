export type RoomStatus = {
  [key: number]: number | undefined; // [key]room_number, [value]居室面積
};

type Room = {
  roomNumber: string; // 居室番号
  area: number; // 部屋面積（m²）
  hasWashlet: boolean; // 温水洗浄付きトイレ
  hasBath: boolean; // 風呂
  hasKitchen: boolean; //キッチン
};

export type Access = {
  train?: Train[];
  bus?: Bus[];
};

type Train = {
  line: string; // 路線名
  station_name: string; // 駅名
  gate: string; // 改札口
  time_to_walk: number | null; // 歩くのにかかる時間
  distance_from_station: number | null; // 駅からの距離
};

type Bus = {
  line: string; // 路線名
  station_name: string; // 駅名
  gate: string; // 改札口
  bus_ride_time: number | null; // バス乗車時間
  bus_stop: string; // バス停名
  time_to_walk: number | null; // 歩くのにかかる時間
  distance_from_station: number | null; // 駅からの距離
};

export interface Facility {
  code: number; // 拠点CD
  name: string; // 拠点名
  image: string; // 画像（バイナリ）
  location: string; // 所在地
  locationPrefecture: string; // 都道府県
  locationCity: string; // 市区町村
  locationTown: string; // 町名
  staff: string[]; // スタッフ体制
  latlon: {
    lat: number | null; // 緯度
    lon: number | null; // 経度
  };
  siteUrl: string; // サイトURL
  entranceFee: number[]; // 入居金
  vacantNum: number;
  vacantData: RoomStatus; // 空き室状況
  notes: string; // 備考欄
  access: Access; // 交通アクセス
  monthlyBudget: number[]; // 予算（月額）
  careLevels: string[]; // 対応可能介護度（例: ["自立", "要介護1", "要介護2"]）
  rooms: Room[]; // 拠点に紐づく居室リスト
  acceptances: string[];
  isAddedMap?: boolean;
}

export type Staff =
  | "physicalTherapist" // 理学療法士_PT
  | "occupationalTherapist" // 作業療法士_OT
  | "speechTherapist" // 言語聴覚士_ST
  | "twentyFourNsSystem" // 24Ns体制
  | "rehabSupport"; // リハビリ対応

export type Acceptances =
  | "suction" // たん吸引
  | "homeOxygen" // 在宅酸素
  | "tracheostomy" // 気管切開
  | "ventilator" // 人工呼吸器
  | "insulinAdministration" // インシュリン投与
  | "tubeNutrition" // 経管栄養（胃ろう）
  | "centralVenousNutrition" // 中心静脈栄養（TPN）
  | "urinaryBalloon"; // 尿バルーン

export type CareLevel =
  | "自立"
  | "要介護1"
  | "要介護2"
  | "要介護3"
  | "要介護4"
  | "要介護5"
  | "要支援1"
  | "要支援2";

type RemoveOptional<T> = {
  [K in keyof T]-?: T[K]; // プロパティの ? を外す
};

type TransformFacility<T> = {
  [K in keyof T]: K extends "staff"
    ? Staff[]
    : K extends "latlon"
    ? {
        lat: number | null; // 緯度
        lng: number | null; // 経度
      } // latlonのlonをlngに変換
    : K extends "vacantData"
    ? { roomNum: string; roomArea: number }[]
    : K extends "access"
    ? RemoveOptional<Access>
    : K extends "careLevels"
    ? CareLevel[]
    : K extends "acceptances"
    ? Acceptances[]
    : T[K]; // その他のプロパティはそのまま
};

export type ContextFacility = TransformFacility<Facility> & {
  isMapDialog: boolean; // マップダイアログ
  isPointDialog: boolean; // 詳細ダイアログ
};

// オートコンプリートとフィルターで使用
export type Locations = {
  [prefecture: string]: {
    [city: string]: string[];
  };
};

// オートコンプリートとフィルターで使用
export type Accessess = {
  [line: string]: string[];
};
