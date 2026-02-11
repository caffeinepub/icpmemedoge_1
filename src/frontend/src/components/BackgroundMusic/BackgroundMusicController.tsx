import { Volume2, VolumeX, Play, AlertCircle, Loader2 } from 'lucide-react';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export function BackgroundMusicController() {
  const { isPlaying, isMuted, volume, error, isStarting, toggleMute, setVolume, userInitiatedPlay } = useBackgroundMusic();

  // Show play button whenever music is not playing (first visit or stopped)
  if (!isPlaying) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {error && (
          <div className="bg-red-900/90 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-start gap-2 max-w-xs">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <Button
          onClick={userInitiatedPlay}
          disabled={isStarting}
          size="lg"
          className="bg-neon-pink hover:bg-neon-pink/80 text-white shadow-lg shadow-neon-pink/50 rounded-full h-14 w-14 p-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isStarting ? 'Starting music...' : 'Play background music'}
        >
          {isStarting ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Play className={`h-6 w-6 ${!isStarting ? 'animate-pulse' : ''}`} />
          )}
        </Button>
        {isStarting && (
          <div className="bg-gray-900/90 border border-neon-pink/30 text-neon-pink px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm text-sm">
            Starting music…
          </div>
        )}
      </div>
    );
  }

  // Show mute/volume controls when playing
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            className="bg-gray-900/80 hover:bg-gray-800/80 text-neon-cyan border-neon-cyan/30 shadow-lg shadow-neon-cyan/20 rounded-full h-12 w-12 p-0 backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-gray-900/95 border-neon-cyan/30 backdrop-blur-sm" side="top">
          <div className="space-y-3">
            <div className="text-sm font-medium text-neon-cyan">Volume</div>
            <Slider
              value={[volume * 100]}
              onValueChange={(values) => setVolume(values[0] / 100)}
              max={100}
              step={1}
              className="w-full"
              aria-label="Adjust background music volume"
            />
            <div className="text-xs text-gray-400 text-center">{Math.round(volume * 100)}%</div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        onClick={toggleMute}
        size="lg"
        className="bg-neon-cyan hover:bg-neon-cyan/80 text-gray-900 shadow-lg shadow-neon-cyan/50 rounded-full h-12 px-4"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </Button>
    </div>
  );
}
