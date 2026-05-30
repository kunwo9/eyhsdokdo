/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, Landmark, Award, ShieldAlert, CheckCircle, ChevronRight, FileText } from 'lucide-react';
import { KOREAN_DOCUMENTS, JAPANESE_DOCUMENTS, HISTORIC_MAPS, AN_YONGBOK_STORIES } from '../data/history';

export default function HistoryExplorer() {
  const [docCategory, setDocCategory] = useState<'korea' | 'japan'>('korea');
  const [selectedDocId, setSelectedDocId] = useState<string>('k1');
  const [selectedMapId, setSelectedMapId] = useState<string>('m1');

  // Sync selected doc when tab category changes
  const handleCategoryChange = (cat: 'korea' | 'japan') => {
    setDocCategory(cat);
    setSelectedDocId(cat === 'korea' ? 'k1' : 'j1');
  };

  const currentDocs = docCategory === 'korea' ? KOREAN_DOCUMENTS : JAPANESE_DOCUMENTS;
  const activeDoc = currentDocs.find(d => d.id === selectedDocId) || currentDocs[0];
  const activeMap = HISTORIC_MAPS.find(m => m.id === selectedMapId) || HISTORIC_MAPS[0];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Lesson Header */}
      <div className="border-l-4 border-emerald-500 pl-4 py-1">
        <h2 className="text-2xl font-bold text-white font-serif tracking-tight">2차시: 사료와 지도로 규명하는 역사적 권원</h2>
        <p className="text-neutral-400 mt-1 text-sm sm:text-base">
          역사학적 사실의 영구적인 진리성은 주장을 담은 감정이 아닌, 명확한 고문서(Primary Sources)의 교차 입증 분석에서 도출됩니다.
        </p>
      </div>

      {/* Historical Documents section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white text-lg font-serif">문헌 대조 분석: 주권 판단의 서판</h3>
          </div>

          {/* Toggle Tab */}
          <div className="inline-flex bg-neutral-900 border border-neutral-800 p-1 rounded-xl self-start">
            <button
              id="btn-doc-korea"
              onClick={() => handleCategoryChange('korea')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                docCategory === 'korea'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              대한민국 관찬 고문서
            </button>
            <button
              id="btn-doc-japan"
              onClick={() => handleCategoryChange('japan')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                docCategory === 'japan'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              일본 관찬 주권배제 보고서
            </button>
          </div>
        </div>

        {/* Dynamic Doc Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left doc list */}
          <div className="lg:col-span-4 space-y-2.5">
            {currentDocs.map((doc) => (
              <button
                key={doc.id}
                id={`doc-tab-${doc.id}`}
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedDocId === doc.id
                    ? docCategory === 'korea'
                      ? 'border-emerald-600 bg-emerald-950/20 shadow-3xs'
                      : 'border-rose-800 bg-rose-950/20 shadow-3xs'
                    : 'border-neutral-900 bg-neutral-900/10 hover:bg-neutral-900/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full font-mono ${
                      docCategory === 'korea' ? 'bg-emerald-950 text-emerald-300 border border-emerald-900/30' : 'bg-rose-950/50 text-rose-300 border border-rose-900/30'
                    }`}>
                      {doc.year}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-200 text-sm group-hover:text-emerald-400 transition-colors font-serif">
                    {doc.title}
                  </h4>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  selectedDocId === doc.id ? 'translate-x-1 text-emerald-400' : 'text-neutral-600'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Selected Doc Detail View */}
          <div className="lg:col-span-8 bg-[#0b0c0e]/40 border border-neutral-900 rounded-2xl p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none select-none">
              <Landmark className="w-48 h-48 -mr-10 text-emerald-500" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDoc.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase font-mono">PRIMARY TEXTUAL EVIDENCE</span>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5 font-serif">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      {activeDoc.title}
                    </h3>
                  </div>
                  <span className="self-start sm:self-auto text-xs px-3 py-1 font-mono font-bold bg-neutral-900 text-neutral-300 rounded-lg border border-neutral-800">
                    설계 연도: {activeDoc.year}
                  </span>
                </div>

                {/* Quote Block */}
                <div className="bg-neutral-950 border-l-4 border-amber-500 p-4 rounded-r-xl">
                  <p className="text-sm font-medium italic text-neutral-200 leading-relaxed font-serif">
                    “{activeDoc.quote}”
                  </p>
                </div>

                {/* Historiographical Meaning */}
                <div className="space-y-2 text-sm text-neutral-300">
                  <h4 className="font-bold text-white flex items-center gap-1.5 font-serif">
                    <Award className="w-4 h-4 text-emerald-400" /> 문헌 분석과 역사적 의의
                  </h4>
                  <p className="leading-relaxed text-neutral-300 text-xs sm:text-sm">
                    {activeDoc.explanation}
                  </p>
                </div>

                {/* Quick takeaway */}
                <div className="bg-[#0c1814] border border-emerald-900/30 rounded-xl p-4 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="font-bold text-emerald-300 block mb-0.5 font-serif">핵심 판결 요지</strong>
                    <span className="text-emerald-400/90 leading-relaxed font-medium">{activeDoc.keyTakeaway}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cartographic comparison section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-white text-lg font-serif">역사적 고지도(Map) 대조 분석: 국경 선긋기</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map details selector */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-xs text-neutral-400 leading-relaxed">
                당시 사회의 지리학자와 정부 관료들이 한반도 주변 해양 영토 판도를 어떻게 인식하고 채색하였는지 명료하게 보여주는 강력한 영유 거울입니다.
              </p>

              <div className="space-y-2">
                {HISTORIC_MAPS.map((map) => (
                  <button
                    key={map.id}
                    id={`map-btn-${map.id}`}
                    onClick={() => setSelectedMapId(map.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      selectedMapId === map.id
                        ? 'border-emerald-600 bg-emerald-950/20 font-semibold text-emerald-300 font-serif'
                        : 'border-neutral-900 hover:bg-neutral-900/60 text-neutral-400'
                    }`}
                  >
                    <span>{map.title} ({map.year})</span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                      map.source === 'korea' ? 'bg-indigo-950 text-indigo-300 border border-indigo-950/30' : 'bg-rose-950 text-rose-300 border border-rose-950/30'
                    }`}>
                      {map.source === 'korea' ? '아국' : '일본'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 text-[10px] space-y-1 font-mono">
              <span className="font-bold text-neutral-400 block font-serif uppercase tracking-wider">학술 사료 검지 지침:</span>
              <p className="text-neutral-500 leading-normal font-sans">
                고지도의 가치는 개별적인 위치의 정확성보다, 당시 정부 및 지도가 주권 영방 경계를 한반도 권역과 동일시했는지의 '정체성의 투영과 고백'에 있습니다.
              </p>
            </div>
          </div>

          {/* Interactive Map Visual Mock Graphics & Details */}
          <div className="lg:col-span-8 bg-[#0b0c0e]/40 border border-neutral-900 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Box: SVG Mock Map Frame */}
            <div className="md:col-span-12 lg:col-span-5 bg-neutral-950 rounded-xl relative overflow-hidden p-4 flex flex-col items-center justify-center min-h-[220px]">
              <div className="absolute top-2 left-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
                Cartographic Model
              </div>

              {/* Dynamic Schematics depending on Map Selected */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMap.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  {activeMap.id === 'm1' && (
                    <svg viewBox="0 0 200 180" className="w-36 h-36">
                      {/* Paldo Chongdo depiction */}
                      <path d="M 40,30 C 50,20 80,10 90,40 C 100,50 110,90 100,120 C 90,140 70,160 50,150 C 30,130 20,80 40,30 Z" fill="#131d2b" stroke="#334155" strokeWidth="1.5" />
                      {/* Ulleung & Woosan - Note in Paldo chongdo Woosan was misplaced sometimes, showing both */}
                      <circle cx="115" cy="70" r="10" fill="#10b981" />
                      <circle cx="138" cy="85" r="5" fill="#f59e0b" />
                      <text x="115" y="65" fill="#94a3b8" fontSize="8" textAnchor="middle">무릉</text>
                      <text x="138" y="77" fill="#fbbf24" fontSize="8" textAnchor="middle">우산</text>
                      <text x="70" y="90" fill="#475569" fontSize="9" textAnchor="middle" fontWeight="bold">조선 전토</text>
                      <text x="100" y="165" fill="#64748b" fontSize="8" textAnchor="middle">동해 해양 (1531)</text>
                    </svg>
                  )}

                  {activeMap.id === 'm2' && (
                    <svg viewBox="0 0 200 180" className="w-36 h-36">
                      {/* Kaisei Nihon Yochi Rotei Zenzu */}
                      {/* Japan Mainlands - colored */}
                      <path d="M 60,110 Q 110,130 160,140" stroke="#f43f5e" strokeWidth="6" fill="none" strokeLinecap="round" />
                      <path d="M 50,130 Q 90,140 140,150" stroke="#fbbf24" strokeWidth="4" fill="none" strokeLinecap="round" />
                      
                      {/* Oki island - Colored */}
                      <circle cx="100" cy="90" r="5" fill="#f43f5e" />
                      
                      {/* Dokdo / Ulleungdo - Uncolored/Transparent with coordinate grid */}
                      <line x1="20" y1="20" x2="180" y2="20" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                      <line x1="120" y1="10" x2="120" y2="170" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
                      <circle cx="75" cy="55" r="7" fill="none" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="92" cy="50" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.2" />
                      
                      <text x="75" y="43" fill="#94a3b8" fontSize="8" textAnchor="middle">鬱陵 (무색)</text>
                      <text x="96" y="38" fill="#fbbf24" fontSize="8" textAnchor="middle">獨島 (무색)</text>
                      <text x="140" y="115" fill="#f43f5e" fontSize="9" fontWeight="bold">일본 본토 (채색)</text>
                    </svg>
                  )}

                  {activeMap.id === 'm3' && (
                    <svg viewBox="0 0 200 180" className="w-36 h-36">
                      {/* Sangoku Setsuyo Chizu */}
                      {/* Joseon - Yellow */}
                      <path d="M 35,40 C 50,30 65,30 70,60 C 75,80 75,110 65,130 C 55,145 40,150 35,120 Z" fill="#fbbf24" opacity="0.6" />
                      {/* Japan - Red */}
                      <path d="M 120,110 Q 150,120 180,140" stroke="#ef4444" strokeWidth="8" fill="none" strokeLinecap="round" />
                      
                      {/* Oki - Red */}
                      <circle cx="120" cy="95" r="5" fill="#ef4444" />
                      
                      {/* Dokdo / Ulleungdo - Painted completely in Yellow like Joseon! */}
                      <circle cx="90" cy="65" r="7" fill="#fbbf24" />
                      <circle cx="104" cy="60" r="4" fill="#fbbf24" />
                      
                      <text x="96" y="48" fill="#fbbf24" fontSize="8" textAnchor="middle" fontWeight="bold">조선령 지목 (황색)</text>
                      <text x="96" y="79" fill="#94a3b8" fontSize="8" textAnchor="middle">“조선의 소유” 명기됨</text>
                      <text x="45" y="95" fill="#475569" fontSize="9" fontWeight="bold">조선국 영역</text>
                    </svg>
                  )}

                  <span className="text-[10px] text-neutral-500 font-medium font-mono tracking-wider mt-3 text-center">
                    {activeMap.title} 관제 대비 모식도
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Box: Key facts details */}
            <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    activeMap.source === 'korea' ? 'bg-indigo-950 text-indigo-300 border border-indigo-900/30' : 'bg-rose-950 text-rose-400 border border-rose-900/30'
                  }`}>
                    {activeMap.source === 'korea' ? '아국(조선왕조)의 공인 지도' : '일본 학계 및 관의 고백 지도'}
                  </span>
                  <h4 className="font-bold text-white text-base mt-2 font-serif">{activeMap.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{activeMap.description}</p>
                </div>

                <div className="space-y-2 border-t border-neutral-900 pt-3">
                  <h5 className="text-xs font-bold text-neutral-300 font-serif">핵심 판독 주요 팩트:</h5>
                  <ul className="space-y-1.5 text-xs text-neutral-400 list-none pl-0">
                    {activeMap.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* An Yong-bok interactive vertical stepper */}
      <div className="bg-[#0b0c0e]/40 border border-neutral-900 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-white text-lg font-serif">{AN_YONGBOK_STORIES.title}</h3>
        </div>
        <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
          {AN_YONGBOK_STORIES.description}
        </p>

        {/* Phase timeline cards */}
        <div className="relative border-l border-neutral-800 pl-4 sm:pl-6 ml-2 sm:ml-4 space-y-8 py-2">
          {AN_YONGBOK_STORIES.phases.map((phase, idx) => (
            <div key={idx} className="relative group">
              {/* Marker pin */}
              <span className="absolute -left-[24px] sm:-left-[32px] top-1.5 w-4 h-4 rounded-full bg-[#070708] border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors duration-300 z-10 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white"></span>
              </span>

              <div className="bg-[#0f1013] border border-neutral-900 rounded-2xl p-5 space-y-2 hover:shadow-3xs transition-all duration-300">
                <h4 className="font-bold text-white text-sm md:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 font-serif">
                  <span>{phase.title}</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1 select-text">
                  {phase.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
