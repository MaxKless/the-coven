import { NextResponse } from 'next/server';
import { getAllRecipes, getRecipe } from './recipes.repository';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const recipe = getRecipe(id);
    if (recipe) {
      return NextResponse.json(recipe);
    } else {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }
  } else {
    const recipes = getAllRecipes();
    return NextResponse.json(recipes);
  }
}
