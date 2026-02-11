const STORAGE_KEY = 'background-music-preferences';
const OPT_IN_KEY = 'background-music-opt-in';

export interface MusicPreferences {
  muted: boolean;
  volume: number;
}

const DEFAULT_PREFERENCES: MusicPreferences = {
  muted: false,
  volume: 0.3, // Conservative default volume (30%)
};

export function loadMusicPreferences(): MusicPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PREFERENCES;

    const parsed = JSON.parse(stored);
    
    // Validate and sanitize
    return {
      muted: typeof parsed.muted === 'boolean' ? parsed.muted : DEFAULT_PREFERENCES.muted,
      volume: typeof parsed.volume === 'number' && parsed.volume >= 0 && parsed.volume <= 1
        ? parsed.volume
        : DEFAULT_PREFERENCES.volume,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveMusicPreferences(preferences: MusicPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function hasOptedInToMusic(): boolean {
  try {
    const stored = localStorage.getItem(OPT_IN_KEY);
    return stored === 'true';
  } catch {
    return false;
  }
}

export function saveOptInToMusic(): void {
  try {
    localStorage.setItem(OPT_IN_KEY, 'true');
  } catch {
    // Silently fail if localStorage is unavailable
  }
}
