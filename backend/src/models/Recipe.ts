export interface Recipe {
  userId: string
  recipeId: string
  createdAt: string
  title: string
  description: string
  ingredients: string[]
  photoUrl?: string
}
