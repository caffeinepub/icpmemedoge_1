import { useEffect, useRef, useState } from 'react';
import { loadMusicPreferences, saveMusicPreferences, hasOptedInToMusic, saveOptInToMusic, type MusicPreferences } from '../utils/backgroundMusicStorage';

interface UseBackgroundMusicReturn {
  isPlaying: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  isStarting: boolean;
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
  const [isStarting, setIsStarting] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [error, setError] = useState<string | null>(null);
  const unblockListenersAttached = useRef(false);
  const unblockCleanupRef = useRef<(() => void) | null>(null);
  const hasOptedIn = useRef(hasOptedInToMusic());
  const playAttemptInProgress = useRef(false);

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
      setIsStarting(false);
      setError(null);
    });
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('error', (e) => {
      setIsPlaying(false);
      setIsStarting(false);
      setError('Music could not be loaded. Please try again.');
      console.error('Audio error:', e);
    });

    audioRef.current = audio;
    return audio;
  };

  // Wait for audio to be ready with timeout
  const waitForReady = (audio: HTMLAudioElement, timeoutMs: number = 5000): Promise<void> => {
    return new Promise((resolve, reject) => {
      // If already ready, resolve immediately
      if (audio.readyState >= 3) {
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Audio loading timed out'));
      }, timeoutMs);

      const onCanPlay = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error('Audio failed to load'));
      };

      const cleanup = () => {
        clearTimeout(timeout);
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
      };

      audio.addEventListener('canplaythrough', onCanPlay, { once: true });
      audio.addEventListener('error', onError, { once: true });
    });
  };

  // Reset audio element on critical failure
  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
  };

  // Initialize audio element early (singleton)
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
    // Prevent overlapping play attempts
    if (playAttemptInProgress.current) {
      return;
    }

    playAttemptInProgress.current = true;
    setIsStarting(true);
    setError(null);

    try {
      // Get or recreate audio element (handles retry after error)
      let audio = audioRef.current;
      
      // If audio element is in error state, reset and recreate
      if (audio && audio.error) {
        resetAudio();
        audio = null;
      }

      audio = getOrCreateAudio();

      // Re-apply persisted preferences after potential reset
      const prefs = loadMusicPreferences();
      audio.volume = prefs.volume;
      audio.muted = prefs.muted;
      setVolumeState(prefs.volume);
      setIsMuted(prefs.muted);

      // Wait for audio to be ready (with timeout)
      try {
        await waitForReady(audio, 5000);
      } catch (readyError) {
        throw new Error('Music is taking too long to load. Please check your connection and try again.');
      }

      // Attempt playback with timeout
      const playPromise = audio.play();
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Playback start timed out')), 3000);
      });

      await Promise.race([playPromise, timeoutPromise]);

      // Success
      setIsPlaying(true);
      setIsBlocked(false);
      setIsStarting(false);
      setError(null);
      
      // Save opt-in preference
      hasOptedIn.current = true;
      saveOptInToMusic();
    } catch (err) {
      // Playback failed
      setIsBlocked(true);
      setIsPlaying(false);
      setIsStarting(false);

      // Determine error message
      let errorMessage = 'Music could not be started. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('load') || err.message.includes('connection')) {
          errorMessage = 'Music could not be loaded. Please check your connection and try again.';
        } else if (err.message.includes('timeout') || err.message.includes('timed out')) {
          errorMessage = 'Music is taking too long to start. Please try again.';
        } else if (err.name === 'NotAllowedError' || err.name === 'NotSupportedError') {
          errorMessage = 'Music playback was blocked by your browser. Please check your browser settings.';
        }
      }

      setError(errorMessage);
      console.error('Failed to start background music:', err);
    } finally {
      playAttemptInProgress.current = false;
    }
  };

  return {
    isPlaying,
    isMuted,
    isBlocked,
    isStarting,
    volume,
    error,
    toggleMute,
    setVolume,
    userInitiatedPlay,
  };
}
