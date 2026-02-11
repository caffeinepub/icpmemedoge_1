import { useEffect, useRef, useState } from 'react';
import { loadMusicPreferences, saveMusicPreferences, hasOptedInToMusic, saveOptInToMusic, type MusicPreferences } from '../utils/backgroundMusicStorage';

interface UseBackgroundMusicReturn {
  isPlaying: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  volume: number;
  error: string | null;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  userInitiatedPlay: () => Promise<void>;
}

/**
 * Background music hook for IcpMemeDoge presale site.
 * 
 * Current track: "Binary Finary 1999" (1999 trance classic)
 * Audio path: /assets/audio/background-dance.mp3
 * 
 * Note: The audio path must remain exactly "/assets/audio/background-dance.mp3"
 * to maintain compatibility with existing playback flow and user preferences.
 * Track updates are handled by replacing the audio file at this static path.
 */
export function useBackgroundMusic(): UseBackgroundMusicReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [error, setError] = useState<string | null>(null);
  const unblockListenersAttached = useRef(false);
  const unblockCleanupRef = useRef<(() => void) | null>(null);
  const hasOptedIn = useRef(hasOptedInToMusic());

  // Initialize or get audio element
  const getOrCreateAudio = (): HTMLAudioElement => {
    if (audioRef.current) return audioRef.current;

    // Audio path remains constant; track content is updated at build time
    const audio = new Audio('/assets/audio/background-dance.mp3');
    audio.loop = true;
    audio.preload = 'auto';

    // Load preferences
    const prefs = loadMusicPreferences();
    audio.volume = prefs.volume;
    audio.muted = prefs.muted;
    setVolumeState(prefs.volume);
    setIsMuted(prefs.muted);

    // Attach event listeners to sync isPlaying state
    audio.addEventListener('playing', () => {
      setIsPlaying(true);
      setError(null);
    });
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('error', () => {
      setIsPlaying(false);
      setError('Music could not be loaded. Please try again.');
    });

    audioRef.current = audio;
    return audio;
  };

  // Initialize audio element (singleton)
  useEffect(() => {
    const audio = getOrCreateAudio();

    // Attach listeners to unblock on first user interaction (only if opted in)
    const attachUnblockListeners = () => {
      if (unblockListenersAttached.current || !hasOptedIn.current) return;
      unblockListenersAttached.current = true;

      const tryPlayOnInteraction = async () => {
        if (!audioRef.current) return;
        
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsBlocked(false);
          setError(null);
          
          // Remove listeners after successful play
          removeUnblockListeners();
        } catch (error) {
          // Still blocked, keep listeners attached
        }
      };

      const events = ['click', 'touchstart', 'keydown'];
      events.forEach(event => {
        document.addEventListener(event, tryPlayOnInteraction, { once: true, passive: true });
      });

      // Store cleanup function in ref
      unblockCleanupRef.current = () => {
        events.forEach(event => {
          document.removeEventListener(event, tryPlayOnInteraction);
        });
      };
    };

    const removeUnblockListeners = () => {
      if (unblockCleanupRef.current) {
        unblockCleanupRef.current();
        unblockCleanupRef.current = null;
      }
      unblockListenersAttached.current = false;
    };

    // Attempt autoplay on mount only if user has opted in
    const attemptAutoplay = async () => {
      if (!hasOptedIn.current) {
        // First-time visitor: do not autoplay
        setIsBlocked(false);
        setIsPlaying(false);
        return;
      }

      try {
        await audio.play();
        setIsPlaying(true);
        setIsBlocked(false);
        setError(null);
      } catch (error) {
        // Autoplay blocked by browser policy
        setIsBlocked(true);
        setIsPlaying(false);
        
        // Register user-gesture listeners to unblock
        attachUnblockListeners();
      }
    };

    // Retry on visibility change (tab becomes visible) only if opted in
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && hasOptedIn.current && isBlocked && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setIsBlocked(false);
          setError(null);
          removeUnblockListeners();
        } catch (error) {
          // Still blocked
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    attemptAutoplay();

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (unblockCleanupRef.current) {
        unblockCleanupRef.current();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    const audio = getOrCreateAudio();

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);

    // Persist preference
    const prefs: MusicPreferences = {
      muted: newMuted,
      volume: volume,
    };
    saveMusicPreferences(prefs);
  };

  const setVolume = (newVolume: number) => {
    const audio = getOrCreateAudio();

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audio.volume = clampedVolume;
    setVolumeState(clampedVolume);

    // Persist preference
    const prefs: MusicPreferences = {
      muted: isMuted,
      volume: clampedVolume,
    };
    saveMusicPreferences(prefs);
  };

  const userInitiatedPlay = async () => {
    try {
      const audio = getOrCreateAudio();
      
      await audio.play();
      setIsPlaying(true);
      setIsBlocked(false);
      setError(null);
      
      // Save opt-in preference
      hasOptedIn.current = true;
      saveOptInToMusic();
    } catch (err) {
      // Playback failed
      setIsBlocked(true);
      setIsPlaying(false);
      setError('Music could not be started. Please try again or check your browser settings.');
      console.error('Failed to start background music:', err);
    }
  };

  return {
    isPlaying,
    isMuted,
    isBlocked,
    volume,
    error,
    toggleMute,
    setVolume,
    userInitiatedPlay,
  };
}
