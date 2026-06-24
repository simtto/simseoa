import { NextRequest, NextResponse } from 'next/server';
import { supabase, QuizResult } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body: QuizResult = await request.json();

    const { student_name, class_info, score, total, answers } = body;

    if (!student_name || !class_info || score === undefined || !total || !answers) {
      return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('quiz_results')
      .insert([{ student_name, class_info, score, total, answers }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
