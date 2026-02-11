import { useEffect, useRef, useState } from 'react';
import { loadMusicPreferences, saveMusicPreferences, hasOptedInToMusic, saveOptInToMusic, type MusicPreferences } from '../utils/backgroundMusicStorage';

interface UseBackgroundMusicReturn {
  isPlaying: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  userInitiatedPlay: () => void;
}

export function useBackgroundMusic(): UseBackgroundMusicReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const unblockListenersAttached = useRef(false);
  const unblockCleanupRef = useRef<(() => void) | null>(null);
  const hasOptedIn = useRef(hasOptedInToMusic());

  // Initialize audio element (singleton)
  useEffect(() => {
    if (audioRef.current) return;

    const audio = new Audio('/assets/audio/background-dance.mp3');
    audio.loop = true;
    audio.preload = 'auto';

    // Load preferences
    const prefs = loadMusicPreferences();
    audio.volume = prefs.volume;
    audio.muted = prefs.muted;
    setVolumeState(prefs.volume);
    setIsMuted(prefs.muted);

    audioRef.current = audio;

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
    if (!audioRef.current) return;

    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);

    // Persist preference
    const prefs: MusicPreferences = {
      muted: newMuted,
      volume: volume,
    };
    saveMusicPreferences(prefs);
  };

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
    setVolumeState(clampedVolume);

    // Persist preference
    const prefs: MusicPreferences = {
      muted: isMuted,
      volume: clampedVolume,
    };
    saveMusicPreferences(prefs);
  };

  const userInitiatedPlay = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setIsBlocked(false);
      
      // Save opt-in preference
      hasOptedIn.current = true;
      saveOptInToMusic();
    } catch (error) {
      // Still blocked or other error
      setIsBlocked(true);
    }
  };

  return {
    isPlaying,
    isMuted,
    isBlocked,
    volume,
    toggleMute,
    setVolume,
    userInitiatedPlay,
  };
}
