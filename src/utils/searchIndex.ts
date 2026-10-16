import { SearchIndexedItem, Screen } from '../types';
import { MENU_ITEMS, DAILY_ROASTS, ATELIER_GATHERINGS, SOCIETY_RESERVE_DROPS } from '../data/coffeeData';

export interface SearchMatch {
  item: SearchIndexedItem;
  score: number;
  matchedFields: string[];
  snippet: string;
}

class InvertedSearchIndex {
  private items: Map<string, SearchIndexedItem> = new Map();
  // Map of normalized token -> Map<itemId, score weight>
  private index: Map<string, Map<string, number>> = new Map();
  private isBuilt = false;

  constructor() {
    this.buildIndex();
  }

  private tokenize(text: string): string[] {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((term) => term.length >= 2);
  }

  private addPosting(token: string, itemId: string, weight: number) {
    if (!this.index.has(token)) {
      this.index.set(token, new Map());
    }
    const postings = this.index.get(token)!;
    const current = postings.get(itemId) || 0;
    postings.set(itemId, current + weight);
  }

  public buildIndex() {
    this.items.clear();
    this.index.clear();

    const allIndexItems: SearchIndexedItem[] = [];

    // 1. Index Menu Items
    MENU_ITEMS.forEach((m) => {
      allIndexItems.push({
        id: `menu-${m.id}`,
        title: m.name,
        category: m.category === 'espresso' ? 'Espresso & Ristretto' :
                  m.category === 'slow-drip' ? 'Slow Drip & Filter' :
                  m.category === 'cold-brew' ? 'Cold Brew & Nitro' :
                  m.category === 'tea' ? 'Specialty Tea & Infusions' : 'Atelier Pastries & Savory',
        type: 'menu',
        keywords: [...m.notes, m.badge || '', m.origin || '', m.specs],
        description: m.description,
        price: m.price,
        image: m.image,
        targetScreen: 'artisanal-menu',
        actionPayload: m
      });
    });

    // 2. Index Daily Roasts
    DAILY_ROASTS.forEach((r) => {
      allIndexItems.push({
        id: `roast-${r.id}`,
        title: r.name,
        category: 'Master Roaster Selection',
        type: 'roast',
        keywords: [...r.notes, r.type, `Strength: ${r.strength}/5`],
        description: r.description,
        price: r.price,
        image: r.image,
        targetScreen: 'home',
        actionPayload: r
      });
    });

    // 3. Index Reserve Drops
    SOCIETY_RESERVE_DROPS.forEach((drop) => {
      allIndexItems.push({
        id: `drop-${drop.id}`,
        title: drop.name,
        category: 'Society Reserve Drops',
        type: 'origin',
        keywords: ['Bourbon Cask', 'Charred Oak', 'Yemen', 'Reserve Lot', drop.elevation],
        description: drop.description,
        price: drop.price,
        image: drop.image,
        targetScreen: 'member-lounge',
        actionPayload: drop
      });
    });

    // 4. Index Atelier Gatherings
    ATELIER_GATHERINGS.forEach((g) => {
      allIndexItems.push({
        id: `gathering-${g.id}`,
        title: g.title,
        category: 'Atelier Gatherings',
        type: 'gathering',
        keywords: [g.type, g.location, g.dateStr, 'Arthur Vance', 'Tasting Salon'],
        description: `${g.type} in ${g.location} on ${g.dateStr} at ${g.timeStr}`,
        targetScreen: 'member-lounge',
        actionPayload: g
      });
    });

    // Populate Inverted Index
    allIndexItems.forEach((item) => {
      this.items.set(item.id, item);

      // Title tokens (weight: 12)
      this.tokenize(item.title).forEach((token) => {
        this.addPosting(token, item.id, 12);
        // Prefix matching n-grams for fast auto-complete
        for (let len = 2; len < token.length; len++) {
          this.addPosting(token.substring(0, len), item.id, 4);
        }
      });

      // Keywords / Tasting notes tokens (weight: 8)
      item.keywords.forEach((kw) => {
        this.tokenize(kw).forEach((token) => {
          this.addPosting(token, item.id, 8);
          for (let len = 2; len < token.length; len++) {
            this.addPosting(token.substring(0, len), item.id, 2.5);
          }
        });
      });

      // Category tokens (weight: 6)
      this.tokenize(item.category).forEach((token) => {
        this.addPosting(token, item.id, 6);
      });

      // Description tokens (weight: 2)
      this.tokenize(item.description).forEach((token) => {
        this.addPosting(token, item.id, 2);
      });
    });

    this.isBuilt = true;
  }

  public search(query: string, categoryFilter?: string): SearchMatch[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const queryTokens = this.tokenize(trimmed);
    if (queryTokens.length === 0) return [];

    const itemScores = new Map<string, { score: number; matchedTokens: Set<string> }>();

    queryTokens.forEach((token) => {
      const postings = this.index.get(token);
      if (postings) {
        postings.forEach((weight, itemId) => {
          const current = itemScores.get(itemId) || { score: 0, matchedTokens: new Set() };
          current.score += weight;
          current.matchedTokens.add(token);
          itemScores.set(itemId, current);
        });
      }
    });

    const results: SearchMatch[] = [];

    itemScores.forEach((data, itemId) => {
      const item = this.items.get(itemId);
      if (!item) return;

      if (categoryFilter && categoryFilter !== 'all') {
        if (item.type !== categoryFilter) return;
      }

      // Exact substring boost
      let finalScore = data.score;
      if (item.title.toLowerCase().includes(trimmed)) {
        finalScore += 20;
      }
      if (item.keywords.some((k) => k.toLowerCase().includes(trimmed))) {
        finalScore += 12;
      }

      // Highlight snippet extraction
      let snippet = item.description;
      const lowerDesc = item.description.toLowerCase();
      const matchIdx = lowerDesc.indexOf(trimmed);
      if (matchIdx !== -1) {
        const start = Math.max(0, matchIdx - 20);
        const end = Math.min(item.description.length, matchIdx + trimmed.length + 45);
        snippet = (start > 0 ? '...' : '') + item.description.slice(start, end) + (end < item.description.length ? '...' : '');
      }

      results.push({
        item,
        score: finalScore,
        matchedFields: Array.from(data.matchedTokens),
        snippet
      });
    });

    return results.sort((a, b) => b.score - a.score);
  }

  public getQuickSuggestions(): SearchIndexedItem[] {
    // Top curated items to show before typing
    return [
      this.items.get('menu-yemen-mokha')!,
      this.items.get('roast-sovereign-espresso')!,
      this.items.get('menu-kyoto-cold-drip')!,
      this.items.get('menu-panama-geisha-chemex')!
    ].filter(Boolean);
  }
}

export const searchIndex = new InvertedSearchIndex();
