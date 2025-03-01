export type Equipment = "washlet" | "bath" | "kitchen";

type Filter = Partial<
  Pick<ContextFacility, "entranceFee" | "staff" | "acceptances"> & {
    careLevel: CareLevel;
    monthlyBudget: number;
    roomArea: [number, number][];
    equipment: Equipment[];
    access: AccessObj;
    locations: Locations;
  }
>;

export type AccessObj = {
  [line: string]: {
    [station: string]: number;
  };
};

import { locations } from "../data/locations";
import { accessess } from "../data/access";
import type {
  Access,
  CareLevel,
  ContextFacility,
  Locations,
  RemoveOptional,
} from "./type";

export const formatFilterLocation = (data: Locations): Locations => {
  const formattedData: Locations = { ...data };

  for (const prefecture in formattedData) {
    const cities = formattedData[prefecture];
    const cityEntries = Object.entries(cities);

    // 市区町村が1つだけで、空の場合
    if (
      cityEntries.length === 1 &&
      cityEntries[0][0] === "" &&
      (cityEntries[0][1].length === 0 ||
        (cityEntries[0][1].length === 1 && cityEntries[0][1][0] === ""))
    ) {
      // locations.tsから該当する都道府県の値で置き換え
      formattedData[prefecture] = locations[prefecture];
      continue;
    }

    // 市区町村が複数ある場合の処理
    for (const city in cities) {
      // 空の市区町村プロパティを削除
      if (city === "") {
        delete cities[city];
        continue;
      }

      // 市区町村の配列が空か、[""]の場合、locations.tsの値で補完
      if (
        cities[city].length === 0 ||
        (cities[city].length === 1 && cities[city][0] === "")
      ) {
        cities[city] = locations[prefecture][city] || [];
      }
    }
  }

  return formattedData;
};

export const filterLocation = (
  filter: Locations,
  facility: ContextFacility
): boolean => {
  const filterLocations = formatFilterLocation(filter);
  const { locationPrefecture, locationCity, locationTown } = facility;

  if (!filterLocations[locationPrefecture]) return false;

  if (!filterLocations[locationPrefecture][locationCity]) return false;

  if (!filterLocations[locationPrefecture][locationCity].includes(locationTown))
    return false;

  return true;
};

export const formatFilterAccess = (filter: AccessObj): AccessObj => {
  const formattedFilter: AccessObj = { ...filter };

  // 各路線をループ
  for (const line in formattedFilter) {
    const stations = formattedFilter[line];
    const stationEntries = Object.entries(stations);

    // 駅が1つだけで、空の場合
    if (stationEntries.length === 1 && stationEntries[0][0] === "") {
      // access.tsから該当する路線の値で置き換え
      // アクセスデータが存在する場合のみ置き換え
      if (accessess?.[line]) {
        // 配列を{station: Infinity}の形式に変換
        formattedFilter[line] = accessess[line].reduce((acc, station) => {
          acc[station] = Number.POSITIVE_INFINITY;
          return acc;
        }, {} as Record<string, number>);
      } else {
        // アクセスデータが存在しない場合は空のオブジェクトを設定
        formattedFilter[line] = {};
      }
      continue;
    }

    // 駅が複数ある場合の処理
    for (const station in stations) {
      // 空の駅プロパティを削除
      if (station === "") {
        delete stations[station];
      }
    }
  }

  return formattedFilter;
};

export const filterAccess = (
  filter: AccessObj,
  access: RemoveOptional<Access>
): boolean => {
  const filterAccess = formatFilterAccess(filter);

  let isAccess = false;
  // train
  for (const train of access.train) {
    const { line, station_name, time_to_walk } = train;

    if (!filterAccess[line]) continue;

    // filterAccess[line][station_name]が0の可能性がある
    if (filterAccess[line][station_name] === undefined) continue;

    if (time_to_walk && filterAccess[line][station_name] < time_to_walk)
      continue;

    isAccess = true;
  }
  // bus
  for (const bus of access.bus) {
    const { line, station_name, time_to_walk } = bus;

    if (!filterAccess[line]) continue;

    // filterAccess[line][station_name]が0の可能性がある
    if (filterAccess[line][station_name] === undefined) continue;

    if (time_to_walk && filterAccess[line][station_name] < time_to_walk)
      continue;

    isAccess = true;
  }
  if (!isAccess) {
    return false;
  }

  return isAccess;
};

export const facilityFilter = (
  data: ContextFacility[],
  filter: Filter
): ContextFacility[] => {
  if (!Object.keys(filter).length) {
    return data;
  }
  return data.filter((facility) => {
    // 都道府県検索
    if (filter.locations) {
      const filterLocations = formatFilterLocation(
        filter.locations as Locations
      );
      const { locationPrefecture, locationCity, locationTown } = facility;

      // TODO: ここ入らないかも？？
      if (!filterLocations[locationPrefecture]) return false;
      if (!filterLocations[locationPrefecture][locationCity]) return false;

      if (
        !filterLocations[locationPrefecture][locationCity].includes(
          locationTown
        )
      )
        return false;
    }

    // アクセス
    if (filter.access) {
      const filterAccess = formatFilterAccess(filter.access as AccessObj);
      const access = facility.access;

      let isAccess = false;
      // train
      for (const train of access.train) {
        const { line, station_name, time_to_walk } = train;

        if (!filterAccess[line]) continue;

        // filterAccess[line][station_name]が0の可能性がある
        if (filterAccess[line][station_name] === undefined) continue;

        if (time_to_walk && filterAccess[line][station_name] < time_to_walk)
          continue;

        isAccess = true;
      }
      // bus
      for (const bus of access.bus) {
        const { line, station_name, time_to_walk } = bus;

        if (!filterAccess[line]) continue;

        // filterAccess[line][station_name]が0の可能性がある
        if (filterAccess[line][station_name] === undefined) continue;

        if (time_to_walk && filterAccess[line][station_name] < time_to_walk)
          continue;

        isAccess = true;
      }
      if (!isAccess) {
        return false;
      }
    }

    return true;
  });
};
