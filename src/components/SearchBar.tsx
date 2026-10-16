import React, { useState, useEffect, useRef } from 'react';
import { searchIndex, SearchMatch } from '../utils/searchIndex';
import { Screen, SearchIndexedItem } from '../types';
import { useCart } from '../context/CartContext';

interface SearchBarProps {
  onNavigate: (screen: Screen) => void;
  variant?: 'header' | 'hero' | 'compact';
}

export const SearchBar: React.FC<SearchBarProps> = ({ onNavigate, variant = 'header' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchMatch[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'menu' | 'roast' | 'origin' | 'gathering'>('all');
  const [searchDurationMs, setSearchDurationMs] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  // Global hotkey: '/' or 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform indexed search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearchDurationMs(null);
      setSelectedIndex(-1);
      return;
    }

    const t0 = performance.now();
    const matched = searchIndex.search(query, activeFilter);
    const t1 = performance.now();

    setResults(matched);
    setSearchDurationMs(Number((t1 - t0).toFixed(2)));
    setSelectedIndex(-1);
  }, [query, activeFilter]);

  const handleSelectResult = (item: SearchIndexedItem) => {
    setIsOpen(false);
    setQuery('');
    onNavigate(item.targetScreen);
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelectResult(results[selectedIndex].item);
      } else if (results[0]) {
        handleSelectResult(results[0].item);
      }
    }
  };

  const suggestions = searchIndex.getQuickSuggestions();

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-base text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInInput}
          placeholder="Search blends, origins, tasting notes..."
          className={`w-full bg-surface-container-lowest text-xs rounded-lg py-2 pl-8 pr-16 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-[0_1px_4px_rgba(58,48,42,0.03)] border border-outline-variant/50 transition-all ${
            isOpen ? 'ring-1 ring-primary' : ''
          }`}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
          {query ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setQuery('');
                inputRef.current?.focus();
              }}
              className="pointer-events-auto text-on-surface-variant hover:text-on-surface text-xs"
              aria-label="Clear query"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant/70 border border-outline-variant/40">
              /
            </span>
          )}
        </div>
      </div>

      {/* Dropdown Results Box */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-2xl border border-outline-variant/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Filter Bar & Performance Telemetry */}
          <div className="px-3 py-2 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'menu', label: 'Atelier Menu' },
                  { id: 'roast', label: 'Roasts' },
                  { id: 'origin', label: 'Reserve Drops' },
                  { id: 'gathering', label: 'Experiences' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    activeFilter === tab.id
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {searchDurationMs !== null && (
              <span className="text-[9px] font-mono text-on-surface-variant/80 shrink-0">
                Indexed: {searchDurationMs}ms
              </span>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto no-scrollbar p-2 space-y-1">
            {query.trim() === '' ? (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant px-2 py-1 block">
                  Curated Selections
                </span>
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-8 h-8 rounded-md object-cover shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-on-surface-variant truncate block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {item.price !== undefined && (
                      <span className="text-xs font-headline font-bold text-on-surface">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="flex items-center justify-between px-2 py-1 text-[10px] text-on-surface-variant">
                  <span>{results.length} Indexed {results.length === 1 ? 'Match' : 'Matches'}</span>
                  <span className="font-mono">Sorted by Relevance</span>
                </div>
                {results.map((match, idx) => {
                  const isSelected = selectedIndex === idx;
                  const item = match.item;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectResult(item)}
                      className={`flex items-start justify-between p-2.5 rounded-lg cursor-pointer transition-all ${
                        isSelected ? 'bg-surface-container-high' : 'hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 rounded-md object-cover shrink-0 mt-0.5"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-on-surface leading-tight">
                              {item.title}
                            </p>
                            <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.2 rounded bg-surface-container-highest text-primary">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                            {match.snippet}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.keywords.slice(0, 3).map((kw, i) => (
                              <span
                                key={i}
                                className="text-[9px] bg-surface-container text-on-surface-variant px-1.5 py-0.2 rounded"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                        {item.price !== undefined && (
                          <span className="text-xs font-headline font-bold text-on-surface">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                        {item.price !== undefined && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item.title, item.price!, 'Indexed Search Dispatch');
                            }}
                            className="px-2 py-1 rounded bg-primary text-on-primary hover:bg-primary-container text-[10px] font-semibold transition-colors flex items-center gap-0.5"
                          >
                            <span>Add</span>
                            <span className="material-symbols-outlined text-xs">add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl text-outline mb-2">search_off</span>
                <p className="text-xs font-semibold text-on-surface">No indexed roasts or blends found</p>
                <p className="text-[11px] mt-1 text-on-surface-variant/80">
                  Try searching for &quot;Bourbon&quot;, &quot;Geisha&quot;, &quot;Flat White&quot;, &quot;Truffle&quot;, or &quot;Pour-Over&quot;.
                </p>
              </div>
            )}
          </div>

          {/* Quick Footer hint */}
          <div className="px-3 py-1.5 bg-surface-container-low text-[10px] text-on-surface-variant/70 border-t border-outline-variant/30 flex justify-between items-center">
            <span>Use ↑↓ to navigate • ↵ to open</span>
            <span>ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
};
