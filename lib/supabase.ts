import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type QuizResult = {
  id?: string;
  student_name: string;
  class_info: string;
  score: number;
  total: number;
  answers: AnswerRecord[];
  created_at?: string;
};

export type AnswerRecord = {
  question: string;
  selected: string;
  correct: string;
  is_correct: boolean;
};
