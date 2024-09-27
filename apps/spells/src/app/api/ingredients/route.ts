import { NextResponse } from 'next/server';
import { getAllIngredients } from '../recipes/recipes.repository';

export async function GET() {
  const ingredients = getAllIngredients();
  return NextResponse.json(ingredients);
}
