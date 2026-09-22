import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  category: string;
  address: string;
  neighborhood: string;
  price: string;
  rating: string;
  image: string;
  note: string;
  x: number;
  y: number;
}

interface StreetLabel { pos: number; label: string; }
interface NeighborhoodLabel { x: number; y: number; label: string; }
interface ParkArea { name: string; large: boolean; }

interface CityData {
  id: string;
  name: string;
  short: string;
  emoji: string;
  waterLabel: string;
  hStreets: StreetLabel[];
  vStreets: StreetLabel[];
  neighborhoods: NeighborhoodLabel[];
  park1Name: string;
  park2Name: string;
  restaurants: Restaurant[];
}

// ── City data ────────────────────────────────────────────────────────────────

const CITIES: CityData[] = [
  {
    id: "sf", name: "San Francisco", short: "SF", emoji: "🌉", waterLabel: "San Francisco Bay",
    park1Name: "DOLORES PARK", park2Name: "ALAMO SQ",
    hStreets: [
      { pos: 50, label: "Geary Blvd" }, { pos: 100, label: "Post St" }, { pos: 150, label: "Sutter St" },
      { pos: 200, label: "Market St" }, { pos: 250, label: "Haight St" }, { pos: 300, label: "16th St" },
      { pos: 350, label: "18th St" }, { pos: 400, label: "24th St" }, { pos: 450, label: "Cesar Chavez" },
    ],
    vStreets: [
      { pos: 48, label: "Fillmore" }, { pos: 96, label: "Divisadero" }, { pos: 144, label: "Guerrero" },
      { pos: 192, label: "Valencia" }, { pos: 240, label: "Mission" }, { pos: 288, label: "Potrero" },
    ],
    neighborhoods: [
      { x: 30, y: 128, label: "Fillmore" }, { x: 175, y: 230, label: "Hayes Valley" },
      { x: 270, y: 128, label: "SoMa" }, { x: 235, y: 460, label: "The Mission" },
      { x: 340, y: 62, label: "Embarcadero" },
    ],
    restaurants: [
      { id: 1, name: "Zuni Café", cuisine: "American", category: "American", x: 175, y: 190, address: "1658 Market St", neighborhood: "Hayes Valley", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&auto=format", note: "Iconic SF institution. The whole roast chicken takes 45 min but you'll talk about it for years." },
      { id: 2, name: "State Bird Provisions", cuisine: "Californian", category: "Californian", x: 80, y: 155, address: "1529 Fillmore St", neighborhood: "Fillmore", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop&auto=format", note: "Dim sum-style Californian. Say yes to everything on the cart." },
      { id: 3, name: "Al's Place", cuisine: "Californian", category: "Californian", x: 228, y: 305, address: "1499 Valencia St", neighborhood: "Mission", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&auto=format", note: "Vegetable-forward genius. The brisket and smoked preparations are unmissable." },
      { id: 4, name: "Nopa", cuisine: "American", category: "American", x: 62, y: 178, address: "560 Divisadero St", neighborhood: "Divisadero", price: "$$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "Open until 1am. The wood-fired pork chop is a SF institution." },
      { id: 5, name: "Rich Table", cuisine: "American", category: "American", x: 198, y: 205, address: "199 Gough St", neighborhood: "Hayes Valley", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "Porcini doughnuts are a SF classic. Get the full tasting menu." },
      { id: 6, name: "Tartine Bakery", cuisine: "Bakery", category: "Bakery", x: 192, y: 355, address: "600 Guerrero St", neighborhood: "Mission", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop&auto=format", note: "Come at 5pm when the country loaves emerge. Queue is worth every minute." },
      { id: 7, name: "Foreign Cinema", cuisine: "Mediterranean", category: "Mediterranean", x: 258, y: 375, address: "2534 Mission St", neighborhood: "Mission", price: "$$$", rating: "★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "Movies projected in the courtyard. Oysters and steak frites are the move." },
      { id: 8, name: "Flour + Water", cuisine: "Italian", category: "Italian", x: 272, y: 412, address: "2401 Harrison St", neighborhood: "Mission", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format", note: "Best housemade pasta in the city. The tagliatelle al ragù is perfect." },
      { id: 9, name: "Rintaro", cuisine: "Japanese", category: "Japanese", x: 242, y: 328, address: "82 14th St", neighborhood: "Mission", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop&auto=format", note: "Stunning handcrafted izakaya in a converted warehouse. Everything is exceptional." },
      { id: 10, name: "Hog Island Oyster Co.", cuisine: "Seafood", category: "Seafood", x: 348, y: 88, address: "1 Ferry Building", neighborhood: "Embarcadero", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=300&h=200&fit=crop&auto=format", note: "Fresh oysters with a bay view. Get there when the Ferry Building opens." },
      { id: 11, name: "Swan Oyster Depot", cuisine: "Seafood", category: "Seafood", x: 130, y: 85, address: "1517 Polk St", neighborhood: "Nob Hill", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=300&h=200&fit=crop&auto=format", note: "Cash only, queue out the door. The chowder and cracked crab are non-negotiable." },
      { id: 12, name: "La Taqueria", cuisine: "Mexican", category: "Mexican", x: 242, y: 418, address: "2889 Mission St", neighborhood: "Mission", price: "$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop&auto=format", note: "The best burrito in SF. No rice, no fluff — just meat, beans, and cheese." },
    ],
  },
  {
    id: "nyc", name: "New York City", short: "NYC", emoji: "🗽", waterLabel: "East River",
    park1Name: "TOMPKINS SQ", park2Name: "WASHINGTON SQ",
    hStreets: [
      { pos: 50, label: "Canal St" }, { pos: 100, label: "Spring St" }, { pos: 150, label: "Houston St" },
      { pos: 200, label: "Bleecker St" }, { pos: 250, label: "W 4th St" }, { pos: 300, label: "14th St" },
      { pos: 350, label: "23rd St" }, { pos: 400, label: "34th St" }, { pos: 450, label: "42nd St" },
    ],
    vStreets: [
      { pos: 48, label: "Broadway" }, { pos: 96, label: "Bowery" }, { pos: 144, label: "1st Ave" },
      { pos: 192, label: "2nd Ave" }, { pos: 240, label: "3rd Ave" }, { pos: 288, label: "Lexington" },
    ],
    neighborhoods: [
      { x: 30, y: 128, label: "Tribeca" }, { x: 90, y: 230, label: "West Village" },
      { x: 240, y: 230, label: "East Village" }, { x: 270, y: 128, label: "LES" },
      { x: 175, y: 350, label: "Chelsea" }, { x: 340, y: 62, label: "Midtown" },
    ],
    restaurants: [
      { id: 1, name: "Via Carota", cuisine: "Italian", category: "Italian", x: 72, y: 225, address: "51 Grove St", neighborhood: "West Village", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format", note: "The cacio e pepe is perfect. Lively, beautiful room — always packed." },
      { id: 2, name: "Russ & Daughters", cuisine: "Jewish Deli", category: "American", x: 252, y: 258, address: "179 E Houston St", neighborhood: "Lower East Side", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=300&h=200&fit=crop&auto=format", note: "NYC institution since 1914. The Classic bagel with nova and schmear." },
      { id: 3, name: "Momofuku Ko", cuisine: "Japanese", category: "Japanese", x: 228, y: 225, address: "8 Extra Pl", neighborhood: "East Village", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop&auto=format", note: "Counter dining, tasting menu only. One of the best meals you'll have in the US." },
      { id: 4, name: "Le Bernardin", cuisine: "Seafood", category: "Seafood", x: 198, y: 78, address: "155 W 51st St", neighborhood: "Midtown", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=300&h=200&fit=crop&auto=format", note: "The finest seafood restaurant in NYC. The barely-cooked salmon is transcendent." },
      { id: 5, name: "Eleven Madison Park", cuisine: "Californian", category: "Californian", x: 308, y: 128, address: "11 Madison Ave", neighborhood: "Flatiron", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&auto=format", note: "Stunning room, stunning food. The celery root en croûte is iconic." },
      { id: 6, name: "Peter Luger", cuisine: "Steakhouse", category: "American", x: 340, y: 305, address: "178 Broadway", neighborhood: "Williamsburg", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop&auto=format", note: "Cash only. The porterhouse for two is the only order. Perfection." },
      { id: 7, name: "Joe's Pizza", cuisine: "Pizza", category: "Italian", x: 95, y: 248, address: "7 Carmine St", neighborhood: "West Village", price: "$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop&auto=format", note: "The perfect New York slice. Crispy, foldable, cheese-to-sauce perfection." },
      { id: 8, name: "Katz's Delicatessen", cuisine: "Jewish Deli", category: "American", x: 242, y: 265, address: "205 E Houston St", neighborhood: "Lower East Side", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=300&h=200&fit=crop&auto=format", note: "The pastrami on rye is the city's most iconic sandwich. Go for lunch." },
      { id: 9, name: "Carbone", cuisine: "Italian", category: "Italian", x: 130, y: 198, address: "181 Thompson St", neighborhood: "West Village", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format", note: "Red-sauce Italian done luxuriously. The rigatoni vodka is absurdly good." },
      { id: 10, name: "Superiority Burger", cuisine: "Vegetarian", category: "Californian", x: 210, y: 245, address: "119 Avenue A", neighborhood: "East Village", price: "$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&auto=format", note: "The best veggie burger in the world. Tiny counter, huge flavors." },
    ],
  },
  {
    id: "la", name: "Los Angeles", short: "LA", emoji: "🌴", waterLabel: "Pacific Ocean",
    park1Name: "ECHO PARK", park2Name: "MACARTHUR PK",
    hStreets: [
      { pos: 50, label: "Hollywood Blvd" }, { pos: 100, label: "Sunset Blvd" }, { pos: 150, label: "Santa Monica" },
      { pos: 200, label: "Melrose Ave" }, { pos: 250, label: "Beverly Blvd" }, { pos: 300, label: "3rd St" },
      { pos: 350, label: "Olympic Blvd" }, { pos: 400, label: "Venice Blvd" }, { pos: 450, label: "Washington Blvd" },
    ],
    vStreets: [
      { pos: 48, label: "Western" }, { pos: 96, label: "Vermont" }, { pos: 144, label: "Normandie" },
      { pos: 192, label: "Hoover" }, { pos: 240, label: "Figueroa" }, { pos: 288, label: "Grand Ave" },
    ],
    neighborhoods: [
      { x: 30, y: 128, label: "Los Feliz" }, { x: 80, y: 230, label: "Silver Lake" },
      { x: 200, y: 128, label: "Hollywood" }, { x: 265, y: 230, label: "Koreatown" },
      { x: 310, y: 340, label: "DTLA" }, { x: 50, y: 390, label: "Venice" },
    ],
    restaurants: [
      { id: 1, name: "Sqirl", cuisine: "Californian", category: "Californian", x: 80, y: 178, address: "720 N Virgil Ave", neighborhood: "Silver Lake", price: "$$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=300&h=200&fit=crop&auto=format", note: "The toast situation is legendary. FCLF jam on ricotta toast changed brunch culture." },
      { id: 2, name: "Gjusta", cuisine: "Bakery", category: "Bakery", x: 46, y: 355, address: "320 Sunset Ave", neighborhood: "Venice", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop&auto=format", note: "The best bakery in LA. Everything — bread, pastries, smoked fish, salads." },
      { id: 3, name: "n/naka", cuisine: "Japanese", category: "Japanese", x: 130, y: 378, address: "3455 Overland Ave", neighborhood: "Palms", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop&auto=format", note: "The most extraordinary kaiseki outside Japan. Book months in advance." },
      { id: 4, name: "Osteria Mozza", cuisine: "Italian", category: "Italian", x: 198, y: 168, address: "6602 Melrose Ave", neighborhood: "Hollywood", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format", note: "Nancy Silverton's flagship. The mozzarella bar is a must. Pasta is perfection." },
      { id: 5, name: "Bavel", cuisine: "Mediterranean", category: "Mediterranean", x: 308, y: 278, address: "500 Mateo St", neighborhood: "DTLA", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&auto=format", note: "Middle Eastern-inspired, extraordinary execution. The hummus is life-changing." },
      { id: 6, name: "Kismet", cuisine: "Mediterranean", category: "Mediterranean", x: 130, y: 205, address: "4648 Hollywood Blvd", neighborhood: "Los Feliz", price: "$$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&auto=format", note: "Vegetable-forward Mediterranean. The grain bowl and cheese-stuffed peppers are standouts." },
      { id: 7, name: "Petit Trois", cuisine: "French", category: "French", x: 175, y: 198, address: "718 N Highland Ave", neighborhood: "Hollywood", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=300&h=200&fit=crop&auto=format", note: "No reservations, counter seats only. The omelette aux fines herbes is perfect." },
      { id: 8, name: "Gjelina", cuisine: "Californian", category: "Californian", x: 46, y: 325, address: "1429 Abbot Kinney", neighborhood: "Venice", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "Abbot Kinney's finest. The flatbreads, charred vegetables, and pasta are all brilliant." },
      { id: 9, name: "Majordomo", cuisine: "Korean", category: "Korean", x: 290, y: 325, address: "1725 Naud St", neighborhood: "Chinatown", price: "$$$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop&auto=format", note: "David Chang's LA restaurant. The large-format dishes for the table are stunning." },
      { id: 10, name: "Guerrilla Tacos", cuisine: "Mexican", category: "Mexican", x: 310, y: 355, address: "2000 E 7th St", neighborhood: "DTLA", price: "$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop&auto=format", note: "Chef-driven tacos using farmers market produce. Always different, always brilliant." },
    ],
  },
  {
    id: "chicago", name: "Chicago", short: "CHI", emoji: "🏙", waterLabel: "Lake Michigan",
    park1Name: "LINCOLN PARK", park2Name: "UNION PARK",
    hStreets: [
      { pos: 50, label: "Division St" }, { pos: 100, label: "Chicago Ave" }, { pos: 150, label: "Superior St" },
      { pos: 200, label: "Grand Ave" }, { pos: 250, label: "Lake St" }, { pos: 300, label: "Madison St" },
      { pos: 350, label: "Adams St" }, { pos: 400, label: "Harrison St" }, { pos: 450, label: "Roosevelt Rd" },
    ],
    vStreets: [
      { pos: 48, label: "Milwaukee" }, { pos: 96, label: "Damen" }, { pos: 144, label: "Western" },
      { pos: 192, label: "Ashland" }, { pos: 240, label: "Halsted" }, { pos: 288, label: "Morgan" },
    ],
    neighborhoods: [
      { x: 30, y: 128, label: "Logan Square" }, { x: 90, y: 200, label: "Wicker Park" },
      { x: 175, y: 128, label: "River North" }, { x: 175, y: 280, label: "West Loop" },
      { x: 340, y: 200, label: "The Loop" }, { x: 120, y: 128, label: "Lincoln Park" },
    ],
    restaurants: [
      { id: 1, name: "Alinea", cuisine: "Californian", category: "Californian", x: 130, y: 155, address: "1723 N Halsted St", neighborhood: "Lincoln Park", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "One of the greatest dining experiences on earth. A performance and a meal." },
      { id: 2, name: "The Publican", cuisine: "American", category: "American", x: 80, y: 248, address: "837 W Fulton Market", neighborhood: "West Loop", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&auto=format", note: "Beer hall meets farm-to-table. The pork rinds and oysters are unmissable starters." },
      { id: 3, name: "Girl & The Goat", cuisine: "American", category: "American", x: 95, y: 265, address: "800 W Randolph St", neighborhood: "West Loop", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop&auto=format", note: "Stephanie Izard's flagship. Share everything. The sautéed greens are legendary." },
      { id: 4, name: "Smyth", cuisine: "Californian", category: "Californian", x: 130, y: 228, address: "177 N Ada St", neighborhood: "West Loop", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&auto=format", note: "Hyper-local tasting menu in a beautiful room. One of Chicago's true best." },
      { id: 5, name: "Lou Malnati's", cuisine: "Pizza", category: "Italian", x: 198, y: 148, address: "439 N Wells St", neighborhood: "River North", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop&auto=format", note: "The definitive Chicago deep dish. Sausage pizza, no question. Order it well done." },
      { id: 6, name: "Au Cheval", cuisine: "American", category: "American", x: 80, y: 265, address: "800 W Randolph St", neighborhood: "West Loop", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop&auto=format", note: "The best burger in Chicago, maybe the US. Single patty, always. Expect a wait." },
      { id: 7, name: "Oriole", cuisine: "Californian", category: "Californian", x: 95, y: 325, address: "661 W Walnut St", neighborhood: "West Loop", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "Hidden in a loading dock. Two Michelin stars, extraordinary tasting menu." },
      { id: 8, name: "Lula Cafe", cuisine: "Californian", category: "Californian", x: 80, y: 178, address: "2537 N Kedzie Blvd", neighborhood: "Logan Square", price: "$$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=300&h=200&fit=crop&auto=format", note: "Logan Square institution. Farm-to-table before it was a trend. Come for brunch." },
      { id: 9, name: "Monteverde", cuisine: "Italian", category: "Italian", x: 130, y: 248, address: "1020 W Madison St", neighborhood: "West Loop", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format", note: "Sarah Grueneberg's pasta is as good as it gets in the US. Don't skip the strozzapreti." },
      { id: 10, name: "Kasama", cuisine: "Filipino", category: "Californian", x: 198, y: 178, address: "1001 N Winchester Ave", neighborhood: "Wicker Park", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop&auto=format", note: "Filipino-inflected tasting menu that earned a Michelin star. Extraordinary." },
    ],
  },
  {
    id: "london", name: "London", short: "LON", emoji: "🇬🇧", waterLabel: "River Thames",
    park1Name: "VICTORIA PARK", park2Name: "HOXTON SQ",
    hStreets: [
      { pos: 50, label: "Old St" }, { pos: 100, label: "City Rd" }, { pos: 150, label: "Clerkenwell Rd" },
      { pos: 200, label: "Holborn" }, { pos: 250, label: "Strand" }, { pos: 300, label: "Embankment" },
      { pos: 350, label: "Borough Rd" }, { pos: 400, label: "Newington" }, { pos: 450, label: "Kennington Rd" },
    ],
    vStreets: [
      { pos: 48, label: "Kingsland Rd" }, { pos: 96, label: "Dalston" }, { pos: 144, label: "Mare St" },
      { pos: 192, label: "King's Cross" }, { pos: 240, label: "Chancery" }, { pos: 288, label: "Fleet St" },
    ],
    neighborhoods: [
      { x: 30, y: 128, label: "Shoreditch" }, { x: 90, y: 230, label: "Clerkenwell" },
      { x: 200, y: 128, label: "Holborn" }, { x: 270, y: 230, label: "City" },
      { x: 175, y: 360, label: "Borough Mkt" }, { x: 100, y: 128, label: "Hackney" },
    ],
    restaurants: [
      { id: 1, name: "St. JOHN", cuisine: "British", category: "American", x: 175, y: 148, address: "26 St John St", neighborhood: "Clerkenwell", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&auto=format", note: "The temple of British nose-to-tail cooking. Bone marrow and toast is the only way to start." },
      { id: 2, name: "Brat", cuisine: "Basque", category: "Mediterranean", x: 242, y: 178, address: "4 Redchurch St", neighborhood: "Shoreditch", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop&auto=format", note: "Wood-fired Basque cooking by Tomos Parry. The turbot over coals is extraordinary." },
      { id: 3, name: "Gymkhana", cuisine: "Indian", category: "Indian", x: 130, y: 178, address: "42 Albemarle St", neighborhood: "Mayfair", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop&auto=format", note: "The finest Indian food in London. The kid goat methi keema with salli is stunning." },
      { id: 4, name: "The Clove Club", cuisine: "Californian", category: "Californian", x: 242, y: 155, address: "380 Old St", neighborhood: "Shoreditch", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "One of London's greatest tasting menus. The buttermilk fried chicken with pine salt snack is iconic." },
      { id: 5, name: "Dishoom", cuisine: "Indian", category: "Indian", x: 95, y: 248, address: "12 Upper St Martin's Ln", neighborhood: "Covent Garden", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop&auto=format", note: "Bombay café culture done brilliantly. The bacon naan roll at breakfast is unbeatable." },
      { id: 6, name: "Padella", cuisine: "Italian", category: "Italian", x: 242, y: 305, address: "6 Southwark St", neighborhood: "Borough Market", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format", note: "Queue for the handmade pasta. The pici cacio e pepe and pappardelle with beef shin." },
      { id: 7, name: "The Ledbury", cuisine: "Californian", category: "Californian", x: 80, y: 205, address: "127 Ledbury Rd", neighborhood: "Notting Hill", price: "$$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format", note: "Two Michelin stars, stunning British tasting menu. Brett Graham is a genius." },
      { id: 8, name: "Smokestak", cuisine: "BBQ", category: "American", x: 265, y: 178, address: "35 Sclater St", neighborhood: "Shoreditch", price: "$$", rating: "★★★★½", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop&auto=format", note: "London's best BBQ. Brisket bun and the burnt ends are extraordinary." },
      { id: 9, name: "Kiln", cuisine: "Thai", category: "Thai", x: 175, y: 198, address: "58 Brewer St", neighborhood: "Soho", price: "$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&h=200&fit=crop&auto=format", note: "Northern Thai clay pot cooking. The baked glass noodles are outstanding." },
      { id: 10, name: "Barrafina", cuisine: "Spanish", category: "Mediterranean", x: 175, y: 228, address: "10 Adelaide St", neighborhood: "Covent Garden", price: "$$$", rating: "★★★★★", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop&auto=format", note: "The best tapas bar outside Spain. Counter seating only. The tortilla is perfect." },
    ],
  },
];

// ── Category / color config ──────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🌍" },
  { id: "Californian", label: "Californian", emoji: "🌿" },
  { id: "Italian", label: "Italian", emoji: "🍝" },
  { id: "Japanese", label: "Japanese", emoji: "🍜" },
  { id: "Mexican", label: "Mexican", emoji: "🌮" },
  { id: "Seafood", label: "Seafood", emoji: "🦪" },
  { id: "American", label: "American", emoji: "🔥" },
  { id: "Bakery", label: "Bakery", emoji: "🥐" },
  { id: "Mediterranean", label: "Med", emoji: "🫒" },
  { id: "Indian", label: "Indian", emoji: "🍛" },
  { id: "Korean", label: "Korean", emoji: "🥩" },
  { id: "Thai", label: "Thai", emoji: "🍲" },
  { id: "French", label: "French", emoji: "🥐" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Californian: "#6B7C52",
  Italian: "#C8614A",
  Japanese: "#7A6E8A",
  Mexican: "#D4823A",
  Seafood: "#4A8BA0",
  American: "#A85040",
  Bakery: "#A8793A",
  Mediterranean: "#7A8A6A",
  Indian: "#C89A3A",
  Korean: "#8A5A6A",
  Thai: "#7A8A4A",
  French: "#6A7A9A",
};

// ── Map constants ────────────────────────────────────────────────────────────

const MAP_W = 390;
const MAP_H = 490;
const MIN_W = MAP_W / 4;
const MAX_W = MAP_W;
const MIN_H = MAP_H / 4;
const MAX_H = MAP_H;

interface Vb { x: number; y: number; w: number; h: number; }

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const clampVb = (v: Vb): Vb => {
  const w = clamp(v.w, MIN_W, MAX_W);
  const h = clamp(v.h, MIN_H, MAX_H);
  return { w, h, x: clamp(v.x, 0, MAP_W - w), y: clamp(v.y, 0, MAP_H - h) };
};

// Start slightly zoomed in so panning is immediately possible
const makeDefaultVb = (): Vb => ({
  x: MAP_W * 0.18,
  y: MAP_H * 0.18,
  w: MAP_W * 0.64,
  h: MAP_H * 0.64,
});

// ── Component ────────────────────────────────────────────────────────────────

export default function CityMapScreen() {
  const [cityId, setCityId] = useState("sf");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePin, setActivePin] = useState<number | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Zoom / pan
  const [vb, setVb] = useState<Vb>(makeDefaultVb());
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const pinchRef = useRef({ active: false, dist: 0 });
  const didMoveRef = useRef(false);

  const city = CITIES.find(c => c.id === cityId) ?? CITIES[0];

  const switchCity = (id: string) => {
    setCityId(id);
    setShowCityPicker(false);
    setActivePin(null);
    setQuery("");
    setActiveCategory("all");
    setVb(makeDefaultVb());
  };

  const getRect = useCallback(() =>
    containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: MAP_W, height: MAP_H }
  , []);

  const zoomAt = useCallback((sx: number, sy: number, factor: number) => {
    const rect = getRect();
    setVb(prev => {
      const svgX = prev.x + ((sx - rect.left) / rect.width) * prev.w;
      const svgY = prev.y + ((sy - rect.top) / rect.height) * prev.h;
      const nw = clamp(prev.w * factor, MIN_W, MAX_W);
      const nh = clamp(prev.h * factor, MIN_H, MAX_H);
      return clampVb({
        w: nw, h: nh,
        x: svgX - ((sx - rect.left) / rect.width) * nw,
        y: svgY - ((sy - rect.top) / rect.height) * nh,
      });
    });
  }, [getRect]);

  const zoomIn  = useCallback(() => { const r = getRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 0.65); }, [zoomAt, getRect]);
  const zoomOut = useCallback(() => { const r = getRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / 0.65); }, [zoomAt, getRect]);
  const resetView = useCallback(() => setVb(makeDefaultVb()), []);

  // Non-passive wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY > 0 ? 1.1 : 0.9);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  // ── Pointer / touch handlers ──────────────────────────────────────────────

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button,input,a")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { active: true, x: e.clientX, y: e.clientY };
    didMoveRef.current = false;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = dragRef.current.x - e.clientX;
    const dy = dragRef.current.y - e.clientY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didMoveRef.current = true;
    const rect = getRect();
    setVb(prev => clampVb({
      ...prev,
      x: prev.x + (dx / rect.width) * prev.w,
      y: prev.y + (dy / rect.height) * prev.h,
    }));
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
    setIsDragging(false);
  };

  const getTouchDist = (t: React.TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("button,input,a")) return;
    if (e.touches.length === 2) {
      dragRef.current.active = false;
      setIsDragging(false);
      pinchRef.current = { active: true, dist: getTouchDist(e.touches) };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current.active) {
      didMoveRef.current = true;
      const nd = getTouchDist(e.touches);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      zoomAt(midX, midY, pinchRef.current.dist / nd);
      pinchRef.current.dist = nd;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchRef.current.active = false;
    }
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const zoomLevel = Math.round((MAX_W / vb.w) * 10) / 10;
  const isMaxZoom = vb.w <= MIN_W + 1;
  const isMinZoom = vb.w >= MAX_W - 1;

  const visibleRestaurants = useMemo(() =>
    city.restaurants.filter(r => {
      const matchCat = activeCategory === "all" || r.category === activeCategory;
      const matchQ = query === "" ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        r.neighborhood.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    }),
  [city, query, activeCategory]);

  const activeRestaurant = city.restaurants.find(r => r.id === activePin) ?? null;
  const showDropdown = (query.length > 0 || searchFocused) && !activePin;

  const handlePinClick = (id: number) => {
    if (didMoveRef.current) return;
    setActivePin(prev => prev === id ? null : id);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: "#EDE3CF" }}>

      {/* ── Map canvas ── */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none", userSelect: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <svg
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          width="100%" height="100%"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <rect width="390" height="490" fill="#EDE3CF" />

          {/* Water (right edge) */}
          <rect x="356" y="0" width="34" height="490" fill="#C0D5DF" />
          <rect x="348" y="0" width="12" height="490" fill="#CCDDE8" opacity="0.7" />
          <text x="362" y="250" textAnchor="middle" fontSize="6" fill="#8AAABB" fontFamily="Fraunces,Georgia,serif" fontStyle="italic" transform="rotate(90,362,250)">{city.waterLabel}</text>

          {/* Large park (top-left) */}
          <rect x="0" y="205" width="96" height="108" fill="#C4D9A0" />
          {[225,245,265,285].map(y => <line key={y} x1="0" y1={y} x2="96" y2={y} stroke="#B4CA90" strokeWidth="1"/>)}
          {[24,48,72].map(x => <line key={x} x1={x} y1="205" x2={x} y2="313" stroke="#B4CA90" strokeWidth="1"/>)}
          <text x="48" y="258" textAnchor="middle" fontSize="7" fill="#7A9B5A" fontFamily="Outfit,sans-serif" fontWeight="700" letterSpacing="0.3">{city.park1Name}</text>

          {/* Small park */}
          <rect x="96" y="155" width="48" height="45" fill="#C8D9A8" />
          <line x1="96" y1="172" x2="144" y2="172" stroke="#B4CA90" strokeWidth="0.8"/>
          <line x1="120" y1="155" x2="120" y2="200" stroke="#B4CA90" strokeWidth="0.8"/>
          <text x="120" y="181" textAnchor="middle" fontSize="6" fill="#7A9B5A" fontFamily="Outfit,sans-serif" fontWeight="600">{city.park2Name}</text>

          {/* Patricia's Green */}
          <rect x="192" y="155" width="42" height="30" fill="#C8D9A8" />

          {/* Horizontal streets */}
          {[50,100,150,200,250,300,350,400,450].map(y => (
            <rect key={y} x="0" y={y} width="390" height="7" fill="#FAF3E7"/>
          ))}

          {/* Vertical streets */}
          {[48,96,144,192,240,288,336].map(x => (
            <rect key={x} x={x} y="0" width="7" height="490" fill="#FAF3E7"/>
          ))}

          {/* Market-style diagonal */}
          <line x1="0" y1="280" x2="350" y2="130" stroke="#FAF3E7" strokeWidth="11"/>
          <line x1="0" y1="280" x2="350" y2="130" stroke="#F0E8DA" strokeWidth="1" strokeDasharray="4 4"/>

          {/* City blocks */}
          {[
            {y:2,h:48},{y:57,h:43},{y:107,h:43},{y:157,h:43},{y:207,h:43},
            {y:257,h:43},{y:307,h:43},{y:357,h:43},{y:407,h:43},{y:457,h:33},
          ].map(({y,h},ri) =>
            [0,55,103,151,199,247,295,343].map((x,ci) => {
              if (x===0 && y>=205 && y<=313) return null;
              if (x===96 && y>=155 && y<=200) return null;
              if (x===192 && y>=155 && y<=185) return null;
              const w = [48,41,41,41,41,41,41,13][ci];
              const fill = (ri+ci)%3===0 ? "#DDD0BB" : (ri+ci)%3===1 ? "#E5D9C5" : "#E0D4BC";
              return <rect key={`${ri}-${ci}`} x={x} y={y} width={w} height={h} fill={fill} rx="2"/>;
            })
          )}

          {/* Horizontal street labels */}
          {city.hStreets.map(s => (
            <text key={s.label} x="75" y={s.pos-1} textAnchor="middle" fontSize="5.5" fill="#B0A090" fontFamily="Outfit,sans-serif">{s.label}</text>
          ))}

          {/* Vertical street labels */}
          {city.vStreets.map(s => (
            <text key={s.label} x={s.pos+3} y="40" textAnchor="start" fontSize="5.5" fill="#B0A090" fontFamily="Outfit,sans-serif" transform={`rotate(-90,${s.pos+3},40)`}>{s.label}</text>
          ))}

          {/* Neighborhood labels */}
          {city.neighborhoods.map(n => (
            <text key={n.label} x={n.x} y={n.y} textAnchor="middle" fontSize="7.5" fill="#B8A888" fontFamily="Fraunces,Georgia,serif" fontStyle="italic">{n.label}</text>
          ))}

          {/* Restaurant pins */}
          {visibleRestaurants.map(r => {
            const color = CATEGORY_COLORS[r.category] ?? "#C8614A";
            const isActive = activePin === r.id;
            return (
              <g key={r.id} onClick={() => handlePinClick(r.id)} style={{ cursor: "pointer" }}>
                <circle cx={r.x+2} cy={r.y+3} r="11" fill="rgba(44,24,16,0.18)"/>
                {isActive && <circle cx={r.x} cy={r.y} r="17" fill="none" stroke={color} strokeWidth="2.5" opacity="0.45"/>}
                <circle cx={r.x} cy={r.y} r="11" fill={isActive ? color : "#FFFCF8"} stroke={color} strokeWidth="2.5"/>
                {!isActive && <circle cx={r.x} cy={r.y} r="3.5" fill={color}/>}
                {isActive && (
                  <text x={r.x} y={r.y+4} textAnchor="middle" fontSize="9" fill="white" fontFamily="Outfit,sans-serif" fontWeight="700">✓</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Floating header (search + city picker + chips) ── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 pt-12 px-4 pb-3"
        style={{ background: "linear-gradient(to bottom, rgba(250,246,240,0.97) 0%, rgba(250,246,240,0.88) 72%, transparent 100%)" }}
      >
        {/* Row 1: City picker */}
        <div className="flex items-center justify-between mb-2.5">
          <button
            onClick={() => setShowCityPicker(v => !v)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all active:scale-95"
            style={{
              background: showCityPicker ? "#2C1810" : "#FFFCF8",
              color: showCityPicker ? "#FFFCF8" : "#2C1810",
              border: "1.5px solid #DDD0C0",
              boxShadow: "0 2px 8px rgba(44,24,16,0.08)",
            }}
          >
            <span className="text-base">{city.emoji}</span>
            <span>{city.name}</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={showCityPicker ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"} />
            </svg>
          </button>

          {!isMinZoom && (
            <button
              onClick={resetView}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
              style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0", color: "#8B6E5A", boxShadow: "0 1px 4px rgba(44,24,16,0.08)" }}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              Reset
            </button>
          )}
        </div>

        {/* City picker dropdown */}
        {showCityPicker && (
          <div
            className="mb-3 rounded-2xl overflow-hidden"
            style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0", boxShadow: "0 4px 20px rgba(44,24,16,0.12)" }}
          >
            {CITIES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => switchCity(c.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                style={{
                  background: c.id === cityId ? "#F2DDD8" : "transparent",
                  borderBottom: i < CITIES.length - 1 ? "1px solid #F0E8DC" : "none",
                }}
              >
                <span className="text-xl">{c.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>{c.name}</p>
                  <p className="text-xs" style={{ color: "#8B6E5A" }}>{c.restaurants.length} plateful spots</p>
                </div>
                {c.id === cityId && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="#C8614A" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Search bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-3"
          style={{
            background: "#FFFCF8",
            border: `2px solid ${searchFocused ? "#C8614A" : "#DDD0C0"}`,
            boxShadow: "0 2px 12px rgba(44,24,16,0.08)",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="#8B6E5A" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            placeholder={`Search in ${city.name}...`}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#2C1810" }}
          />
          {query && (
            <button onClick={() => { setQuery(""); setActivePin(null); }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#8B6E5A">
                <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
              </svg>
            </button>
          )}
          {(query || activeCategory !== "all") && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: "#F2DDD8", color: "#C8614A" }}>
              {visibleRestaurants.length}
            </span>
          )}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setActivePin(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0"
              style={{
                background: activeCategory === cat.id ? "#2C1810" : "rgba(255,252,248,0.95)",
                color: activeCategory === cat.id ? "#FFFCF8" : "#5C3D2E",
                border: "1.5px solid",
                borderColor: activeCategory === cat.id ? "#2C1810" : "#DDD0C0",
                boxShadow: "0 1px 4px rgba(44,24,16,0.08)",
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search results dropdown ── */}
      {showDropdown && visibleRestaurants.length > 0 && (
        <div
          className="absolute left-4 right-4 z-30 rounded-2xl overflow-hidden scrollbar-hide"
          style={{
            top: "calc(48px + 52px + 16px + 56px + 52px)",
            background: "#FFFCF8",
            border: "1.5px solid #DDD0C0",
            boxShadow: "0 8px 32px rgba(44,24,16,0.15)",
            maxHeight: "210px",
            overflowY: "auto",
          }}
        >
          {visibleRestaurants.map((r, i) => {
            const color = CATEGORY_COLORS[r.category] ?? "#C8614A";
            return (
              <button
                key={r.id}
                onClick={() => { setActivePin(r.id); setSearchFocused(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ borderBottom: i < visibleRestaurants.length - 1 ? "1px solid #F0E8DC" : "none" }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: color + "22" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: color }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#2C1810" }}>{r.name}</p>
                  <p className="text-xs truncate" style={{ color: "#8B6E5A" }}>{r.cuisine} · {r.neighborhood}</p>
                </div>
                <p className="text-xs shrink-0" style={{ color: "#8B6E5A" }}>{r.price}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Zoom controls ── */}
      <div
        className="absolute z-20 flex flex-col gap-1"
        style={{ right: "16px", bottom: activeRestaurant ? "225px" : "24px", transition: "bottom 0.25s ease" }}
      >
        <button
          onClick={zoomIn}
          disabled={isMaxZoom}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-light shadow-md transition-all active:scale-95 disabled:opacity-40"
          style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0", color: "#2C1810" }}
        >+</button>

        <div className="w-10 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,252,248,0.88)", border: "1px solid #DDD0C0" }}>
          <span className="text-[10px] font-bold" style={{ color: "#8B6E5A" }}>
            {zoomLevel.toFixed(1)}×
          </span>
        </div>

        <button
          onClick={zoomOut}
          disabled={isMinZoom}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-light shadow-md transition-all active:scale-95 disabled:opacity-40"
          style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0", color: "#2C1810" }}
        >−</button>
      </div>

      {/* ── Pin detail card ── */}
      {activeRestaurant && (
        <div
          className="absolute bottom-0 left-0 right-0 z-20 rounded-t-3xl overflow-hidden"
          style={{ background: "#FFFCF8", boxShadow: "0 -4px 32px rgba(44,24,16,0.18)" }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-8 h-1 rounded-full" style={{ background: "#DDD0C0" }}/>
          </div>
          <div className="flex gap-4 px-5 pb-4 pt-2">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0" style={{ background: "#E8DDD0" }}>
              <img src={activeRestaurant.image} alt={activeRestaurant.name} className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold leading-tight" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
                    {activeRestaurant.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "#8B6E5A" }}>
                    {activeRestaurant.cuisine} · {activeRestaurant.neighborhood}
                  </p>
                </div>
                <button onClick={() => setActivePin(null)} className="shrink-0 p-1.5 rounded-full" style={{ background: "#F0E8DC" }}>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#8B6E5A" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold" style={{ color: "#C8614A" }}>{activeRestaurant.rating}</span>
                <span className="text-xs font-bold" style={{ color: "#8B6E5A" }}>{activeRestaurant.price}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: (CATEGORY_COLORS[activeRestaurant.category] ?? "#C8614A") + "22", color: CATEGORY_COLORS[activeRestaurant.category] ?? "#C8614A" }}>
                  {activeRestaurant.category}
                </span>
              </div>
              <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#5C3D2E" }}>{activeRestaurant.note}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mx-5 mb-5 px-3 py-2.5 rounded-xl" style={{ background: "#FAF6F0", border: "1px solid #DDD0C0" }}>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#C8614A" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
            </svg>
            <p className="text-xs font-medium flex-1" style={{ color: "#5C3D2E" }}>{activeRestaurant.address}</p>
            <button className="text-xs font-bold" style={{ color: "#C8614A" }}>Directions →</button>
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {visibleRestaurants.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="px-6 py-4 rounded-2xl text-center pointer-events-auto" style={{ background: "rgba(255,252,248,0.95)", border: "1.5px solid #DDD0C0" }}>
            <p className="text-2xl mb-1">🍽</p>
            <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>No spots found</p>
            <p className="text-xs mt-1" style={{ color: "#8B6E5A" }}>Try a different search or category</p>
            <button onClick={() => { setQuery(""); setActiveCategory("all"); }} className="mt-2 text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "#F2DDD8", color: "#C8614A" }}>
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
