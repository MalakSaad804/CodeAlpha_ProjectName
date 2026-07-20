import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, ListMusic, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  cover: string;
}

const playlist: Song[] = [
  { id: 1, title: "Midnight Dreams", artist: "Luna Echo", duration: 184, cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300" },
  { id: 2, title: "Electric Pulse", artist: "Neon Waves", duration: 226, cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300" },
  { id: 3, title: "Ocean Breeze", artist: "Coastal Dreams", duration: 198, cover: "https://images.unsplash.com/photo-1459749411177-047381bb3ece?w=300" },
  { id: 4, title: "Urban Nights", artist: "City Lights", duration: 245, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300" },
  { id: 5, title: "Golden Hour", artist: "Sunset Collective", duration: 201, cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=300" },
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  
  const progressRef = useRef<HTMLDivElement>(null);
  
  const currentSong = playlist[currentSongIndex];

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            if (isRepeat) {
              return 0;
            } else {
              handleNext();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration, isRepeat]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (isShuffle) {
      const nextIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSongIndex(nextIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    }
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      setCurrentTime(Math.floor(percent * currentSong.duration));
    }
  };

  const toggleLike = (songId: number) => {
    setLiked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const progress = (currentTime / currentSong.duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Main Player Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-2 rounded-xl transition-colors ${showPlaylist ? 'bg-purple-500/30 text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              <ListMusic className="w-5 h-5" />
            </button>
            <span className="text-gray-400 text-sm font-medium">Now Playing</span>
            <button 
              onClick={() => toggleLike(currentSong.id)}
              className={`p-2 rounded-xl transition-colors ${liked.has(currentSong.id) ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}
            >
              <Heart className={`w-5 h-5 ${liked.has(currentSong.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Album Art */}
          <motion.div 
            key={currentSong.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-8"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
              <img 
                src={currentSong.cover} 
                alt={currentSong.title}
                className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <motion.h2 
              key={currentSong.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-1"
            >
              {currentSong.title}
            </motion.h2>
            <motion.p 
              key={currentSong.artist}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              {currentSong.artist}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="h-2 bg-gray-800 rounded-full cursor-pointer overflow-hidden"
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="progress"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-3 rounded-xl transition-colors ${isShuffle ? 'text-purple-400 bg-purple-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handlePrev}
              className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <motion.button 
              onClick={handlePlayPause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </motion.button>
            
            <button 
              onClick={handleNext}
              className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-3 rounded-xl transition-colors ${isRepeat ? 'text-purple-400 bg-purple-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-purple-500"
            />
          </div>
        </div>

        {/* Playlist */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mt-4 bg-gray-900/80 backdrop-blur-xl rounded-3xl p-4 border border-gray-800 overflow-hidden"
            >
              <h3 className="text-white font-semibold mb-4 px-2">Playlist</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {playlist.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                      currentSongIndex === index 
                        ? 'bg-purple-500/20 border border-purple-500/30' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${currentSongIndex === index ? 'text-purple-400' : 'text-white'}`}>
                        {song.title}
                      </p>
                      <p className="text-gray-500 text-sm truncate">{song.artist}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{formatTime(song.duration)}</span>
                    {currentSongIndex === index && isPlaying && (
                      <div className="flex gap-0.5">
                        <motion.div 
                          animate={{ height: [4, 16, 4] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="w-1 bg-purple-400 rounded-full"
                        />
                        <motion.div 
                          animate={{ height: [4, 12, 4] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                          className="w-1 bg-purple-400 rounded-full"
                        />
                        <motion.div 
                          animate={{ height: [4, 16, 4] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                          className="w-1 bg-purple-400 rounded-full"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}