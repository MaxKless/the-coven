export class Spell {
  private ingredients: string[] = [];
  private incantations: string[] = [];

  addIngredient(ingredient: string): void {
    this.ingredients.push(ingredient);
  }

  addIncantation(incantation: string): void {
    this.incantations.push(incantation);
  }

  cast({ passphrase }: { passphrase: string }): void {
    if (passphrase !== 'abracadabra') {
      throw new Error('Invalid passphrase. Spell casting failed.');
    }

    if (this.ingredients.length === 0 || this.incantations.length === 0) {
      throw new Error(
        'Spell is incomplete. Add ingredients and incantations before casting.'
      );
    }

    console.log('Spell cast successfully!');
    console.log('Ingredients used:', this.ingredients);
    console.log('Incantations recited:', this.incantations);
  }
}
