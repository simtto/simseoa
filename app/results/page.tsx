'use client';

import React, { useEffect, useState } from 'react';
import { QuizResult, AnswerRecord } from '@/lib/supabase';

type ResultRow = QuizResult & { id: string; created_at: string };

export default function ResultsPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/results')
      .then((r) => r.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setResults(json.data ?? []);
      })
      .catch(() => setError('결과를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = results.filter(
    (r) =>
      r.student_name.toLowerCase().includes(search.toLowerCase()) ||
      r.class_info.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore =
    results.length > 0
      ? (results.reduce((s, r) => s + (r.score / r.total) * 100, 0) / results.length).toFixed(1)
      : '—';

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('ko-KR', {
      month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            📚 EduCampus Quiz
          </a>
          <span className="text-sm text-slate-400 border border-white/10 px-3 py-1.5 rounded-lg">교사용 결과 대시보드</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">📊 학생 퀴즈 결과</h1>
        <p className="text-slate-400 text-sm mb-8">총 <span className="text-white font-semibold">{results.length}명</span> 응시 · 평균 정답률 <span className="text-indigo-400 font-semibold">{avgScore}%</span></p>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: '총 응시자', value: results.length.toString(), icon: '👥' },
            { label: '평균 정답률', value: `${avgScore}%`, icon: '📈' },
            { label: '만점자', value: results.filter((r) => r.score === r.total).length.toString(), icon: '🏆' },
            { label: '50% 미만', value: results.filter((r) => r.score / r.total < 0.5).length.toString(), icon: '📚' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* 검색 */}
        <div className="mb-4">
          <input
            id="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름 또는 반/학번 검색..."
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {loading && (
          <div className="text-center py-20 text-slate-400 animate-pulse">결과를 불러오는 중...</div>
        )}
        {error && (
          <div className="bg-rose-500/10 border border-rose-400/20 rounded-2xl p-6 text-rose-300">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-500">검색 결과가 없습니다.</div>
            )}
            {filtered.map((r) => {
              const pct = Math.round((r.score / r.total) * 100);
              const barColor = pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-indigo-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500';
              const isOpen = expandedId === r.id;

              return (
                <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-400/30 transition-all duration-200">
                  {/* 요약 행 */}
                  <button
                    id={`result-row-${r.id}`}
                    onClick={() => setExpandedId(isOpen ? null : r.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">{r.student_name}</span>
                        <span className="text-xs text-slate-400 border border-white/10 rounded px-1.5 py-0.5">{r.class_info}</span>
                      </div>
                      <p className="text-xs text-slate-500">{formatDate(r.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-white">{r.score}<span className="text-sm text-slate-400 font-normal">/{r.total}</span></div>
                        <div className={`text-xs font-semibold ${pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-indigo-400' : pct >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>{pct}%</div>
                      </div>
                      <div className="w-24">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span className="text-slate-500 text-sm">{isOpen ? '▲' : '▼'}</span>
                    </div>
                  </button>

                  {/* 상세 답변 (펼침) */}
                  {isOpen && (
                    <div className="border-t border-white/10 px-6 py-4 space-y-2">
                      <h4 className="text-sm font-semibold text-slate-300 mb-3">답변 상세</h4>
                      {(r.answers as AnswerRecord[]).map((a, i) => (
                        <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 ${a.is_correct ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                          <span className="text-base flex-shrink-0">{a.is_correct ? '✅' : '❌'}</span>
                          <div className="min-w-0">
                            <p className="text-sm text-slate-200">{a.question}</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              선택: <span className={a.is_correct ? 'text-emerald-400' : 'text-rose-400'}>{a.selected}</span>
                              {!a.is_correct && <> · 정답: <span className="text-emerald-400">{a.correct}</span></>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
