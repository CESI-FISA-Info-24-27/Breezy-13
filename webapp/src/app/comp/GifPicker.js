import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";

const gf = new GiphyFetch("8eiWtqYUvKoVmvw2ANUsAmF48I8tltjy");

export default function GifPicker({ onSelect, onClose }) {
  const [search, setSearch] = useState("");
  const fetchGifs = React.useCallback(
    (offset) =>
      search
        ? gf.search(search, { offset, limit: 9 })
        : gf.trending({ offset, limit: 9 }),
    [search]
  );
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#23272a] rounded-2xl shadow-2xl p-4 max-w-lg w-full relative">
        <div className="flex items-center mb-4 relative">
          <input
            className="flex-1 px-3 py-2 rounded-lg bg-[#2c2f33] text-white placeholder-gray-400 focus:outline-none"
            placeholder="Rechercher un GIF..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="ml-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-folly/20 transition"
            onClick={onClose}
            aria-label="Fermer"
            style={{ minWidth: 32, minHeight: 32 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 350 }}>
          <Grid
            key={search}
            width={400}
            columns={3}
            fetchGifs={fetchGifs}
            onGifClick={gif => {
              onSelect(gif.images.fixed_height.url);
              onClose();
            }}
            noLink
            hideAttribution
          />
        </div>
      </div>
    </div>
  );
}