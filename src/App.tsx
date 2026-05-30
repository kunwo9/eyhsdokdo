/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Compass, 
  Map, 
  Landmark, 
  Award, 
  PenTool, 
  HelpCircle, 
  CheckCircle, 
  Menu, 
  X, 
  BookMarked,
  Sparkles,
  Info,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

import GeographyVisualizer from './components/GeographyVisualizer';
import HistoryExplorer from './components/HistoryExplorer';
import ModernConflictTimeline from './components/ModernConflictTimeline';
import InteractiveWorksheet from './components/InteractiveWorksheet';

type SectionType = 'overview' | 'geography' | 'history' | 'modern' | 'worksheet';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const DOKDO_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "울릉도 고지대에서는 독도가 또렷이 관측되지만, 일본 오키섬에서는 어떤 기후 상태에서도 독도가 관측되지 않는 근본 이유는 무엇일까요?",
    options: [
      "지구 곡률과 절대적 거리 한계 (157.5km) 때문",
      "일본 관내의 기압 변화 때문",
      "오키섬 주변의 수증기가 더 조밀하기 때문",
      "해무가 항상 남하하여 시야를 가리기 때문"
    ],
    correctIdx: 0,
    explanation: "지구는 둥글기 때문에 시야의 한계선(지평선 거리)이 발생합니다. 울릉도 고지대에서는 87.4km 거리의 독도가 또렷이 관측되지만, 오키섬에서는 157.5km 거리 한계와 곡률 탓에 육안 관측이 물리적으로 절대 불가능합니다."
  },
  {
    id: 2,
    question: "대한제국 고종 황제가 칙령 제41호를 통해 독도(석도)를 지방 행정체계인 '울도군'에 편입해 공시한 해는 몇 년도인가요? (시마네현 고시보다 5년 선행)",
    options: [
      "1877년 (메이지 10년)",
      "1900년 (광무 4년)",
      "1905년 (시마네현 고시)",
      "1910년 (경술국치 배제)"
    ],
    correctIdx: 1,
    explanation: "고종 황제는 1900년 10월 25일에 대한제국 칙령 제41호를 반포하여 울릉도를 군으로 승격하고 석도(독도)를 관할로 규정했습니다. 이는 일본 우익이 독도를 무주지라며 편입 시도한 1905년보다 5년이나 앞선 근대적 주권 선포입니다."
  },
  {
    id: 3,
    question: "1877년 일본 최고 사법·행정 중앙 기구인 이곳에서 '울릉도와 독도는 일본 전토 영역과 아무런 관계가 없음'을 내무성에 확실히 지시한 공문서는 무엇입니까?",
    options: [
      "은주시청합기",
      "조선국교제시말내탐서",
      "태정관 지령 (太政官 指令)",
      "시마네현 고시 제40호"
    ],
    correctIdx: 2,
    explanation: "태정관(太政官)은 메이지 정부 시기 일본 최고 행정 군무 결정 기구입니다. 이 기구에서 '태정관 지령(1877)'을 통해 독도가 일본 영토에서 원천 배제되어 있음을 국가 최고 의사 결정 단위에서 완벽히 수용하여 행정에 반영했습니다."
  }
];

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Quiz State
  const [answeredQ, setAnsweredQ] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Track progress based on current section selected
  useEffect(() => {
    const progressMap: Record<SectionType, number> = {
      overview: 20,
      geography: 40,
      history: 60,
      modern: 80,
      worksheet: 100,
    };
    setReadingProgress(progressMap[currentSection]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false); // Close mobile sidebar on navigate
  }, [currentSection]);

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (showResults) return; // Locked
    setAnsweredQ(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const getQuizScore = () => {
    let score = 0;
    DOKDO_QUIZ.forEach(q => {
      if (answeredQ[q.id] === q.correctIdx) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-200 font-sans antialiased flex flex-col justify-between select-text">
      {/* Top Banner Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-neutral-900 z-50">
        <div 
          className="h-full bg-emerald-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Main Top Header Navigation */}
      <header className="sticky top-1.5 bg-[#0b0c0e]/95 backdrop-blur-md border-b border-neutral-900/80 z-40 px-4 py-3 sm:px-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              id="mobile-menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="메뉴 열기"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-emerald-500" />
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none font-serif">독도 영토 주권 교육 종합 플랫폼</h1>
                <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline-block">Dokdo Territorial Sovereignty Education Curriculum</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-950/40 text-emerald-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-900/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              2026.05 통합 보조 교재 발행본
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Sidebar */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-8 px-4 py-8 sm:px-6">
        {/* Navigation Sidebar Drawer */}
        <aside className={`
          fixed inset-y-0 left-0 w-64 bg-[#0a0b0d] border-r border-neutral-900 z-50 p-6 shadow-2xl transform transition-transform duration-300 lg:static lg:transform-none lg:shadow-none lg:p-0 lg:z-0 lg:w-72 shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex lg:hidden items-center justify-between pb-6 border-b border-neutral-900 mb-6">
            <span className="font-bold text-white font-serif">교과 대목 리스트</span>
            <button 
              id="mobile-close-sidebar"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 cursor-pointer hover:bg-neutral-900 rounded"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          </div>

          <div className="space-y-6 lg:sticky lg:top-20">
            {/* Textbook Identity Banner */}
            <div className="bg-neutral-900/80 border border-neutral-800 text-neutral-100 rounded-2xl p-4.5 space-y-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 -mr-4 -mb-4 select-none pointer-events-none">
                <Compass className="w-32 h-32 text-emerald-500" />
              </div>
              <h3 className="font-bold text-sm tracking-tight text-emerald-400 font-serif">지리·역사 융합 수업자료</h3>
              <p className="text-[10px] text-neutral-400 leading-normal">
                대한민국 역사·지리 평화교육위원회 편찬
                <br />비판적 사고력과 평화 공동 해결 모색
              </p>
            </div>

            {/* Stepper Side Buttons */}
            <div className="space-y-1">
              <button
                id="sidebar-btn-overview"
                onClick={() => setCurrentSection('overview')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                  currentSection === 'overview'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>교재 요약 및 개요</span>
              </button>

              <button
                id="sidebar-btn-geography"
                onClick={() => setCurrentSection('geography')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                  currentSection === 'geography'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>1차시: 지위와 영역 분석</span>
              </button>

              <button
                id="sidebar-btn-history"
                onClick={() => setCurrentSection('history')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                  currentSection === 'history'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <Map className="w-4 h-4 shrink-0" />
                <span>2차시: 사료와 고지도 규명</span>
              </button>

              <button
                id="sidebar-btn-modern"
                onClick={() => setCurrentSection('modern')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                  currentSection === 'modern'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <Landmark className="w-4 h-4 shrink-0" />
                <span>3차시: 현대 갈등과 평화</span>
              </button>

              <button
                id="sidebar-btn-worksheet"
                onClick={() => setCurrentSection('worksheet')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                  currentSection === 'worksheet'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <PenTool className="w-4 h-4 shrink-0" />
                <span>수업 활동지 및 종합 성찰</span>
              </button>
            </div>

            {/* Curriculum index */}
            <div className="bg-neutral-900/30 border border-neutral-900 p-4 rounded-2xl hidden lg:block space-y-3">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block font-mono">CURRICULUM SPEC</span>
              <div className="space-y-2 text-[11px] text-neutral-400">
                <p className="flex justify-between"><span>수업 대상:</span> <span className="font-semibold text-neutral-200">중·고등학교 역사/지리</span></p>
                <p className="flex justify-between"><span>학습 주제:</span> <span className="font-semibold text-neutral-200">독도의 주권과 평화 공존</span></p>
                <p className="flex justify-between"><span>소요 시간:</span> <span className="font-semibold text-neutral-200">총 3차시 + 종합 활동</span></p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0" id="main-scroll-view">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {currentSection === 'overview' && (
                <div className="space-y-12">
                  {/* Majestic Banner / Cover Sheet */}
                  <div className="bg-gradient-to-br from-neutral-900 via-[#111317] to-neutral-950 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden border border-neutral-800 shadow-xl">
                    {/* Background decorations */}
                    <div className="absolute right-0 bottom-0 opacity-5 select-none pointer-events-none translate-x-20 translate-y-20">
                      <Compass className="w-96 h-96 text-emerald-500" />
                    </div>

                    <div className="relative z-10 max-w-3xl space-y-5">
                      <span className="text-[10px] font-semibold uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-800/40 inline-block">
                        중·고등용 역사 및 지리 융합 수업 보조 자료
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300">
                        독도 영토 주권 교육 종합 교재
                      </h2>
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                        지리적 특성, 역사적 사료 분석 및 한일 갈등의 실효적·평화적 해결 방안
                      </p>
                      
                      <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-neutral-500">
                        <span>발행처: 대한민국 역사·지리 평화교육위원회</span>
                        <span className="hidden sm:inline">•</span>
                        <span>개정일: 2026년 5월</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Executive synopsis */}
                  <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex items-center gap-2 border-b border-neutral-900 pb-4">
                      <Award className="w-5 h-5 text-emerald-500" />
                      <h3 className="font-semibold text-white text-lg font-serif">교재 요약 및 지필 목적</h3>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed text-left whitespace-pre-line select-text">
                      본 교재는 대한민국 독도의 현대·중세적 지위와 동해 해양 영토의 역사적 문맥을 체계적으로 이해하기 위해 기획되었습니다. 
                      학생들이 단순한 감정적 해법과 격동의 주장을 넘어 법적으로 확실한 역사적 고문서, 법적 조약문, 고지도의 시각적 대조 분석을 바탕으로 엄정한 지리 사실관계를 정립하고, 나아가 미래 동아시아의 평화적 공동 해결 방안과 비판적 사고력을 스스로 기르는 것을 목적으로 합니다.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      <div className="space-y-2 border-t-2 border-emerald-500/80 pt-4">
                        <span className="text-[10px] uppercase font-mono text-emerald-400 font-extrabold">Step 1</span>
                        <h4 className="font-bold text-white text-sm sm:text-base flex items-center justify-between">
                          <span className="font-serif">1차시: 지리와 영역 의의</span>
                          <ChevronRight className="w-4 h-4 text-neutral-600" />
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          수리 좌표와 면적, 울릉도에서의 또렷한 육안 관측성 증명, 국가 영역의 3요소(영토·영해·영공) 및 도로명 주소를 탐구합니다.
                        </p>
                        <button onClick={() => setCurrentSection('geography')} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">학습 시작하기 →</button>
                      </div>

                      <div className="space-y-2 border-t-2 border-emerald-500/80 pt-4">
                        <span className="text-[10px] uppercase font-mono text-emerald-400 font-extrabold">Step 2</span>
                        <h4 className="font-bold text-white text-sm sm:text-base flex items-center justify-between">
                          <span className="font-serif">2차시: 역사적 사료 검증</span>
                          <ChevronRight className="w-4 h-4 text-neutral-600" />
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          세종실록지리지, 1900년 제41호 칙령, 일본의 태정관 지령(1877), 삼국접양지도 대조 및 안용복 사건의 외교적 성과를 분석합니다.
                        </p>
                        <button onClick={() => setCurrentSection('history')} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">학습 시작하기 →</button>
                      </div>

                      <div className="space-y-2 border-t-2 border-emerald-500/80 pt-4">
                        <span className="text-[10px] uppercase font-mono text-emerald-400 font-extrabold">Step 3</span>
                        <h4 className="font-bold text-white text-sm sm:text-base flex items-center justify-between">
                          <span className="font-serif">3차시: 현대 갈등과 공존</span>
                          <ChevronRight className="w-4 h-4 text-neutral-600" />
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          SCAPIN 지령, 샌프란시스코 조약 틈새, 독도의용수비대의 헌신, 신한일어업협정(1998)의 어업권 대물과 현대 갈등 양상을 다룹니다.
                        </p>
                        <button onClick={() => setCurrentSection('modern')} className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer">학습 시작하기 →</button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Pre-Quiz Section for consolidation */}
                  <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex items-center gap-2 border-b border-neutral-900 pb-4">
                      <GraduationCap className="w-5 h-5 text-emerald-500" />
                      <h3 className="font-semibold text-white text-lg font-serif">독도 주권 실증 핵심 퀴즈 (학습 확인용)</h3>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      각 차시 학습을 시작하기 전, 또는 학습을 마친 후에 자신의 지식을 테스트해 보고 깊이 다질 수 있는 인터랙티브 평가입니다.
                    </p>

                    <div className="space-y-6">
                      {DOKDO_QUIZ.map((q) => {
                        const hasAnswered = q.id in answeredQ;
                        const selectedIdx = answeredQ[q.id];
                        return (
                          <div key={q.id} className="p-4 rounded-xl border border-neutral-800 bg-[#0e1013] space-y-3">
                            <h4 className="font-semibold text-neutral-200 text-sm sm:text-base font-serif">
                              Q{q.id}. {q.question}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {q.options.map((option, idx) => {
                                const isCorrect = idx === q.correctIdx;
                                const isSelected = idx === selectedIdx;
                                return (
                                  <button
                                    key={idx}
                                    id={`quiz-q${q.id}-opt${idx}`}
                                    disabled={showResults}
                                    onClick={() => handleSelectOption(q.id, idx)}
                                    className={`text-left text-xs sm:text-sm p-3 rounded-lg border transition-all cursor-pointer ${
                                      showResults
                                        ? isCorrect
                                          ? 'border-emerald-600 bg-emerald-950/40 text-emerald-300 font-medium'
                                          : isSelected
                                            ? 'border-rose-800 bg-rose-950/40 text-rose-300'
                                            : 'border-neutral-800 text-neutral-500 bg-neutral-900/20'
                                        : isSelected
                                          ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300 font-medium'
                                          : 'border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 text-neutral-300'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                            
                            {/* Answer review after completion */}
                            {showResults && (
                              <div className="p-3 bg-emerald-950/30 border border-emerald-900/30 rounded-lg text-xs text-emerald-400 leading-relaxed">
                                <span className="font-bold block mb-1">
                                  {selectedIdx === q.correctIdx ? "✓ 정답입니다!" : "✗ 오답입니다."}
                                </span>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {!showResults ? (
                        <button
                          type="button"
                          id="btn-quiz-submit"
                          onClick={() => {
                            if (Object.keys(answeredQ).length < DOKDO_QUIZ.length) {
                              alert("모든 문항의 정답을 골라주세요.");
                              return;
                            }
                            setShowResults(true);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] cursor-pointer"
                        >
                          정답 제출 및 분석 확인
                        </button>
                      ) : (
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-white">
                            내 성적: <strong className="text-emerald-400 text-lg font-black font-serif">{getQuizScore()} / 3</strong> 정답
                          </span>
                          <button
                            type="button"
                            id="btn-quiz-reset"
                            onClick={() => {
                              setAnsweredQ({});
                              setShowResults(false);
                            }}
                            className="text-xs font-bold text-neutral-300 bg-neutral-800 px-4 py-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-700 cursor-pointer"
                          >
                            다시 풀기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentSection === 'geography' && <GeographyVisualizer />}
              {currentSection === 'history' && <HistoryExplorer />}
              {currentSection === 'modern' && <ModernConflictTimeline />}
              {currentSection === 'worksheet' && <InteractiveWorksheet />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Primary Footer */}
      <footer className="bg-neutral-950 text-neutral-500 text-xs py-8 border-t border-neutral-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="space-y-1">
            <p className="font-bold text-white text-sm font-serif">독도 영토 주권 교육 종합 플랫폼</p>
            <p className="text-neutral-400 leading-normal">
              본 교재는 중·고등용 역사 및 지리 교과 융합 수업을 위해 구성되었습니다.
              <br />
              대한민국 독도는 주권, 영토, 영해의 침해 없는 온전한 주권 영역입니다.
            </p>
          </div>
          <div className="text-right md:text-right text-neutral-500 font-mono text-[10px]">
            <span>© 2026 대한민국 역사·지리 평화교육위원회 발행</span>
            <br />
            <span>Curriculum for East Asian Coexistence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
