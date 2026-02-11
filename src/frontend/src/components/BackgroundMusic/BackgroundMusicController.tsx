import { Volume2, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export function BackgroundMusicController() {
  const { isPlaying, isMuted, volume, setVolume, toggleMute } = useBackgroundMusic();

  // Only show controls when music is actually playing
  if (!isPlaying) {
    return null;
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
