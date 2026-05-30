/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
    return;
  }

  try {
    const { keywords, tone } = req.body;

    if (!keywords || typeof keywords !== 'string') {
      res.status(400).json({ error: '소감문 작성용 키워드가 제공되지 않았습니다.' });
      return;
    }

    // In Vercel serverless environment, read from process.env.GEMINI_API_KEY
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ 
        error: 'GEMINI_API_KEY 환경 변수가 제공되지 않았습니다. Vercel Project Settings > Environment Variables 패널에서 GEMINI_API_KEY를 설정해 주세요.' 
      });
      return;
    }

    // Initialize the Gemini SDK
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemPrompt = `당신은 독도 영토 주권 교육(지리적 진실, 역사 고문서, 현대 평화적 해결책)을 마친 대한민국 고등학생 수업 참여자입니다.
주어진 키워드를 바탕으로 학습 소감문(교육 감상문)을 정중하고 비판적이며 설득력 있게 작성해 주십시오.

어조/문체 스타일: ${tone || '학술적이고 객관적인 어조'}
작성 언어: 한국어

지침:
1. 입력 받은 키워드를 문장에 자연스럽게 내포시키십시오.
2. 절대 흥분된 비난이나 욕설 등의 자극적 감정 단어를 배제하고, 사실(Fact)과 증거에 기초한 지각있는 학생의 태도로 논리있게 작성하십시오.
3. 분량은 3-4문장 내외(약 200~300자 내외)로 간결하되 깊은 울림을 주게 작성하십시오.
4. 인사나 설명, 사족 같은 부가 텍스트는 전면 배제하고, 소감문 본문만 바로 표시하십시오.`;

    // Model generation with fallback
    let response;
    try {
      console.log('Attempting to generate reflection with gemini-3.5-flash...');
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `키워드: '${keywords}'\n이 키워드들을 완벽히 반영하여 소감문을 작성해 주세요.`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });
    } catch (error: any) {
      console.warn('gemini-3.5-flash failed, trying fallback to gemini-2.5-flash...', error);
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `키워드: '${keywords}'\n이 키워드들을 완벽히 반영하여 소감문을 작성해 주세요.`,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          }
        });
      } catch (fallbackError: any) {
        console.error('Both Gemini models failed:', fallbackError);
        const errMsg = fallbackError.message || String(fallbackError);
        const isPermissionError = errMsg.includes('PERMISSION_DENIED') || errMsg.includes('403') || errMsg.includes('denied') || errMsg.includes('access');
        
        if (isPermissionError) {
          throw new Error(
            `Gemini API 호출 권한 오류가 발생했습니다. (Code: 403 PERMISSION_DENIED)\n\n` +
            `[원인]: Vercel에 설정된 API Key의 구글 클라우드(GCP) 프로젝트에서 API 사용제한이 걸려있거나, 리전(지역) 규제 또는 계정 차단 상태일 수 있습니다.\n\n` +
            `[해결 대책]:\n` +
            `1. https://aistudio.google.com/ 에 접속하여 작동 가능한 새 API 키를 다시 생성해 주세요.\n` +
            `2. Vercel 프로젝트 대시보드 > [Settings] > [Environment Variables] 메뉴로 이동합니다.\n` +
            `3. 'GEMINI_API_KEY' 항목을 지우거나 새로 생성한 API 키 값으로 편집하고 저장해 주세요.\n` +
            `4. 변경 사항을 반영하기 위해 Vercel의 [Deployments]에서 최신 빌드를 다시 배포(Redeploy)해 주세요.`
          );
        }
        throw fallbackError;
      }
    }

    const text = response.text || '';
    res.status(200).json({ reflection: text.trim() });
  } catch (error: any) {
    console.error('Gemini error generating reflection on Vercel:', error);
    res.status(500).json({ error: error.message || '소감문을 생성하는 중 에러가 발생했습니다.' });
  }
}
