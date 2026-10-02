const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`
export const CATEGORIES = ['All', 'Starters', 'Main Course', 'Breads', 'Beverages', 'Desserts']
export const MENU = [
  { id: 1, name: 'Paneer Butter Masala', desc: 'Soft paneer in a slow-cooked tomato and butter gravy.', price: 220, category: 'Main Course', veg: true, rating: 4.7, available: true, image: u('photo-1631452180519-c014fe946bc7') },
  { id: 2, name: 'Veg Biryani', desc: 'Basmati rice dum-cooked with vegetables, saffron and mint.', price: 180, category: 'Main Course', veg: true, rating: 4.5, available: true, image: u('photo-1563379091339-03b21ab4a4f8') },
  { id: 3, name: 'Dal Makhani', desc: 'Black lentils simmered overnight with cream and butter.', price: 160, category: 'Main Course', veg: true, rating: 4.6, available: true, image: u('photo-1546833999-b9f581a1996d') },
  { id: 4, name: 'Butter Naan', desc: 'Tandoor-baked bread brushed with white butter.', price: 45, category: 'Breads', veg: true, rating: 4.4, available: true, image: u('photo-1601050690597-df0568f70950') },
  { id: 5, name: 'Veg Manchurian', desc: 'Crisp vegetable dumplings tossed in a garlic-soy glaze.', price: 150, category: 'Starters', veg: true, rating: 4.3, available: true, image: u('photo-1585032226651-759b368d7246') },
  { id: 6, name: 'Masala Lemonade', desc: 'Fresh lemon, roasted cumin, black salt and mint over ice.', price: 80, category: 'Beverages', veg: true, rating: 4.5, available: true, image: u('photo-1621263764928-df1444c5e859') },
  { id: 7, name: 'Gulab Jamun', desc: 'Warm khoya dumplings soaked in cardamom syrup.', price: 90, category: 'Desserts', veg: true, rating: 4.8, available: true, image: u('photo-1666190020376-0cdb1da31de9') },
  { id: 8, name: 'Chole Bhature', desc: 'Spiced chickpea curry with two puffed, fluffy bhature.', price: 160, category: 'Main Course', veg: true, rating: 4.6, available: true, image: u('photo-1626132647523-66f5bf380027') },
  { id: 9, name: 'Chicken Tikka', desc: 'Yogurt-marinated chicken charred in the tandoor.', price: 260, category: 'Starters', veg: false, rating: 4.7, available: true, image: u('photo-1599487488170-d11ec9c172f0') },
]
const L = (name, qty, price) => ({ name, qty, price })
export const SEED_ORDERS = [
  { id: 'RF1024', customer: 'Himanshu', mine: true, status: 'Preparing', amount: 390, items: [L('Paneer Butter Masala', 1, 220), L('Butter Naan', 2, 45), L('Masala Lemonade', 1, 80)] },
  { id: 'RF1023', customer: 'Rahul', status: 'Ready', amount: 280, items: [L('Dal Makhani', 1, 160), L('Masala Lemonade', 1, 80)] },
  { id: 'RF1022', customer: 'Ankit', status: 'Out for Delivery', amount: 620, items: [L('Paneer Butter Masala', 1, 220), L('Veg Biryani', 1, 180), L('Gulab Jamun', 1, 90), L('Butter Naan', 2, 45)] },
]
