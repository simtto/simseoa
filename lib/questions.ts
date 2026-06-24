export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  category: string;
};

export const questions: Question[] = [
  {
    id: 1,
    category: '과학',
    question: '빛의 속도는 초속 약 몇 km인가요?',
    options: ['약 30만 km', '약 3만 km', '약 3천 km', '약 3억 km'],
    answer: '약 30만 km',
    explanation: '빛의 속도는 진공 중에서 초속 약 299,792km(약 30만 km)입니다.',
  },
  {
    id: 2,
    category: '역사',
    question: '한글은 누가 창제했나요?',
    options: ['세종대왕', '이순신', '정약용', '광개토대왕'],
    answer: '세종대왕',
    explanation: '한글(훈민정음)은 조선의 4대 왕 세종대왕이 1443년에 창제하였습니다.',
  },
  {
    id: 3,
    category: '수학',
    question: '원주율(π)의 값에 가장 가까운 것은?',
    options: ['3.14159…', '3.12345…', '3.41592…', '2.71828…'],
    answer: '3.14159…',
    explanation: '원주율 π ≈ 3.14159265358…이며, 원의 둘레를 지름으로 나눈 값입니다.',
  },
  {
    id: 4,
    category: '지리',
    question: '세계에서 가장 긴 강은?',
    options: ['나일강', '아마존강', '양쯔강', '미시시피강'],
    answer: '나일강',
    explanation: '나일강은 길이 약 6,650km로 세계에서 가장 긴 강으로 알려져 있습니다.',
  },
  {
    id: 5,
    category: '과학',
    question: '물의 화학식은 무엇인가요?',
    options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
    answer: 'H₂O',
    explanation: '물은 수소(H) 2개와 산소(O) 1개로 이루어진 분자로, 화학식은 H₂O입니다.',
  },
  {
    id: 6,
    category: '국어',
    question: "다음 중 '맞춤법'이 올바른 것은?",
    options: ['안 됩니다', '안됩니다', '않됩니다', '않 됩니다'],
    answer: '안 됩니다',
    explanation: "'안'은 부정 부사로 '되다'와 띄어 써야 합니다. '안 됩니다'가 올바릅니다.",
  },
  {
    id: 7,
    category: '사회',
    question: '대한민국의 수도는?',
    options: ['서울', '부산', '인천', '대전'],
    answer: '서울',
    explanation: '대한민국의 수도는 서울특별시입니다.',
  },
  {
    id: 8,
    category: '과학',
    question: '태양계에서 가장 큰 행성은?',
    options: ['목성', '토성', '천왕성', '해왕성'],
    answer: '목성',
    explanation: '목성(Jupiter)은 태양계에서 가장 큰 행성으로, 지구의 약 1,321배 부피를 가집니다.',
  },
  {
    id: 9,
    category: '역사',
    question: '임진왜란이 일어난 해는?',
    options: ['1592년', '1592년', '1636년', '1910년'],
    answer: '1592년',
    explanation: '임진왜란은 1592년(선조 25년) 일본의 조선 침략으로 시작된 전쟁입니다.',
  },
  {
    id: 10,
    category: '수학',
    question: '직각삼각형에서 빗변의 제곱은 나머지 두 변의 제곱의 합과 같다는 것은?',
    options: ['피타고라스 정리', '페르마의 정리', '유클리드의 정리', '아르키메데스의 원리'],
    answer: '피타고라스 정리',
    explanation: 'a² + b² = c² (c는 빗변)로 표현되는 피타고라스 정리입니다.',
  },
];
