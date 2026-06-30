const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://kiwwigpdallmiksyajjk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpd3dpZ3BkYWxsbWlrc3lhamprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjgzNjM1NSwiZXhwIjoyMDk4NDEyMzU1fQ.mvF_lRJemP-s1NAwb14YDEs3hYyy1KYvfBFwWXaJhl4' // service_role key
);

const stores = [
  { id: 'aldi',       name: 'Aldi',         color: '#0066CC', "darkColor": '#4499FF', logo: '🟦', website: 'https://aldi.co.uk',       type: 'budget'  },
  { id: 'lidl',       name: 'Lidl',         color: '#0050A0', "darkColor": '#3388FF', logo: '🔵', website: 'https://lidl.co.uk',       type: 'budget'  },
  { id: 'asda',       name: 'Asda',         color: '#78BE20', "darkColor": '#99DD33', logo: '🟢', website: 'https://asda.com',         type: 'mid'     },
  { id: 'morrisons',  name: "Morrisons",    color: '#FFD700', "darkColor": '#FFE566', logo: '🟡', website: 'https://morrisons.com',    type: 'mid'     },
  { id: 'tesco',      name: 'Tesco',        color: '#EE1C25', "darkColor": '#FF5560', logo: '🔴', website: 'https://tesco.com',        type: 'mid'     },
  { id: 'sainsburys', name: "Sainsbury's",  color: '#FF6600', "darkColor": '#FF8833', logo: '🟠', website: 'https://sainsburys.co.uk', type: 'premium' },
];

const products = [
  { id: 'toilet-paper-9',  name: 'Toilet Paper (9-roll)',   category: 'bulk-household', unit: 'per roll',   icon: '🧻' },
  { id: 'toilet-paper-24', name: 'Toilet Paper (24-roll)',  category: 'bulk-household', unit: 'per roll',   icon: '🧻' },
  { id: 'kitchen-roll',    name: 'Kitchen Roll (4-pack)',   category: 'bulk-household', unit: 'per roll',   icon: '🧻' },
  { id: 'washing-liquid',  name: 'Washing-Up Liquid 1L',   category: 'bulk-household', unit: 'per 100ml',  icon: '🧴' },
  { id: 'laundry-tabs-30', name: 'Laundry Tabs (30-wash)', category: 'bulk-household', unit: 'per wash',   icon: '🧺' },
  { id: 'bin-bags-50',     name: 'Bin Bags (50-pack)',      category: 'bulk-household', unit: 'per bag',    icon: '🗑️' },
  { id: 'dish-tabs-40',    name: 'Dishwasher Tabs (40pk)', category: 'bulk-household', unit: 'per tab',    icon: '🧽' },
  { id: 'chicken-breast',  name: 'Chicken Breast 1kg',   category: 'protein', unit: 'per 100g', icon: '🍗' },
  { id: 'chicken-thighs',  name: 'Chicken Thighs 1kg',   category: 'protein', unit: 'per 100g', icon: '🍗' },
  { id: 'beef-mince',      name: 'Beef Mince 500g',      category: 'protein', unit: 'per 100g', icon: '🥩' },
  { id: 'eggs-12',         name: 'Free Range Eggs (12)', category: 'protein', unit: 'per egg',  icon: '🥚' },
  { id: 'rice-1kg',       name: 'White Rice 1kg',      category: 'carbs', unit: 'per 100g',  icon: '🍚' },
  { id: 'pasta-500g',     name: 'Penne Pasta 500g',    category: 'carbs', unit: 'per 100g',  icon: '🍝' },
  { id: 'oats-1kg',       name: 'Porridge Oats 1kg',   category: 'carbs', unit: 'per 100g',  icon: '🥣' },
  { id: 'milk-2l',        name: 'Semi-Skimmed Milk 2L', category: 'dairy', unit: 'per 100ml', icon: '🥛' },
  { id: 'greek-yoghurt',  name: 'Greek Yoghurt 500g',   category: 'dairy', unit: 'per 100g',  icon: '🥛' },
  { id: 'broccoli',       name: 'Broccoli (each)',      category: 'produce', unit: 'each',    icon: '🥦' },
  { id: 'chopped-tomatoes', name: 'Chopped Tomatoes 400g', category: 'canned', unit: 'per can',  icon: '🥫' },
  { id: 'olive-oil-500ml',  name: 'Olive Oil 500ml',      category: 'condiments', unit: 'per 100ml', icon: '🫙' },
  { id: 'chickpeas-400g',   name: 'Chickpeas 400g',        category: 'canned', unit: 'per can',  icon: '🫘' },
  { id: 'potatoes-2kg',   name: 'Potatoes 2kg',        category: 'carbs', unit: 'per 100g',  icon: '🥔' },
  { id: 'sweet-potato',   name: 'Sweet Potatoes 1kg',  category: 'carbs', unit: 'per 100g',  icon: '🍠' },
  { id: 'spinach-bag',    name: 'Baby Spinach 200g',    category: 'produce', unit: 'per 100g', icon: '🥬' },
  { id: 'mixed-peppers',  name: 'Mixed Peppers (3pk)',  category: 'produce', unit: 'each',    icon: '🫑' },
  { id: 'onions-1kg',     name: 'Onions 1kg',           category: 'produce', unit: 'per 100g', icon: '🧅' },
  { id: 'garlic-bulb',    name: 'Garlic Bulb',          category: 'produce', unit: 'each',    icon: '🧄' },
  { id: 'carrots-1kg',    name: 'Carrots 1kg',          category: 'produce', unit: 'per 100g', icon: '🥕' },
  { id: 'salmon-fillet',   name: 'Salmon Fillets 2pk',   category: 'protein', unit: 'per 100g', icon: '🐟' },
  { id: 'coconut-milk',     name: 'Coconut Milk 400ml',    category: 'canned', unit: 'per can',  icon: '🥥' },
  { id: 'lentils-can',      name: 'Green Lentils 400g',    category: 'canned', unit: 'per can',  icon: '🫘' },
  { id: 'stock-cubes',      name: 'Stock Cubes (10pk)',   category: 'condiments', unit: 'per cube',  icon: '🧂' },
  { id: 'mixed-herbs',      name: 'Mixed Herbs 20g',      category: 'condiments', unit: 'per 10g',   icon: '🌿' },
];

function getUrl(storeId, productId) {
  const baseUrls = {
    aldi: 'https://groceries.aldi.co.uk/en-GB/p-',
    lidl: 'https://www.lidl.co.uk/p/',
    asda: 'https://groceries.asda.com/product/',
    morrisons: 'https://groceries.morrisons.com/products/',
    tesco: 'https://www.tesco.com/groceries/en-GB/products/',
    sainsburys: 'https://www.sainsburys.co.uk/gol-ui/product/'
  };
  return `${baseUrls[storeId]}${productId}-${Math.floor(Math.random() * 10000)}`;
}

const storePrices = [];
const basePrices = {
  'toilet-paper-9': 3.25, 'toilet-paper-24': 6.89, 'kitchen-roll': 2.29, 'washing-liquid': 1.25,
  'laundry-tabs-30': 5.50, 'bin-bags-50': 2.99, 'dish-tabs-40': 5.00, 'chicken-breast': 4.00,
  'chicken-thighs': 2.99, 'beef-mince': 2.89, 'eggs-12': 2.69, 'rice-1kg': 1.09,
  'pasta-500g': 0.89, 'oats-1kg': 1.15, 'milk-2l': 1.45, 'greek-yoghurt': 1.50,
  'broccoli': 0.59, 'chopped-tomatoes': 0.45, 'olive-oil-500ml': 3.50, 'chickpeas-400g': 0.55,
  'potatoes-2kg': 1.20, 'sweet-potato': 1.10, 'spinach-bag': 1.50, 'mixed-peppers': 1.30,
  'onions-1kg': 0.90, 'garlic-bulb': 0.30, 'carrots-1kg': 0.60, 'salmon-fillet': 4.50,
  'coconut-milk': 0.90, 'lentils-can': 0.60, 'stock-cubes': 1.00, 'mixed-herbs': 0.70
};

const sizes = {
  'toilet-paper-9': '9 rolls', 'toilet-paper-24': '24 rolls', 'kitchen-roll': '4 rolls', 'washing-liquid': '1L',
  'laundry-tabs-30': '30 tabs', 'bin-bags-50': '50 bags', 'dish-tabs-40': '40 tabs', 'chicken-breast': '1kg',
  'chicken-thighs': '1kg', 'beef-mince': '500g', 'eggs-12': '12 eggs', 'rice-1kg': '1kg',
  'pasta-500g': '500g', 'oats-1kg': '1kg', 'milk-2l': '2L', 'greek-yoghurt': '500g',
  'broccoli': '~400g', 'chopped-tomatoes': '400g', 'olive-oil-500ml': '500ml', 'chickpeas-400g': '400g',
  'potatoes-2kg': '2kg', 'sweet-potato': '1kg', 'spinach-bag': '200g', 'mixed-peppers': '3 peppers',
  'onions-1kg': '1kg', 'garlic-bulb': '1 bulb', 'carrots-1kg': '1kg', 'salmon-fillet': '2 fillets',
  'coconut-milk': '400ml', 'lentils-can': '400g', 'stock-cubes': '10 cubes', 'mixed-herbs': '20g'
};

const storeModifiers = { aldi: 0.85, lidl: 0.86, asda: 0.95, tesco: 0.98, morrisons: 1.05, sainsburys: 1.15 };

for (const product of products) {
  for (const store of stores) {
    const baseP = basePrices[product.id] || 2.00;
    const price = +(baseP * storeModifiers[store.id]).toFixed(2);
    
    let baseUnitQty = 1;
    if (product.unit.includes('100g')) baseUnitQty = 10;
    if (product.unit.includes('100ml')) baseUnitQty = 10;
    if (product.unit.includes('roll')) baseUnitQty = product.id.includes('24') ? 24 : (product.id.includes('9') ? 9 : 4);
    if (product.unit.includes('wash') || product.unit.includes('tab')) baseUnitQty = parseInt(product.name.match(/\d+/)?.[0] || "1", 10);
    if (product.unit.includes('egg')) baseUnitQty = 12;

    const pricePerUnit = +(price / baseUnitQty).toFixed(3);

    storePrices.push({
      storeId: store.id,
      productId: product.id,
      price,
      size: sizes[product.id] || 'Standard',
      pricePerUnit,
      baseUnit: product.unit.replace('per ', ''),
      inStock: true,
      onOffer: store.id === 'tesco' && Math.random() > 0.7,
      offerNote: store.id === 'tesco' ? 'Clubcard price' : null,
      url: getUrl(store.id, product.id)
    });
  }
}

async function seed() {
  await supabase.from('stores').delete().neq('id', 'x');
  await supabase.from('products').delete().neq('id', 'x');
  
  const { error: sErr } = await supabase.from('stores').insert(stores);
  if (sErr) console.error('Stores Error:', sErr);

  const { error: pErr } = await supabase.from('products').insert(products);
  if (pErr) console.error('Products Error:', pErr);

  const { error: spErr } = await supabase.from('store_prices').insert(storePrices);
  if (spErr) console.error('Store Prices Error:', spErr);

  console.log('Seed complete!');
}

seed();
