declare module 'use-sound' {
  import { Howl } from 'howler';

  export interface UseSoundOptions {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: { [key: string]: [number, number] };
    loop?: boolean;
    onload?: () => void;
    onplay?: () => void;
    onend?: () => void;
    onpause?: () => void;
    onstop?: () => void;
  }

  export interface UseSoundControls {
    pause: (id?: string) => void;
    stop: (id?: string) => void;
    sound: Howl | null;
    isPlaying: boolean;
    duration: number | null;
  }

  export default function useSound(
    src: string | string[],
    options?: UseSoundOptions
  ): [() => void, UseSoundControls];
}
