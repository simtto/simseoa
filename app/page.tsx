'use client';

import React from 'react';

// 여기에 새로운 컴포넌트(예: NavigationMenu, QuizComponent 등)를 추가하거나 불러오세요.
// import NewComponent from '@/components/NewComponent';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* 1. 상단 헤더 (Header) */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* 서비스 로고 (텍스트) */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
              EduCampus
            </span>
          </div>

          {/* 네비게이션 바 공간 */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">홈</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">강의소개</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">학습방</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">커뮤니티</a>
          </nav>

          {/* 헤더 오른쪽 영역 (예: 로그인 버튼 공간) */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              로그인
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm hover:shadow transition-all">
              시작하기
            </button>
          </div>
        </div>
        {/* 여기에 모바일 메뉴 컴포넌트(MobileNav)를 추가하세요. */}
      </header>

      {/* 2. 메인 화면 (Hero Section) */}
      <main className="flex-1 flex flex-col justify-center items-center py-12 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl space-y-8">
          {/* 배지 디자인 */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/30 animate-pulse">
            ✨ 교육용 웹 서비스의 첫 걸음
          </div>

          {/* 환영 문구 */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] sm:leading-[1.15]">
            나만의{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400">
              교육용 웹앱
            </span>{" "}
            만들기
          </h1>

          {/* 간단한 설명 */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            배포 걱정 없는 가장 깔끔한 뼈대에서 시작하세요. 이 템플릿은 Vercel에 즉시 배포할 수 있으며, 학생들을 위한 다양한 학습 도구와 교육용 서비스를 개발하는 데 최적화되어 있습니다.
          </p>

          {/* 기능 추가를 위한 placeholder 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button 
              onClick={() => alert('축하합니다! 기본 뼈대 코드의 플레이스홀더 버튼이 정상 작동합니다. 이곳에 원하는 기능을 구현해 보세요.')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600 rounded-xl shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              새로운 기능 추가하기
            </button>
            
            {/* 여기에 추가적인 버튼이나 액션 컴포넌트(예: 가이드 문서 보기 등)를 추가하세요. */}
          </div>
        </div>

        {/* 3. 확장성 공간 (Features Grid Placeholder) */}
        <section className="mt-16 sm:mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 카드 1 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-xl text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              🎓
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">온라인 퀴즈 및 시험</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              학생들이 직접 풀어볼 수 있는 퀴즈, 타이머 시험 및 자동 채점 기능을 개발해 보세요.
            </p>
          </div>

          {/* 카드 2 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/50 flex items-center justify-center text-xl text-violet-600 dark:text-violet-400 mb-4 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">학습 대시보드</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              학습 진척도, 점수 트렌드 및 성취 배지 관리 기능으로 학습 동기를 불어넣으세요.
            </p>
          </div>

          {/* 카드 3 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-xl text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">실시간 질문 및 피드백</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              선생님과 학생 간 실시간 소통을 돕는 보드 및 피드백 컴포넌트를 설계해 보세요.
            </p>
          </div>
          
          {/* 여기에 더 많은 기능 카드 컴포넌트(FeatureCard)를 추가하거나 API 데이터를 연동하세요. */}
        </section>
      </main>

      {/* 4. 하단 푸터 (Footer) */}
      <footer className="w-full border-t border-slate-200/80 bg-white/60 dark:border-slate-800/80 dark:bg-slate-950/40 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} EduCampus. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">이용약관</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">고객지원</a>
          </div>
        </div>
        {/* 여기에 푸터 브랜딩 요소나 사이트맵 컴포넌트를 추가하세요. */}
      </footer>
    </div>
  );
}
