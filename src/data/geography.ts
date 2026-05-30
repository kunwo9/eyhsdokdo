/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TerritoryElement } from '../types';

export const DOKDO_COORDINATES = {
  east: {
    name: '동도 (우산봉)',
    latitude: "북위 37° 14' 26.8\"",
    longitude: "동경 131° 52' 10.4\"",
  },
  west: {
    name: '서도 (대한봉)',
    latitude: "북위 37° 14' 30.6\"",
    longitude: "동경 131° 51' 54.6\"",
  }
};

export const DOKDO_AREA = {
  total: '187,554 ㎡',
  east: '73,297 ㎡',
  west: '88,740 ㎡',
  subIslands: '89개의 부속 도서 및 바위섬',
  comparison: '서울 잠실종합운동장의 약 2배 크기'
};

export const DISTANCES = [
  { from: '울릉도', to: '독도', distance: 87.4, note: '가장 가까운 거리, 맑은 날 육안 관측 가능' },
  { from: '일본 오키섬', to: '독도', distance: 157.5, note: '독도 관측 불가 (지구 곡률 한계)' },
  { from: '한반도 죽변(울진)', to: '독도', distance: 216.8, note: '한반도 육지에서의 최단 거리' },
];

export const GEOGRAPHY_VISIBILITY_STUDY = {
  ulleungdo: {
    title: '울릉도에서의 관측성 (역사적 인지의 증거)',
    description: '울릉도의 사동, 석포마을 등 고지대(해발 120m 이상)에서는 맑은 날 독도가 육안으로 또렷이 관측됩니다. 이는 아주 먼 옛날부터 울릉도 주민들이 동쪽 바다 끝에 상재하는 섬(독도)의 존재를 자연스럽게 삶의 영역(생활권) 일부로 인지하고 다스렸음을 증제합니다.',
    heightNeeded: '해발 120m 이상 고지대',
    vibe: '생활권 편입의 근거'
  },
  oki: {
    title: '일본 오키섬에서의 관측 불가능성',
    description: '일본에서 독도와 가장 가까운 오키섬은 독도와의 거리가 157.5km입니다. 지구 곡률과 거리적 한계로 인해 날씨가 아무리 맑고 시야가 좋아도 오키섬에서는 독도를 결코 육안으로 볼 수 없습니다. 따라서 에도 시대의 일본 어민들은 의도적인 영토 자각에 따른 유기적 소유가 아닌, 특별한 도해 허가 등을 통한 원거리 외해 항해로만 접근할 수 있는 영역 밖의 대상이었습니다.',
    heightNeeded: '지구 곡률상 관측 절대 불가능',
    vibe: '자연적 영토 인지 한계선 외부'
  }
};

export const TERRITORY_ELEMENTS: TerritoryElement[] = [
  {
    type: 'territory',
    name: '영토 (Territory)',
    englishName: 'Territory',
    range: '주권이 미치는 지표의 범위',
    status: '대한민국 행정 영토',
    details: '경상북도 울릉군 울릉읍 독도리 1~96번지에 해당하는 엄연한 대한민국의 행정 구역입니다.',
  },
  {
    type: 'sea',
    name: '영해 (Territorial Sea)',
    englishName: 'Territorial Sea',
    range: '기선으로부터 12해리 (약 22.2 km)',
    status: '대한민국 영해 주권 수호',
    details: '영토에 인접한 해역으로, 대한민국은 독도 주변 12해리를 완전한 주권 해역으로 선포하고 일본 어선의 불법 침입을 강력히 단속하고 있습니다.',
  },
  {
    type: 'air',
    name: '영공 (Airspace)',
    englishName: 'Airspace',
    range: '영토와 영해의 수직 상공',
    status: '대한민국 방공식별구역 (KADIZ) 포함',
    details: '독도 영토와 영해 상공은 대한민국 영공에 포함되며, 대한민국 공군의 한국방공식별구역(KADIZ)에 명확히 지정되어 방공 작전이 실시간으로 수행되고 있습니다.',
  },
  {
    type: 'eez',
    name: '배타적 경제수역 (EEZ)',
    englishName: 'Exclusive Economic Zone',
    range: '영해 기선으로부터 최대 200해리',
    status: '천연자원 탐사·개발·보존 및 관리 권한',
    details: '영해를 제외하고 인접한 수역으로, 연안국에 해저·하층토의 생물 및 비생물 자원에 대한 독점적 권리와 과학적 조사, 환경 보호 권한이 부여되는 경제적 주권 수역입니다.',
  }
];

export const ROAD_NAMES = {
  title: '독도의 주소와 도로명 체계',
  description: '독도는 상주하는 독도 등대원, 독도경비대원, 그리고 주민이 살고 있는 명백한 유인도(有人島)이며 고유의 도로명을 부여받았습니다.',
  east: {
    title: '동도 도로명',
    address: '경상북도 울릉군 울릉읍 독도리 이사부길',
    facilities: '독도경비대 병사, 독도등대, 헬기장, 한반도 바위'
  },
  west: {
    title: '서도 도로명',
    address: '경상북도 울릉군 울릉읍 독도리 안용복길',
    facilities: '주민 숙소, 음용수원인 ‘물골’, 깎아지른 절벽 지표 및 산책로'
  }
};
