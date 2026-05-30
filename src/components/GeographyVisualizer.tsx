/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Eye, EyeOff, Navigation, Scaling, Info, Layers } from 'lucide-react';
import { DOKDO_COORDINATES, DOKDO_AREA, DISTANCES, GEOGRAPHY_VISIBILITY_STUDY, TERRITORY_ELEMENTS, ROAD_NAMES } from '../data/geography';

export default function GeographyVisualizer() {
  const [activeIsland, setActiveIsland] = useState<string>('울릉도');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Find distance details for the active state
  const activeDistance = DISTANCES.find(d => d.from === activeIsland) || DISTANCES[0];
  const visibilityDetail = activeIsland === '울릉도' 
    ? GEOGRAPHY_VISIBILITY_STUDY.ulleungdo 
    : activeIsland === '일본 오키섬' 
      ? GEOGRAPHY_VISIBILITY_STUDY.oki 
      : { title: '한반도 본토(죽변)에서의 거리', description: '울진군 Jukbyeon에서 독도까지의 거리는 216.8km입니다. 대한민국 본토 영방 영토선에서 연결되는 해양 영역의 기점이자 독도를 영구 주권 수호하는 행정 기지 역할을 수행하는 모체가 됩니다.', heightNeeded: '관측 장비 필요', vibe: '한반도와의 유기적 거리성' };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Intro Header */}
      <div className="border-l-4 border-emerald-500 pl-4 py-1">
        <h2 className="text-2xl font-bold text-white font-serif tracking-tight">1차시: 독도의 지리적 특성과 영역의 이해</h2>
        <p className="text-neutral-400 mt-1 text-sm sm:text-base">
          독도가 대한민국의 영토임을 이해하는 첫걸음은 명확한 물리적·지리적 사실과 국제법적 영역 개념을 영민하게 결합하는 것입니다.
        </p>
      </div>

      {/* Main Coordinate & Islet Spec */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dongdo / Seodo Split Card */}
        <div className="lg:col-span-7 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white text-lg font-serif">독도의 지리적 수리 좌표 및 면적</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0e1614] p-4 rounded-xl border border-emerald-900/30 relative overflow-hidden group">
              <div className="absolute right-2 bottom-2 text-emerald-950/20 font-bold text-6xl select-none transition-transform group-hover:scale-110 duration-500">東</div>
              <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 z-10 relative">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                {DOKDO_COORDINATES.east.name}
              </h4>
              <div className="mt-3 space-y-1 text-sm text-neutral-300 z-10 relative">
                <p><span className="text-neutral-500 mr-2">위치:</span>{DOKDO_COORDINATES.east.latitude}</p>
                <p><span className="text-neutral-500 mr-2">경도:</span>{DOKDO_COORDINATES.east.longitude}</p>
                <p><span className="text-neutral-500 mr-2">면적:</span>{DOKDO_AREA.east}</p>
              </div>
            </div>

            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 relative overflow-hidden group">
              <div className="absolute right-2 bottom-2 text-neutral-950/40 font-bold text-6xl select-none transition-transform group-hover:scale-110 duration-500">西</div>
              <h4 className="font-bold text-white flex items-center gap-1.5 z-10 relative font-serif">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-500 inline-block"></span>
                {DOKDO_COORDINATES.west.name}
              </h4>
              <div className="mt-3 space-y-1 text-sm text-neutral-300 z-10 relative">
                <p><span className="text-neutral-500 mr-2">위치:</span>{DOKDO_COORDINATES.west.latitude}</p>
                <p><span className="text-neutral-500 mr-2">경도:</span>{DOKDO_COORDINATES.west.longitude}</p>
                <p><span className="text-neutral-500 mr-2">면적:</span>{DOKDO_AREA.west}</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950/40 rounded-xl p-4 border border-neutral-900/60 space-y-3">
            <h5 className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase font-mono">총체적 면적 정보</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-neutral-500 text-xs font-mono">전체 면적</p>
                <p className="font-semibold text-neutral-200 text-base">{DOKDO_AREA.total}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs font-mono">부속 도서 수</p>
                <p className="font-semibold text-neutral-200 text-base">{DOKDO_AREA.subIslands}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-neutral-500 text-xs font-mono">체감 크기 비율</p>
                <p className="font-semibold text-emerald-400 text-sm mt-0.5">{DOKDO_AREA.comparison}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visibility Interactive Card */}
        <div className="lg:col-span-5 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-white text-lg font-serif">육안 관측성과 역사적 증명</h3>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              지리학과 역사학에서 <strong className="text-neutral-100">“육안 관측 가능 여부”</strong>는 고대인들이 그 섬을 선제적으로 의식하고 삶의 권역으로 인지했는가를 따지는 핵심적인 법적·지리적 판단 요소입니다.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {DISTANCES.map((item) => (
                <button
                  key={item.from}
                  id={`btn-distance-${item.from}`}
                  onClick={() => setActiveIsland(item.from)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeIsland === item.from
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  }`}
                >
                  {item.from}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIsland}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0e1013] rounded-xl p-4 border border-neutral-900 space-y-3 mt-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded-full font-mono">
                    {activeIsland} → 독도 거리
                  </span>
                  <span className="font-mono text-base font-bold text-emerald-400">{activeDistance.distance} km</span>
                </div>
                <h4 className="font-semibold text-white text-sm font-serif">{visibilityDetail.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{visibilityDetail.description}</p>

                <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>지구물리학적 관측 조건:</span>
                  <span className="font-medium text-neutral-300">{visibilityDetail.heightNeeded}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Interactive Distance Map Section */}
      <div className="bg-[#0e0f11] border border-neutral-800 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
          <Compass className="w-96 h-96 -mr-20 -mt-20 text-emerald-500" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Schematic SVG Map */}
          <div className="lg:col-span-7 bg-[#050607]/80 border border-neutral-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[320px]">
            <span className="text-xs text-neutral-500 font-mono self-start mb-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-neutral-400" /> 동해 해양 거리 스키마 모식도
            </span>

            <svg viewBox="0 0 600 280" className="w-full max-w-md md:max-w-xl h-auto" id="distance-schema-svg">
              {/* Background water grids */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="dokdoGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Range Circles around Dokdo */}
              <circle cx="300" cy="110" r="87" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="300" cy="110" r="157" fill="none" stroke="rgba(244, 63, 94, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="300" cy="110" r="216" fill="none" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Dokdo Glow */}
              <circle cx="300" cy="110" r="30" fill="url(#dokdoGlow)" />

              {/* Connections with distances */}
              {/* Ulleungdo connection */}
              <line 
                x1="210" y1="140" x2="300" y2="110" 
                stroke={activeIsland === '울릉도' ? '#10b981' : '#475569'} 
                strokeWidth={activeIsland === '울릉도' ? '2.5' : '1'} 
                strokeDasharray={activeIsland === '울릉도' ? 'none' : '2 2'}
                className="transition-all duration-300"
              />
              {/* Oki island connection */}
              <line 
                x1="430" y1="180" x2="300" y2="110" 
                stroke={activeIsland === '일본 오키섬' ? '#10b981' : '#475569'} 
                strokeWidth={activeIsland === '일본 오키섬' ? '2.5' : '1'} 
                strokeDasharray={activeIsland === '일본 오키섬' ? 'none' : '2 2'}
                className="transition-all duration-300"
              />
              {/* Jukbyeon connection */}
              <line 
                x1="80" y1="150" x2="300" y2="110" 
                stroke={activeIsland === '한반도 죽변(울진)' ? '#10b981' : '#475569'} 
                strokeWidth={activeIsland === '한반도 죽변(울진)' ? '2.5' : '1'} 
                strokeDasharray={activeIsland === '한반도 죽변(울진)' ? 'none' : '2 2'}
                className="transition-all duration-300"
              />

              {/* Islets nodes */}
              {/* Jukbyeon Main Coast */}
              <g 
                onClick={() => setActiveIsland('한반도 죽변(울진)')} 
                className="cursor-pointer group"
              >
                <circle cx="80" cy="150" r="7" fill={activeIsland === '한반도 죽변(울진)' ? '#38bdf8' : '#334155'} />
                <circle cx="80" cy="150" r="14" fill="none" stroke="#38bdf8" strokeWidth="1" className="opacity-0 group-hover:opacity-100 animate-ping" />
                <text x="80" y="172" fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">죽변(울진)</text>
              </g>

              {/* Ulleungdo */}
              <g 
                onClick={() => setActiveIsland('울릉도')} 
                className="cursor-pointer group"
              >
                <circle cx="210" cy="140" r="9" fill={activeIsland === '울릉도' ? '#10b981' : '#475569'} />
                <circle cx="210" cy="140" r="18" fill="none" stroke="#10b981" strokeWidth="1.5" className="opacity-0 group-hover:opacity-100 animate-ping" />
                <text x="210" y="123" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">울릉도</text>
                <text x="210" y="160" fill="#a7f3d0" fontSize="10" textAnchor="middle">87.4km</text>
              </g>

              {/* Japanese Oki Island */}
              <g 
                onClick={() => setActiveIsland('일본 오키섬')} 
                className="cursor-pointer group"
              >
                <circle cx="430" cy="180" r="8" fill={activeIsland === '일본 오키섬' ? '#f43f5e' : '#475569'} />
                <circle cx="430" cy="180" r="16" fill="none" stroke="#f43f5e" strokeWidth="1" className="opacity-0 group-hover:opacity-100 animate-ping" />
                <text x="430" y="202" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">일본 오키섬</text>
                <text x="430" y="220" fill="#fca5a5" fontSize="10" textAnchor="middle">157.5km</text>
              </g>

              {/* Dokdo (Golden Center Islet) */}
              <g className="cursor-default">
                {/* East & West mini circles */}
                <ellipse cx="300" cy="110" rx="6" ry="4" fill="#fbbf24" />
                <text x="300" y="93" fill="#fbbf24" fontSize="13" textAnchor="middle" fontWeight="black" letterSpacing="1">독도 (DOKDO)</text>
              </g>

              {/* Graphic overlays / info legends of distances */}
              <g transform="translate(450, 20)">
                <rect width="130" height="60" rx="6" fill="#030405" stroke="#1e293b" strokeWidth="1" />
                <circle cx="15" cy="15" r="4" fill="#10b981" />
                <text x="26" y="18" fill="#94a3b8" fontSize="10">육안 관측선 (87.4km)</text>

                <circle cx="15" cy="32" r="4" fill="#f43f5e" />
                <text x="26" y="35" fill="#94a3b8" fontSize="10">관측 불가 한계밖</text>

                <circle cx="15" cy="49" r="4" fill="#38bdf8" />
                <text x="26" y="52" fill="#94a3b8" fontSize="10">한반도 최단본토</text>
              </g>
            </svg>
          </div>

          {/* Explanation with scientific logic */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-mono font-bold">
              <Scaling className="w-3.5 h-3.5" /> SCIENTIFIC INSIGHT
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white font-serif">
              왜 87.4km는 영토 표방의 명료한 법적 효력을 발생할까요?
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              지구가 둥글기 때문에 물체를 바라보는 시각적 한계는 관측 장소의 해발 높이와 거리로 산정됩니다.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              울릉도의 높은 기상 기지나 고지대에서는 <strong className="text-white font-medium">눈으로 명확히 관측됩니다</strong>. 
              이는 한일 양국의 그 어떠한 문헌보다 앞서 울릉도 고대인들의 자연적인 생활권과 인식이 투영되었다는 주권적 지표가 됩니다. 
              반면 일본 오키섬에서는 지구적 한계선에 가려 <strong className="text-rose-400 font-medium font-bold">그 어떠한 자연 수치로도 독도를 볼 수 없습니다.</strong>
            </p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs leading-relaxed text-neutral-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                위 도식도의 노드(울릉도, 오키섬, 죽변)를 <strong>직접 터치하거나 클릭</strong>하면 각 위치별 거리와 과학적 세부 분석을 바로 볼 수 있습니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Territory Elements: Land, Sea, Air + EEZ Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-white text-lg font-serif">국가 영역(Territory)의 3요소와 독도의 법적 지위</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {TERRITORY_ELEMENTS.map((elem) => (
            <div
              key={elem.type}
              id={`territory-${elem.type}`}
              className="bg-[#0b0c0e]/40 border border-neutral-900 rounded-2xl p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:border-emerald-900/60 cursor-default flex flex-col justify-between"
              onMouseEnter={() => setHoveredElement(elem.type)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-mono ${
                    elem.type === 'territory' ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/30' :
                    elem.type === 'sea' ? 'bg-sky-950/40 text-sky-300 border border-sky-900/30' :
                    elem.type === 'air' ? 'bg-amber-950/40 text-amber-300 border border-amber-900/30' :
                    'bg-emerald-950/40 text-emerald-300 border border-emerald-900/30'
                  }`}>
                    {elem.englishName}
                  </span>
                  <Navigation className={`w-4 h-4 transition-transform duration-300 ${
                    hoveredElement === elem.type ? 'rotate-45 text-emerald-400' : 'text-neutral-600'
                  }`} />
                </div>

                <h4 className="font-bold text-white text-base font-serif">{elem.name}</h4>
                <p className="text-xs text-emerald-400 font-medium font-mono">{elem.range}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{elem.details}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-900/60 text-[10px] font-serif uppercase tracking-wider text-neutral-500">
                상태: <span className="text-emerald-400 font-sans font-semibold">{elem.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address and Road Name System Card */}
      <div className="bg-[#0b0c0e]/40 border border-neutral-900 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-white text-lg font-serif">{ROAD_NAMES.title}</h3>
        </div>
        <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
          {ROAD_NAMES.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Dongdo Road details */}
          <div className="border border-neutral-900 bg-neutral-950/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h4 className="font-bold text-emerald-300 text-sm md:text-base font-serif">{ROAD_NAMES.east.title}</h4>
            </div>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="bg-[#070708] p-2.5 rounded-lg border border-neutral-800 text-neutral-200 shadow-3xs leading-relaxed">
                <span className="block font-bold text-neutral-500 mb-0.5 text-[9px] font-mono">새 도로명 주소:</span>
                <strong>{ROAD_NAMES.east.address}</strong>
              </p>
              <p className="p-1 leading-relaxed">
                <span className="font-semibold text-white">소수 주요 시설:</span> {ROAD_NAMES.east.facilities}
              </p>
              <p className="text-neutral-500 pl-1 leading-relaxed text-[11px]">
                ※ 이사부 장군은 우산국을 신라의 영토로 편입하여 한반도 소속성을 확립한 신라의 전설적 군장입니다.
              </p>
            </div>
          </div>

          {/* Seodo Road details */}
          <div className="border border-neutral-900 bg-neutral-950/40 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-400"></span>
              <h4 className="font-bold text-white text-sm md:text-base font-serif">{ROAD_NAMES.west.title}</h4>
            </div>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="bg-[#070708] p-2.5 rounded-lg border border-neutral-800 text-neutral-200 shadow-3xs leading-relaxed">
                <span className="block font-bold text-neutral-500 mb-0.5 text-[9px] font-mono">새 도로명 주소:</span>
                <strong>{ROAD_NAMES.west.address}</strong>
              </p>
              <p className="p-1 leading-relaxed">
                <span className="font-semibold text-white">소수 주요 시설:</span> {ROAD_NAMES.west.facilities}
              </p>
              <p className="text-neutral-500 pl-1 leading-relaxed text-[11px]">
                ※ 안용복은 조선의 어민으로서 당당히 도일하여 에도 막부 측의 영토 도해 금지령 확약을 이끌어낸 민간 영웅입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
