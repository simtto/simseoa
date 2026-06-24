'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { questions, Question } from '@/lib/questions';
import { AnswerRecord } from '@/lib/supabase';

// ──────────────────────────────────────────────────────────
// 단계 타입
// ──────────────────────────────────────────────────────────
type Stage = 'intro' | 'quiz' | 'result';

// ──────────────────────────────────────────────────────────
// 유틸: 배열 섞기
// ──────────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ──────────────────────────────────────────────────────────
// 카테고리 색상
// ──────────────────────────────────────────────────────────
const categoryColor: Record<string, string> = {
  과학: 'bg-emerald-100 text-emerald-700',
  역사: 'bg-amber-100 text-amber-700',
  수학: 'bg-blue-100 text-blue-700',
  지리: 'bg-teal-100 text-teal-700',
  국어: 'bg-rose-100 text-rose-700',
  사회: 'bg-violet-100 text-violet-700',
};

// ──────────────────────────────────────────────────────────
// 점수별 메시지
// ──────────────────────────────────────────────────────────
function getScoreMessage(score: number, total: number) {
  const pct = (score / total) * 100;
  if (pct === 100) return { emoji: '🏆', msg: '완벽한 점수! 최고예요!', color: 'from-yellow-400 to-amber-500' };
  if (pct >= 80) return { emoji: '🎉', msg: '훌륭해요! 거의 다 맞혔어요!', color: 'from-indigo-500 to-violet-600' };
  if (pct >= 60) return { emoji: '👍', msg: '잘 했어요! 조금 더 노력해봐요!', color: 'from-blue-500 to-cyan-500' };
  if (pct >= 40) return { emoji: '📚', msg: '절반 이상은 맞혔어요. 복습해봐요!', color: 'from-orange-400 to-rose-500' };
  return { emoji: '💪', msg: '포기하지 마세요! 다시 도전해봐요!', color: 'from-rose-500 to-pink-600' };
}

// ──────────────────────────────────────────────────────────
// 메인 컴포넌트
// ──────────────────────────────────────────────────────────
export default function Home() {
  const [stage, setStage] = useState<Stage>('intro');
  const [studentName, setStudentName] = useState('');
  const [classInfo, setClassInfo] = useState('');
  const [formError, setFormError] = useState('');

  const [quizList, setQuizList] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // ── 퀴즈 시작
  const startQuiz = () => {
    if (!studentName.trim()) { setFormError('이름을 입력해주세요.'); return; }
    if (!classInfo.trim()) { setFormError('반/학번을 입력해주세요.'); return; }
    setFormError('');
    setQuizList(shuffleArray(questions).slice(0, 10));
    setCurrentIdx(0);
    setAnswers([]);
    setSelected(null);
    setTimeLeft(20);
    setStage('quiz');
  };

  // ── 정답 제출
  const submitAnswer = useCallback((choice: string | null) => {
    const q = quizList[currentIdx];
    const finalChoice = choice ?? '(시간 초과)';
    const record: AnswerRecord = {
      question: q.question,
      selected: finalChoice,
      correct: q.answer,
      is_correct: finalChoice === q.answer,
    };

    const newAnswers = [...answers, record];
    setAnswers(newAnswers);
    setSelected(finalChoice);

    // 잠시 후 다음 문제 or 결과
    setTimeout(() => {
      if (currentIdx + 1 < quizList.length) {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setTimeLeft(20);
      } else {
        // 마지막 문제 → 저장 → 결과
        saveResult(newAnswers);
      }
    }, 900);
  }, [quizList, currentIdx, answers]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 타이머
  useEffect(() => {
    if (stage !== 'quiz' || selected !== null) return;
    if (timeLeft <= 0) { submitAnswer(null); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [stage, timeLeft, selected, submitAnswer]);

  // ── Supabase 저장
  const saveResult = async (finalAnswers: AnswerRecord[]) => {
    setSaving(true);
    setSaveError('');
    const score = finalAnswers.filter((a) => a.is_correct).length;
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: studentName,
          class_info: classInfo,
          score,
          total: finalAnswers.length,
          answers: finalAnswers,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        setSaveError(err.error ?? '저장 실패');
      }
    } catch {
      setSaveError('네트워크 오류로 저장에 실패했습니다.');
    } finally {
      setSaving(false);
      setStage('result');
    }
  };

  // ── 다시 시작
  const restart = () => {
    setStage('intro');
    setStudentName('');
    setClassInfo('');
    setAnswers([]);
    setSelected(null);
  };

  // ──────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            📚 EduCampus Quiz
          </span>
          <a
            href="/results"
            className="text-xs font-medium text-slate-400 hover:text-indigo-300 transition-colors border border-white/10 rounded-lg px-3 py-1.5 hover:border-indigo-400/40"
          >
            교사 결과 보기 →
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {/* ── INTRO ── */}
        {stage === 'intro' && (
          <div className="w-full max-w-md animate-fade-in">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-900/40">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🎯</div>
                <h1 className="text-3xl font-extrabold text-white mb-2">퀴즈 시작하기</h1>
                <p className="text-slate-400 text-sm">10문제 · 문제당 20초 · 자동 채점</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="student-name">
                    이름
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
                    placeholder="예: 홍길동"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="class-info">
                    반 / 학번
                  </label>
                  <input
                    id="class-info"
                    type="text"
                    value={classInfo}
                    onChange={(e) => setClassInfo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
                    placeholder="예: 2학년 3반 / 20230001"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                {formError && (
                  <p className="text-rose-400 text-sm font-medium">{formError}</p>
                )}
                <button
                  id="start-quiz-btn"
                  onClick={startQuiz}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
                >
                  퀴즈 시작하기 🚀
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {['10문제', '20초', '즉시채점'].map((t, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="text-indigo-400 font-bold text-sm">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {stage === 'quiz' && quizList.length > 0 && (
          <div className="w-full max-w-2xl animate-fade-in">
            {/* 진행바 */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                <span>{currentIdx + 1} / {quizList.length}</span>
                <span className={`font-bold tabular-nums ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}>
                  ⏱ {timeLeft}초
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx) / quizList.length) * 100}%` }}
                />
              </div>
              {/* 타이머바 */}
              <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full transition-all duration-1000 linear ${timeLeft <= 5 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${(timeLeft / 20) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* 카테고리 배지 */}
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColor[quizList[currentIdx].category] ?? 'bg-slate-700 text-slate-300'}`}>
                {quizList[currentIdx].category}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug">
                {quizList[currentIdx].question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizList[currentIdx].options.map((opt, i) => {
                  const isSelected = selected === opt;
                  const isCorrect = opt === quizList[currentIdx].answer;
                  let btnClass = 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-indigo-400/50 hover:scale-[1.02] active:scale-[0.98]';
                  if (selected !== null) {
                    if (isCorrect) btnClass = 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 scale-[1.02]';
                    else if (isSelected) btnClass = 'bg-rose-500/20 border-rose-400/60 text-rose-300';
                    else btnClass = 'bg-white/3 border-white/5 text-slate-500 cursor-default';
                  }
                  return (
                    <button
                      key={opt}
                      id={`option-${i}`}
                      onClick={() => selected === null && submitAnswer(opt)}
                      disabled={selected !== null}
                      className={`flex items-center gap-3 w-full px-5 py-4 rounded-2xl border font-medium text-left transition-all duration-200 ${btnClass}`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm sm:text-base">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {stage === 'result' && (
          <div className="w-full max-w-2xl animate-fade-in">
            {(() => {
              const score = answers.filter((a) => a.is_correct).length;
              const { emoji, msg, color } = getScoreMessage(score, answers.length);
              return (
                <>
                  {/* 점수 카드 */}
                  <div className={`bg-gradient-to-br ${color} rounded-3xl p-8 text-white text-center mb-6 shadow-2xl`}>
                    <div className="text-6xl mb-2">{emoji}</div>
                    <h2 className="text-4xl font-extrabold mb-1">{score} / {answers.length}</h2>
                    <p className="text-lg font-semibold opacity-90">{msg}</p>
                    <p className="text-sm opacity-75 mt-1">정답률 {Math.round((score / answers.length) * 100)}%</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm opacity-80">
                      <span>👤 {studentName}</span>
                      <span>·</span>
                      <span>🏫 {classInfo}</span>
                    </div>
                    {saving && <p className="mt-3 text-sm opacity-80 animate-pulse">📤 결과 저장 중...</p>}
                    {saveError && <p className="mt-3 text-sm text-yellow-200">⚠️ {saveError}</p>}
                    {!saving && !saveError && <p className="mt-3 text-sm opacity-75">✅ 결과가 저장되었습니다</p>}
                  </div>

                  {/* 오답 풀이 */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">📋 상세 답변 풀이</h3>
                    {answers.map((a, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl p-4 border ${a.is_correct ? 'bg-emerald-500/10 border-emerald-400/20' : 'bg-rose-500/10 border-rose-400/20'}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg flex-shrink-0">{a.is_correct ? '✅' : '❌'}</span>
                          <div className="min-w-0">
                            <p className="text-slate-200 font-medium text-sm mb-1">{a.question}</p>
                            <p className="text-xs text-slate-400">내 답: <span className={a.is_correct ? 'text-emerald-400' : 'text-rose-400'}>{a.selected}</span></p>
                            {!a.is_correct && (
                              <p className="text-xs text-emerald-400 mt-0.5">정답: {a.correct}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 다시 시작 */}
                  <button
                    id="restart-btn"
                    onClick={restart}
                    className="w-full mt-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    다시 도전하기 🔄
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} EduCampus · 학습 결과는 Supabase에 안전하게 저장됩니다
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease both; }
      `}</style>
    </div>
  );
}
