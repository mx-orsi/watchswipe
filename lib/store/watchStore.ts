import { create } from "zustand";
import { SavedWatch, Watch } from "@/types/watch";
import { seedWatches } from "@/lib/data/seedWatches";

interface WatchState {
  watches: Watch[];
  currentIndex: number;
  saved: SavedWatch[];
  likedIds: Set<string>;
  totalSwipes: number;
  totalLikes: number;
  totalPasses: number;
  totalSaves: number;
  getCurrent: () => Watch | null;
  hydrateSaved: (items: SavedWatch[]) => void;
  saveWatch: (
    watchId: string,
    variantId: string,
    userId?: string
  ) => SavedWatch | null;
  removeSaved: (savedId: string) => void;
  restoreSaved: (item: SavedWatch) => void;
  resetIndex: () => void;
  clearSavedLocal: () => void;
  seedRandomSaved: () => void;
  swipePass: () => void;
  swipeLove: () => void;
  reset: () => void;
}

const STORAGE_KEY = "watchswipe_watch_state_v1";

function loadInitialState() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WatchState> & {
      likedIds?: string[];
    };
    return {
      currentIndex: parsed.currentIndex ?? 0,
      saved: parsed.saved ?? [],
      likedIds: new Set<string>(parsed.likedIds ?? []),
      totalSwipes: parsed.totalSwipes ?? 0,
      totalLikes: parsed.totalLikes ?? 0,
      totalPasses: parsed.totalPasses ?? 0,
      totalSaves: parsed.totalSaves ?? 0
    };
  } catch {
    return null;
  }
}

function persistState(state: WatchState) {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      currentIndex: state.currentIndex,
      saved: state.saved,
      likedIds: Array.from(state.likedIds),
      totalSwipes: state.totalSwipes,
      totalLikes: state.totalLikes,
      totalPasses: state.totalPasses,
      totalSaves: state.totalSaves
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

const initialPersisted = loadInitialState();

export const useWatchStore = create<WatchState>((set, get) => ({
  watches: seedWatches,
  currentIndex: initialPersisted?.currentIndex ?? 0,
  saved: initialPersisted?.saved ?? [],
  likedIds: initialPersisted?.likedIds ?? new Set<string>(),
  totalSwipes: initialPersisted?.totalSwipes ?? 0,
  totalLikes: initialPersisted?.totalLikes ?? 0,
  totalPasses: initialPersisted?.totalPasses ?? 0,
  totalSaves: initialPersisted?.totalSaves ?? 0,

  getCurrent: () => {
    const { watches, currentIndex } = get();
    if (currentIndex < 0 || currentIndex >= watches.length) return null;
    return watches[currentIndex];
  },

  hydrateSaved: (items: SavedWatch[]) =>
    set((state) => {
      const next = {
        ...state,
        saved: items
      };
      persistState(next);
      return next;
    }),

  saveWatch: (watchId, variantId, userId) => {
    let created: SavedWatch | null = null;

    set((state) => {
      const existing = state.saved.find(
        (s) => s.watch_id === watchId && s.watch_variant_id === variantId
      );

      if (existing) {
        created = existing;
        return {
          ...state,
          totalSaves: state.totalSaves
        };
      }

      const saved: SavedWatch = {
        id: `${watchId}-${variantId}-${Date.now()}`,
        user_id: userId,
        watch_id: watchId,
        watch_variant_id: variantId,
        created_at: new Date().toISOString()
      };

      created = saved;
      const next = {
        ...state,
        saved: [...state.saved, saved],
        totalSaves: state.totalSaves + 1
      };
      persistState(next);
      return next;
    });

    return created;
  },

  removeSaved: (savedId) =>
    set((state) => {
      const next = {
        ...state,
        saved: state.saved.filter((s) => s.id !== savedId)
      };
      persistState(next);
      return next;
    }),

  restoreSaved: (item) =>
    set((state) => {
      const exists = state.saved.some((s) => s.id === item.id);
      if (exists) return state;
      const next = { ...state, saved: [item, ...state.saved] };
      persistState(next);
      return next;
    }),

  resetIndex: () =>
    set((state) => {
      const next = {
        ...state,
        currentIndex: 0
      };
      persistState(next);
      return next;
    }),

  clearSavedLocal: () =>
    set((state) => {
      const next = {
        ...state,
        saved: []
      };
      persistState(next);
      return next;
    }),

  seedRandomSaved: () =>
    set((state) => {
      const variants: { watch: Watch; variantId: string }[] = [];
      state.watches.forEach((watch) => {
        watch.variants.forEach((variant) => {
          variants.push({ watch, variantId: variant.id });
        });
      });
      if (variants.length === 0) return state;

      const count = Math.min(10, variants.length);
      const picked: SavedWatch[] = [];
      const used = new Set<string>();

      while (picked.length < count) {
        const candidate =
          variants[Math.floor(Math.random() * variants.length)];
        const key = `${candidate.watch.id}-${candidate.variantId}`;
        if (used.has(key)) continue;
        used.add(key);
        picked.push({
          id: `dev-${key}-${Date.now()}-${picked.length}`,
          watch_id: candidate.watch.id,
          watch_variant_id: candidate.variantId,
          created_at: new Date().toISOString()
        });
      }

      const next = {
        ...state,
        saved: picked
      };
      persistState(next);
      return next;
    }),

  swipePass: () =>
    set((state) => {
      const next = {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, state.watches.length),
        totalSwipes: state.totalSwipes + 1,
        totalPasses: state.totalPasses + 1
      };
      persistState(next);
      return next;
    }),

  swipeLove: () =>
    set((state) => {
      const current = state.watches[state.currentIndex];
      if (!current) return state;

      const likedIds = new Set(state.likedIds);
      likedIds.add(current.id);

      const next = {
        ...state,
        likedIds,
        currentIndex: Math.min(state.currentIndex + 1, state.watches.length),
        totalSwipes: state.totalSwipes + 1,
        totalLikes: state.totalLikes + 1
      };
      persistState(next);
      return next;
    }),

  reset: () =>
    set(() => {
      const next: WatchState = {
        watches: seedWatches,
        currentIndex: 0,
        saved: [],
        likedIds: new Set<string>(),
        totalSwipes: 0,
        totalLikes: 0,
        totalPasses: 0,
        totalSaves: 0,
        getCurrent: get().getCurrent,
        hydrateSaved: get().hydrateSaved,
        saveWatch: get().saveWatch,
        removeSaved: get().removeSaved,
        restoreSaved: get().restoreSaved,
        resetIndex: get().resetIndex,
        clearSavedLocal: get().clearSavedLocal,
        seedRandomSaved: get().seedRandomSaved,
        swipePass: get().swipePass,
        swipeLove: get().swipeLove,
        reset: get().reset
      };
      persistState(next);
      return next;
    })
}));

