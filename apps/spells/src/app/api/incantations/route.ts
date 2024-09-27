import { NextResponse } from 'next/server';
import { getAllIncantations } from '../recipes/recipes.repository';

export async function GET() {
  const incantations = getAllIncantations();
  return NextResponse.json(incantations);
}
