/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileUp, Landmark, BookOpen, UserCheck, RefreshCw, PenTool, Sparkles, Printer, HelpCircle } from 'lucide-react';
import { WorksheetState } from '../types';

const INITIAL_WORKSHEET: WorksheetState = {
  memberKorea: '',
  memberJapan: '',
  title: '',
  content: '',
  evaluation: '',
  answers: {
    question1: '',
    question2: '',
    question3: '',
  }
};

const DRAFT_TEMPLATE_PRESET = "한·일 공동 교과서 집필문 단원 예시안";

export default function InteractiveWorksheet() {
  const [worksheet, setWorksheet] = useState<WorksheetState>(() => {
    const saved = localStorage.getItem('dokdo_worksheet');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return INITIAL_WORKSHEET;
      }
    }
    return INITIAL_WORKSHEET;
  });

  const [aiReviewStatus, setAiReviewStatus] = useState<{
    reviewed: boolean;
    hasKoreaSillok: boolean;
    hasDajokan: boolean;
    isToneObjective: boolean;
    score: number;
    feedback: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem('dokdo_worksheet', JSON.stringify(worksheet));
  }, [worksheet]);

  const handleInputChange = (field: keyof WorksheetState | string, value: string, isAnswer = false) => {
    if (isAnswer) {
      setWorksheet(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [field]: value
        }
      }));
    } else {
      setWorksheet(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const resetWorksheet = () => {
    if (window.confirm("정말로 작성 양식과 답변을 초기화하시겠습니까?")) {
      setWorksheet(INITIAL_WORKSHEET);
      setAiReviewStatus(null);
    }
  };

  // Automated rubric rule check simulator (satisfying the textbook requirements)
  const runSelfEvaluation = () => {
    const text = worksheet.content || '';
    const title = worksheet.title || '';
    
    if (!title.trim() || !text.trim()) {
      alert("집필문의 제목과 본문을 완성해 주세요.");
      return;
    }

    // Checking requirements
    const hasSillok = text.includes('세종실록') || text.includes('1454');
    const hasDajokan = text.includes('태정관') || text.includes('1877');
    const hasImperialChiklyung = text.includes('칙령') || text.includes('1900') || text.includes('석도');
    const hasSejong = text.includes('삼국접양') || text.includes('하야시');

    // Emotion count check (we want low emotional words for factual description)
    const emotionalWords = ['빼앗긴', '도둑', '쳐들어온', '도적', '화가', '분노', '나쁜', '죽여라', '감정적'];
    let emotionalCount = 0;
    emotionalWords.forEach(word => {
      if (text.includes(word)) emotionalCount++;
    });

    const isToneObjective = emotionalCount === 0;

    // Calculate score
    let score = 50;
    if (hasSillok) score += 15;
    if (hasDajokan) score += 15;
    if (hasImperialChiklyung || hasSejong) score += 10;
    if (isToneObjective) score += 10;
    else score -= Math.min(emotionalCount * 5, 20);

    const docCount = [hasSillok, hasDajokan, hasImperialChiklyung, hasSejong].filter(Boolean).length;

    let feedback = "";
    if (score >= 90) {
      feedback = "훌륭합니다! 세종실록지리지와 태정관 지령 등 명확한 한일 양국의 관찬 서한 증거를 정립하고, 감정론을 배제한 완벽한 팩트 위주의 미래지향적 교과서 집필문입니다. 한·일 학생 모두 평화롭게 동의할 만한 균형 잡힌 명작입니다.";
    } else if (score >= 70) {
      feedback = "양호한 수준입니다. 역사적 사료(최소 2개 이상)를 적절히 반영하였습니다. 다만 서술 방향을 조금 더 다듬거나, '흥분된 한자 어투'나 일방비난 어투를 제거하여 학술적 객관성을 보완한다면 더욱 흠잡을 데 없는 공동 교과서가 될 것입니다.";
    } else {
      feedback = "작성 조건 검토가 더 필요합니다. 공동 교과서는 '태정관 지령', '세종실록지리지' 등 교차 교정 사료 중 최소 2개 이상을 반드시 언급해야 합니다. 감정이나 감성적 형용사는 한 걸음 누그러뜨리고, 엄정한 고문서 증거로써 상대를 완벽하게 승복시키는 문체로 다시 써 보세요.";
    }

    setAiReviewStatus({
      reviewed: true,
      hasKoreaSillok: hasSillok || hasImperialChiklyung,
      hasDajokan: hasDajokan || hasSejong,
      isToneObjective: isToneObjective,
      score: Math.min(score, 100),
      feedback: feedback
    });
  };

  const fillExampleDraft = () => {
    setWorksheet(prev => ({
      ...prev,
      memberKorea: "김강민 (대한 서울외고)",
      memberJapan: "우에하라 유이 (일본 오사카중)",
      title: "동해의 평화로운 등대 평화선, 역사와 평화로 규명하는 독도",
      content: "동해의 외딴 섬 독도는 역사적 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도(우산)가 서로 거리가 멀지 않아 날씨가 맑으면 육안으로 관측 가능하다고 기록되어 양국의 고대 생활권과 가치를 명시했다. 또한 일본 메이지 정부 최고 귀속 사법 기관이 하달한 『태정관 지령(1877년)』에서도 울릉도와 독도가 일본 영역 판도와 관계없음을 명백히 확정 지었다. 양국 학생과 청소년 세대는 과거 제국주의 갈등의 폭력을 규탄하되, 엄정한 사료 진실을 직시하고 동해를 서로 번영하는 평화의 바다로 가꾸는 데 머리를 맞대어야 한다.",
      answers: {
        question1: "일본의 최고 정규 사법 기관인 태정관 스스로 독도가 일본 영토가 아님을 인정한 결정적인 최고 공문서로, 현대 일본 정부의 '역사성 보유 주장'을 자국 공식 법령 기록으로 정면 격파할 수 있는 모체이기 때문입니다.",
        question2: "당시 UN 해양법 협정 발효로 배타적 경제수역(EEZ)이 중첩되었으나, 독도의 독자적 기점 획정을 전격 유예하고 실리 위주의 어업권 보존과 무역 안정이라는 일시적인 정치적 타협을 선택했기 때문입니다. 다만 이로 인해 국내 여론 분조와 영유 왜곡의 빌미를 준 면도 있습니다.",
        question3: "왜곡 교과서로 세뇌되는 차세대 갈등을 사전에 방지하고 친근한 일대일 학술 소통을 전개하여 극단적인 우익 프로파간다를 학문적 팩트로 차단하고 극복하는 우호적 동반자 가교가 필요하기 때문입니다."
      }
    }));
    setAiReviewStatus(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Lesson Header */}
      <div className="border-l-4 border-emerald-500 pl-4 py-1">
        <h2 className="text-2xl font-bold text-white font-serif tracking-tight">수업 활동지: 한·일 평화 공동 교과서 집필하기</h2>
        <p className="text-neutral-400 mt-1 text-sm sm:text-base">
          한·일 청소년들이 함께 머리를 맞대고, 양방의 지리적·역사적 왜곡을 넘어 미래 세대와 공유할 '객관적인 평화 교과서'의 한 구절을 상상해 보며 집필문을 써 봅시다.
        </p>
      </div>

      {/* Classroom Activity Guideline Card */}
      <div className="bg-[#0c1814] border border-emerald-950 text-neutral-200 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-xs">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 text-emerald-950/20 scale-150 pointer-events-none select-none">
          <BookOpen className="w-64 h-64" />
        </div>

        <div className="relative z-10 space-y-4">
          <span className="text-[9px] font-bold font-mono tracking-widest text-emerald-400 bg-emerald-950 border border-emerald-900/35 px-2.5 py-0.5 rounded-full">
            RULES & COMPOSITION STANDARD
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-serif">
            공동 교과서 집필시 반드시 충족해야 할 평화 서술 원칙
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm pt-2">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 space-y-2">
              <strong className="font-bold text-emerald-300 block flex items-center gap-1.5 font-serif">
                <Landmark className="w-4 h-4 text-emerald-400" />
                1. 명확한 사료 증거 제시
              </strong>
              <p className="leading-relaxed text-neutral-400">
                우산도(독도)의 관측성을 다룬 한국의 <strong>세종실록지리지(1454년)</strong>나 일본 스스로 독도 소유를 배제한 <strong>태정관 지령(1877년)</strong> 중 최소 <strong className="text-emerald-400 font-bold">2개 이상</strong>의 사료 근거를 글에 자연스럽게 내포시키세요.
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 space-y-2">
              <strong className="font-bold text-emerald-300 block flex items-center gap-1.5 font-serif">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                2. 객관적 비평적 서술 유지
              </strong>
              <p className="leading-relaxed text-neutral-400">
                일방적인 격앙된 비난, 자극적 감정 표현, 비하적인 단어를 전면 배제하고, 차갑고 엄밀한 <strong>사실(Fact) 중심의 서술</strong>을 취하여 양국 독자들이 모두 지리적 정당성에 승복하도록 만드세요.
              </p>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 space-y-2">
              <strong className="font-bold text-emerald-300 block flex items-center gap-1.5 font-serif">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                3. 미래지향적 관점 제시
              </strong>
              <p className="leading-relaxed text-neutral-400">
                과거의 상흔과 영해 침탈에 대한 경계를 잊지 않되, 분쟁을 넘어서 동해 바다를 <strong>한일 미래 조화와 공동 어업 평화의 영방</strong>으로 가꾸기 위한 세대 연대의 메시지로 짧게 끝맺으세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Worksheet Editor View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input form */}
        <div className="lg:col-span-7 bg-[#0b0c0e]/40 border border-neutral-900 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 font-serif">
              <PenTool className="w-5 h-5 text-emerald-400" />
              공동 집필 양식 작성소
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                id="btn-fill-example"
                onClick={fillExampleDraft}
                className="px-2.5 py-1 rounded text-[11px] font-bold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 transition-colors cursor-pointer border border-emerald-900/40"
              >
                우수 집필 예시 불러오기
              </button>
              <button
                type="button"
                id="btn-worksheet-reset"
                onClick={resetWorksheet}
                className="px-2.5 py-1 rounded text-[11px] font-bold text-neutral-400 bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer border border-neutral-700/40"
              >
                비우기
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Participant Name split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300">모둠원 (한국 학생 이름)</label>
                <input
                  type="text"
                  id="input-member-korea"
                  value={worksheet.memberKorea}
                  onChange={(e) => handleInputChange('memberKorea', e.target.value)}
                  placeholder="예: 홍길동 (서울 국사고)"
                  className="w-full text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-300">모둠원 (일본 학생 이름)</label>
                <input
                  type="text"
                  id="input-member-japan"
                  value={worksheet.memberJapan}
                  onChange={(e) => handleInputChange('memberJapan', e.target.value)}
                  placeholder="예: 사토 하지메 (도쿄 중)"
                  className="w-full text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Lesson Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-300 font-sans">우리가 함께 제안하는 공동 독도 단원명</label>
              <input
                type="text"
                id="input-draft-title"
                value={worksheet.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="예: 지리와 사료를 넘어서 함께 쓰는 동해 평화사"
                className="w-full text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:outline-none font-medium"
              />
            </div>

            {/* Main Draft Area */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-300">공동 집필 본문 (10줄 이내 서술형)</label>
                <span className="text-2xs text-neutral-500">글자수: {(worksheet.content || '').length}자</span>
              </div>
              <textarea
                id="textarea-draft-content"
                rows={7}
                value={worksheet.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder={`여기에 집필할 공동 교과서 내용을 직접 상상하여 기재해 보세요.
세종실록지리지, 태정관 지령 등의 문헌과 연도 등을 객관적으로 인용한 다음, 감정론을 피해 평화 공동체 번영 어휘로 마무리 지으세요.`}
                className="w-full text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl p-4 focus:border-emerald-500 focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Discussion Reflection fields */}
            <div className="pt-4 border-t border-neutral-900 space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-1 font-serif">
                <HelpCircle className="w-4.5 h-4.5 text-emerald-400" />
                성찰 및 토론 질문지 작성란
              </h4>

              {/* Q1 */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-neutral-300 leading-relaxed select-text font-sans">
                  질문 1. 일본의 1877년 『태정관 지령』 및 첨부된 『기죽도약도』가 현대 일본 정부의 주장을 탄해하여 무력화하는 최고로 확실한 카드이며 근거인 이유는 무엇인지 약술해 봅시다.
                </p>
                <textarea
                  id="textarea-q1"
                  rows={2}
                  value={worksheet.answers.question1}
                  onChange={(e) => handleInputChange('question1', e.target.value, true)}
                  placeholder="답변을 작성하세요..."
                  className="w-full text-xs sm:text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl p-3 focus:border-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Q2 */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-neutral-300 leading-relaxed select-text font-sans">
                  질문 2. 1998년 체결된 『신한일어업협정』에서 왜 독도가 한국의 독적인 관세 기점으로 획정되지 못하고 완충 중간수역에 놓이게 되었는지 당시 한일 입장과 어업 보호의 비하인드로 진단합시다.
                </p>
                <textarea
                  id="textarea-q2"
                  rows={2}
                  value={worksheet.answers.question2}
                  onChange={(e) => handleInputChange('question2', e.target.value, true)}
                  placeholder="답변을 작성하세요..."
                  className="w-full text-xs sm:text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl p-3 focus:border-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Q3 */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-neutral-300 leading-relaxed select-text font-sans">
                  질문 3. 미래 세대인 우리가 독도 갈등을 양국 갈등으로 확장하지 않고 성숙하고 학술적으로 극복하기 위해 청소년 평화 캠프나 동아리가 열리고 활성화되어야 하는 목적과 본인의 포부를 쓰세요.
                </p>
                <textarea
                  id="textarea-q3"
                  rows={2}
                  value={worksheet.answers.question3}
                  onChange={(e) => handleInputChange('question3', e.target.value, true)}
                  placeholder="답변을 작성하세요..."
                  className="w-full text-xs sm:text-sm border border-neutral-800 bg-[#070708] text-white rounded-xl p-3 focus:border-emerald-500 focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                id="btn-evaluation-check"
                onClick={runSelfEvaluation}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                평가 규칙 자동 점검기 실행
              </button>

              <button
                type="button"
                id="btn-print-doc"
                onClick={handlePrint}
                className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-700"
              >
                <Printer className="w-4 h-4" />
                인쇄 및 PDF 내보내기
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Preview / Evaluation Sheet */}
        <div className="lg:col-span-5 space-y-6">
          {/* Autograding details */}
          {aiReviewStatus && (
            <div className="bg-[#0c1814] border border-emerald-900/50 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950 border border-emerald-900/40 px-2.5 py-0.5 rounded-full font-mono">
                  집필 규범 인성 점수
                </span>
                <span className="font-mono text-xl font-black text-emerald-400">{aiReviewStatus.score} / 100점</span>
              </div>

              <div className="space-y-2 text-xs">
                <h5 className="font-bold text-white font-serif">세부 달성 체크리스트:</h5>
                <div className="space-y-1.5">
                  <p className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${aiReviewStatus.hasKoreaSillok ? 'bg-emerald-500' : 'bg-neutral-700'}`}></span>
                    <span className={aiReviewStatus.hasKoreaSillok ? 'text-neutral-200 font-medium' : 'text-neutral-500'}>
                      한국 측 대표 사료 인용 (세종실록지리지, 1900년 칙령 등)
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${aiReviewStatus.hasDajokan ? 'bg-emerald-500' : 'bg-neutral-700'}`}></span>
                    <span className={aiReviewStatus.hasDajokan ? 'text-neutral-200 font-medium' : 'text-neutral-500'}>
                      일본 및 제3공인 사료 인용 (태정관 지령, 삼국접양지도 등)
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${aiReviewStatus.isToneObjective ? 'bg-emerald-500' : 'bg-neutral-700'}`}></span>
                    <span className={aiReviewStatus.isToneObjective ? 'text-neutral-200 font-medium' : 'text-neutral-500'}>
                      객관적·비교적 언어 정비 및 격양 표현 순화 여부
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-neutral-950 border border-neutral-900 p-3.5 rounded-xl text-xs text-neutral-300 leading-relaxed font-sans">
                <strong className="block text-white font-bold mb-1 font-serif">피드백 평결 요약:</strong>
                {aiReviewStatus.feedback}
              </div>
            </div>
          )}

          {/* Textbook Design Card Showcase Preview */}
          <div className="bg-[#070708] border-2 border-dashed border-neutral-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
            {/* Textbook header */}
            <div className="border-b-2 border-neutral-900 pb-4 space-y-2">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block text-center">
                COMMUNITY WRITING DRAFT FOR THE SEA OF COEXISTENCE
              </span>
              <h4 className="text-center font-bold text-white text-lg font-serif">
                {worksheet.title.trim() ? worksheet.title : '제안하는 공동 집필 소단원명'}
              </h4>
              <div className="flex justify-center gap-6 text-[10px] text-neutral-500 font-mono">
                <span>한국인 필진: <strong className="text-neutral-300 font-sans">{worksheet.memberKorea || '미기입'}</strong></span>
                <span>일본인 필진: <strong className="text-neutral-300 font-sans">{worksheet.memberJapan || '미기입'}</strong></span>
              </div>
            </div>

            {/* Custom Paragraph body */}
            <div className="py-6 flex-1 text-xs md:text-sm text-neutral-300 leading-relaxed font-serif text-justify whitespace-pre-wrap select-all">
              {worksheet.content.trim() 
                ? worksheet.content 
                : "좌측의 집필 본문을 쓰고 평가 점검을 실행하면, 이곳에 근사한 인쇄용 공동 교과서 본문 지면이 실제 활자 책 구도로 웅장하게 서식화되어 미리 보여집니다."}
            </div>

            {/* Textbook stamp footer */}
            <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-neutral-500 gap-2">
              <span>서명 승인: _____________________</span>
              <span className="font-mono">동아시아 공동 보조 교육 자료 위원회</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
