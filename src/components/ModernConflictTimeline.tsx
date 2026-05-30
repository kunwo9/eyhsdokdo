/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Compass, Landmark, HelpCircle, FileLock2, Award, Calendar, ChevronDown, CheckCircle } from 'lucide-react';
import { MODERN_CONFLICTS } from '../data/modern';

export default function ModernConflictTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>('m1');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Lesson Header */}
      <div className="border-l-4 border-emerald-500 pl-4 py-1">
        <h2 className="text-2xl font-bold text-white font-serif tracking-tight">3차시: 현대 독도 갈등의 전개와 평화적 상생 방안</h2>
        <p className="text-neutral-400 mt-1 text-sm sm:text-base">
          현대 독도 미결 분쟁과 분조의 양상은 제2차 세계대전 전후 처리 조약의 외교적 공백과 유엔해양법상 바다 경계 획정이 맞물려 발생한 고도의 복합적 문제입니다.
        </p>
      </div>

      {/* Main Accordion Accord Timeline */}
      <div className="space-y-4">
        {MODERN_CONFLICTS.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              id={`modern-event-${item.id}`}
              className={`bg-[#0b0c0e]/40 border rounded-2xl transition-all duration-300 overflow-hidden ${
                isExpanded 
                  ? 'border-emerald-600 ring-1 ring-emerald-500/30 shadow-xs' 
                  : 'border-neutral-900 hover:border-neutral-800 hover:shadow-2xs'
              }`}
            >
              {/* Card Header Selector Button */}
              <button
                onClick={() => toggleExpand(item.id)}
                id={`btn-expand-${item.id}`}
                className="w-full text-left p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                  {/* Step ID badge */}
                  <span className="font-mono text-[10px] font-bold text-neutral-400 bg-neutral-800 border border-neutral-700/60 px-2 py-0.5 rounded self-start">
                    단계 {idx + 1}
                  </span>

                  {/* Title & Date */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white text-sm md:text-base tracking-tight hover:text-emerald-400 transition-colors font-serif">
                        {item.title}
                      </h3>
                      {/* Custom Category label */}
                      <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full font-mono ${
                        item.category === 'treaty' ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-900/30' :
                        item.category === 'defense' ? 'bg-amber-950/40 text-amber-300 border border-amber-900/30' :
                        item.category === 'fisheries' ? 'bg-teal-950/40 text-teal-300 border border-teal-900/30' :
                        'bg-rose-950/40 text-rose-300 border border-rose-900/30'
                      }`}>
                        {item.category === 'treaty' ? '국제 조약안' :
                         item.category === 'defense' ? '실효 주권 보위' :
                         item.category === 'fisheries' ? '해양 어업 조정' : '외교 마찰'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Date and Chevron element */}
                <div className="flex items-center gap-3 shrink-0 self-center font-mono">
                  <span className="text-2xs md:text-xs text-neutral-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-emerald-400' : ''
                  }`} />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="p-5 md:px-6 md:pb-6 border-t border-neutral-900 space-y-5 bg-neutral-950/30">
                      {/* Summary Text block */}
                      <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed max-w-4xl border-l-2 border-emerald-500 pl-3">
                        {item.summary}
                      </p>

                      {/* Detailed Facts list */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block font-mono">실질 사실 관계 도면</span>
                        <ul className="space-y-2.5">
                          {item.details.map((detail, idx2) => (
                            <li key={idx2} className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-neutral-300 pl-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pedagogic Lesson / Reflection summary box */}
                      <div className="bg-[#0c1814] border border-emerald-900/30 rounded-xl p-4 flex gap-3 text-xs sm:text-sm">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-emerald-300 block mb-0.5 font-serif">역사 평화 교육적 결론</strong>
                          <span className="text-emerald-400/90 leading-relaxed font-semibold block">
                            {item.lessonLearned}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Summary Box reflecting how 1994 UNCLOS changed the dynamic */}
      <div className="bg-[#0b0c0e]/40 border border-neutral-900 rounded-3xl p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-3">
          <h4 className="font-bold text-white text-base md:text-lg flex items-center gap-1.5 font-serif">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            현대 독도 영유권 수호 및 평화 대조의 방향성
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            과거의 독도 교육이 '독도는 원래 무조건 우리 땅'이라는 외침에만 치중이었다면, 현대 주권론은 객관적인 사료 교차 전개, 서양 해양법상 조약 해석학의 치밀한 분석, 그리고 동아시아 공동체의 평화적 교과서 연대에 초점을 맞춤으로써 단순한 감정적 충돌을 극복해 나가고 있습니다.
          </p>
        </div>
        <div className="lg:col-span-4 bg-[#0c1814] border border-emerald-900/30 rounded-2xl p-4 space-y-1.5 text-xs text-emerald-400">
          <span className="font-bold block text-emerald-300 font-serif">💡 학습 포인트:</span>
          <p className="leading-relaxed font-semibold text-emerald-300/90 text-xs text-emerald-400/80">
            우리가 배워야 할 것은 일본 국민 전체를 적으로 등지는 폐쇄된 맹목론이 아닌, 왜곡 자료를 전파하는 군국주의 성향의 정치 선전 논리를 완벽히 탄핵하는 '차갑고 치밀한 실증적 역사 비평 지각'입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
