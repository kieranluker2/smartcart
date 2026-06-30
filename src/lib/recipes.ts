// Curated meal prep recipes with ingredient mappings to our product database
// Used when Spoonacular API is unavailable or for quick lookups

export interface RecipeIngredient {
  name: string;
  amount: string;
  productId?: string; // links to our price DB
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  ingredients: RecipeIngredient[];
  steps: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  icon: string;
}

export const recipes: Recipe[] = [
  {
    id: 'chicken-rice-broccoli',
    title: 'Classic Meal Prep Bowls',
    description: 'The gold standard of meal prep — lean protein, complex carbs, and greens.',
    prepTime: 10,
    cookTime: 30,
    servings: 5,
    calories: 420,
    protein: 42,
    carbs: 45,
    fat: 8,
    tags: ['high-protein', 'low-fat', 'meal-prep', 'gluten-free'],
    difficulty: 'easy',
    mealType: 'lunch',
    icon: '🍗',
    ingredients: [
      { name: 'Chicken breast', amount: '1kg', productId: 'chicken-breast' },
      { name: 'White rice', amount: '400g dry', productId: 'rice-1kg' },
      { name: 'Broccoli', amount: '2 heads', productId: 'broccoli' },
      { name: 'Olive oil', amount: '2 tbsp', productId: 'olive-oil-500ml' },
      { name: 'Mixed herbs', amount: '1 tsp', productId: 'mixed-herbs' },
    ],
    steps: [
      'Cook rice according to packet instructions.',
      'Season chicken with herbs, salt and pepper. Grill or bake at 200°C for 25 mins.',
      'Steam or roast broccoli for 15 mins.',
      'Divide into 5 meal prep containers. Refrigerate up to 4 days.',
    ],
  },
  {
    id: 'beef-pasta',
    title: 'Bolognese Pasta Bake',
    description: 'Rich beef mince with tomatoes and pasta — freezes beautifully.',
    prepTime: 15,
    cookTime: 40,
    servings: 6,
    calories: 510,
    protein: 35,
    carbs: 58,
    fat: 14,
    tags: ['high-protein', 'freezable', 'bulk-cook'],
    difficulty: 'easy',
    mealType: 'dinner',
    icon: '🍝',
    ingredients: [
      { name: 'Beef mince', amount: '500g', productId: 'beef-mince' },
      { name: 'Penne pasta', amount: '500g', productId: 'pasta-500g' },
      { name: 'Chopped tomatoes', amount: '2 cans', productId: 'chopped-tomatoes' },
      { name: 'Onion', amount: '2 large', productId: 'onions-1kg' },
      { name: 'Garlic', amount: '4 cloves', productId: 'garlic-bulb' },
      { name: 'Olive oil', amount: '1 tbsp', productId: 'olive-oil-500ml' },
    ],
    steps: [
      'Fry onion and garlic in olive oil for 5 mins.',
      'Brown mince, drain excess fat.',
      'Add tomatoes and simmer 20 mins.',
      'Cook pasta al dente, combine with sauce.',
      'Divide into 6 containers. Lasts 5 days fridge, 3 months frozen.',
    ],
  },
  {
    id: 'egg-oats-breakfast',
    title: 'Overnight Oats & Egg Cups',
    description: 'Batch-prep breakfasts for the whole week — zero morning effort.',
    prepTime: 15,
    cookTime: 20,
    servings: 5,
    calories: 380,
    protein: 24,
    carbs: 42,
    fat: 12,
    tags: ['breakfast', 'meal-prep', 'high-protein', 'vegetarian'],
    difficulty: 'easy',
    mealType: 'breakfast',
    icon: '🥣',
    ingredients: [
      { name: 'Porridge oats', amount: '500g', productId: 'oats-1kg' },
      { name: 'Eggs', amount: '10', productId: 'eggs-12' },
      { name: 'Greek yoghurt', amount: '500g', productId: 'greek-yoghurt' },
      { name: 'Mixed peppers', amount: '1 pack', productId: 'mixed-peppers' },
    ],
    steps: [
      'Overnight oats: Mix 80g oats with 200ml milk and 100g yoghurt per jar. Refrigerate overnight.',
      'Egg cups: Dice peppers, fill muffin tins, crack an egg into each.',
      'Bake egg cups at 180°C for 15 mins.',
      'Store 5 jars and 10 egg cups in fridge for the week.',
    ],
  },
  {
    id: 'chickpea-curry',
    title: 'Chickpea & Coconut Curry',
    description: 'Budget-friendly vegan curry that tastes even better the next day.',
    prepTime: 10,
    cookTime: 25,
    servings: 6,
    calories: 340,
    protein: 14,
    carbs: 52,
    fat: 9,
    tags: ['vegan', 'budget', 'freezable', 'gluten-free'],
    difficulty: 'easy',
    mealType: 'dinner',
    icon: '🍛',
    ingredients: [
      { name: 'Chickpeas', amount: '2 cans', productId: 'chickpeas-400g' },
      { name: 'Coconut milk', amount: '1 can', productId: 'coconut-milk' },
      { name: 'Chopped tomatoes', amount: '1 can', productId: 'chopped-tomatoes' },
      { name: 'Rice', amount: '400g', productId: 'rice-1kg' },
      { name: 'Onion', amount: '2', productId: 'onions-1kg' },
      { name: 'Garlic', amount: '4 cloves', productId: 'garlic-bulb' },
    ],
    steps: [
      'Fry onion and garlic until golden.',
      'Add spices (curry powder, cumin, turmeric).',
      'Add chickpeas, tomatoes, and coconut milk. Simmer 20 mins.',
      'Serve over rice. Store in fridge 5 days, freezes 3 months.',
    ],
  },
  {
    id: 'salmon-sweet-potato',
    title: 'Salmon & Sweet Potato Tray Bake',
    description: 'Omega-3 rich, colourful, and minimal washing up.',
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    calories: 460,
    protein: 36,
    carbs: 38,
    fat: 18,
    tags: ['high-protein', 'omega-3', 'gluten-free', 'one-tray'],
    difficulty: 'easy',
    mealType: 'dinner',
    icon: '🐟',
    ingredients: [
      { name: 'Salmon fillets', amount: '2 packs', productId: 'salmon-fillet' },
      { name: 'Sweet potatoes', amount: '1kg', productId: 'sweet-potato' },
      { name: 'Spinach', amount: '200g', productId: 'spinach-bag' },
      { name: 'Olive oil', amount: '3 tbsp', productId: 'olive-oil-500ml' },
    ],
    steps: [
      'Cube sweet potatoes, toss in olive oil, roast 20 mins at 200°C.',
      'Add salmon fillets to tray, season well.',
      'Roast another 12–15 mins.',
      'Wilt spinach and divide into 4 containers.',
    ],
  },
  {
    id: 'lentil-soup',
    title: 'Hearty Lentil & Veg Soup',
    description: 'Thick, warming, and costs under £1 per serving.',
    prepTime: 10,
    cookTime: 35,
    servings: 8,
    calories: 220,
    protein: 12,
    carbs: 38,
    fat: 3,
    tags: ['vegan', 'budget', 'high-fibre', 'freezable'],
    difficulty: 'easy',
    mealType: 'lunch',
    icon: '🥣',
    ingredients: [
      { name: 'Green lentils', amount: '2 cans', productId: 'lentils-can' },
      { name: 'Carrots', amount: '500g', productId: 'carrots-1kg' },
      { name: 'Onions', amount: '2', productId: 'onions-1kg' },
      { name: 'Chopped tomatoes', amount: '1 can', productId: 'chopped-tomatoes' },
      { name: 'Stock cubes', amount: '2', productId: 'stock-cubes' },
    ],
    steps: [
      'Fry onions and carrots for 8 mins.',
      'Add lentils, tomatoes, and 1.5L water with stock cubes.',
      'Simmer 25 mins until thick. Blend half for creamier texture.',
      'Store in 8 portions. Freezes perfectly for 3 months.',
    ],
  },
];

// Ingredient name to product ID mappings for Spoonacular API results
export const ingredientMappings: Record<string, string> = {
  'chicken breast': 'chicken-breast',
  'chicken': 'chicken-breast',
  'chicken thighs': 'chicken-thighs',
  'ground beef': 'beef-mince',
  'minced beef': 'beef-mince',
  'beef mince': 'beef-mince',
  'salmon': 'salmon-fillet',
  'eggs': 'eggs-12',
  'egg': 'eggs-12',
  'rice': 'rice-1kg',
  'white rice': 'rice-1kg',
  'pasta': 'pasta-500g',
  'penne': 'pasta-500g',
  'oats': 'oats-1kg',
  'rolled oats': 'oats-1kg',
  'milk': 'milk-2l',
  'greek yogurt': 'greek-yoghurt',
  'yogurt': 'greek-yoghurt',
  'broccoli': 'broccoli',
  'spinach': 'spinach-bag',
  'bell pepper': 'mixed-peppers',
  'peppers': 'mixed-peppers',
  'onion': 'onions-1kg',
  'onions': 'onions-1kg',
  'garlic': 'garlic-bulb',
  'carrots': 'carrots-1kg',
  'carrot': 'carrots-1kg',
  'tomatoes': 'chopped-tomatoes',
  'canned tomatoes': 'chopped-tomatoes',
  'chickpeas': 'chickpeas-400g',
  'coconut milk': 'coconut-milk',
  'olive oil': 'olive-oil-500ml',
  'potatoes': 'potatoes-2kg',
  'sweet potato': 'sweet-potato',
  'lentils': 'lentils-can',
};
