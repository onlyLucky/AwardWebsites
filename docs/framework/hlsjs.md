# HLS.js 技术知识点文档

## 1. 技术介绍

### 1.1 什么是 HLS.js

HLS.js (HTTP Live Streaming JavaScript) 是一个开源的 JavaScript 库，用于在支持 HTML5 视频标签的现代浏览器中播放 HLS（HTTP Live Streaming）媒体。它使用 MediaSource Extensions (MSE) 来解析和播放 HLS 流，而不需要浏览器原生支持 HLS。

### 1.2 核心特性

- **自适应码率**：自动切换适合网络条件的视频质量
- **实时流播放**：支持直播和点播两种模式
- **DVR（数字视频录像机）**：支持暂停、回看直播流
- **音视频同步**：确保音频和视频同步播放
- **加密内容支持**：支持 AES 加密的 HLS 流
- **字幕支持**：支持 WebVTT 和其他字幕格式
- **多音轨选择**：支持多语言和多种音频质量
- **错误恢复**：自动重试和错误恢复机制
- **事件系统**：丰富的事件监听和响应机制
- **自定义配置**：高度可配置的播放器行为

### 1.3 适用场景

- **视频点播平台**：提供高质量的视频点播服务
- **直播流媒体**：新闻直播、体育赛事、音乐会等
- **教育和培训**：在线课程、培训视频、学术讲座
- **企业视频**：公司培训、产品演示、会议录制
- **移动应用**：在移动浏览器中提供高质量视频播放
- **多语言网站**：提供多语言音轨和字幕
- **视频门户网站**：类似 YouTube、优酷等视频分享网站

### 1.4 不适用场景

- **超高清实时流**：对延迟要求特别严格的应用
- **需要特殊编解码器**：HLS.js 只支持浏览器支持的编解码器
- **完全离线播放**：没有网络时无法播放（除非预加载）
- **DRM 受限内容**：某些 DRM 方案可能需要额外配置

## 2. 快速入门

### 2.1 环境要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- HTML5 Video 标签支持
- MediaSource Extensions (MSE) 支持
- Node.js（如果需要在开发环境使用）

### 2.2 安装依赖

```bash
# 使用 npm
npm install hls.js

# 使用 yarn
yarn add hls.js

# 使用 CDN（直接在 HTML 中引入）
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js"></script>
```

### 2.3 项目结构建议

```
src/
├── components/
│   ├── VideoPlayer.jsx    # 视频播放器组件
│   ├── PlayerControls.jsx # 播放控制组件
│   ├── QualitySelector.jsx # 质量选择器
│   └── SubtitleSelector.jsx # 字幕选择器
├── hooks/
│   ├── useVideoPlayer.js  # 视频播放器 Hook
│   └── useHlsPlayer.js   # HLS 播放器 Hook
└── pages/
    └── index.jsx         # 主页面
```

### 2.4 第一个 HLS 播放器

让我们创建一个简单的 HLS 视频播放器。

```jsx
// src/components/VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && src) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        // 创建 HLS 实例
        const hls = new Hls({
          debug: false, // 生产环境设为 false
        });

        // 加载视频源
        hls.loadSource(src);
        hls.attachMedia(video);

        // 监听事件
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          console.log('Manifest loaded');
        });

        // 错误处理
        hls.on(Hls.Events.ERROR, function(event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Network error, trying to recover');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Media error, trying to recover');
                hls.recoverMediaError();
                break;
              default:
                console.log('Fatal error, cannot recover');
                hls.destroy();
                break;
            }
          }
        });

        return () => {
          hls.destroy(); // 清理
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // 浏览器原生支持 HLS（如 Safari）
        video.src = src;
      }
    }
  }, [src]);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        controls
        poster={poster}
        playsInline
        crossOrigin="anonymous"
      />
    </div>
  );
}

export default VideoPlayer;
```

```jsx
// src/App.jsx
import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const videoUrl = 'https://example.com/path/to/video/index.m3u8';
  
  return (
    <div className="app">
      <h1>HLS.js Video Player</h1>
      <VideoPlayer 
        src={videoUrl} 
        poster="https://example.com/path/to/poster.jpg" 
      />
    </div>
  );
}

export default App;
```

### 2.5 添加播放控制

让我们创建一个自定义的播放控制界面。

```jsx
// src/components/PlayerControls.jsx
import React from 'react';

function PlayerControls({ 
  isPlaying, 
  currentTime, 
  duration, 
  volume, 
  isMuted,
  onPlayPause, 
  onSeek, 
  onVolumeChange, 
  onToggleMute 
}) {
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player-controls">
      {/* 播放/暂停 */}
      <button onClick={onPlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* 进度条 */}
      <div className="progress-bar">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="seek-slider"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      {/* 音量控制 */}
      <div className="volume-control">
        <button onClick={onToggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>
    </div>
  );
}

export default PlayerControls;
```

## 3. 基础使用

### 3.1 基础配置

```jsx
import Hls from 'hls.js';

// 基础配置
const hlsConfig = {
  enableWorker: true,           // 启用 Web Worker
  lowLatencyMode: false,         // 低延迟模式（直播用）
  maxBufferLength: 30,          // 最大缓冲秒数
  maxBufferSize: 60 * 1000 * 1000, // 最大缓冲大小 60MB
  maxBufferHole: 0.5,           // 允许的缓冲间隙
  startLevel: -1,               // 初始质量级别（-1 = 自动）
  testBandwidth: true,          // 测试带宽
  maxStarvationDelay: 4,       // 最大缓冲等待时间
};

const hls = new Hls(hlsConfig);
```

### 3.2 播放器事件监听

```jsx
import Hls from 'hls.js';

function setupEventListeners(hls) {
  // 核心事件
  hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
    console.log('Manifest parsed, levels:', data.levels);
  });

  hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
    console.log('Level loaded:', data.details);
  });

  hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
    console.log('Level switched to:', data.level);
  });

  hls.on(Hls.Events.BUFFER_CREATED, (event, data) => {
    console.log('Buffer created');
  });

  hls.on(Hls.Events.BUFFER_APPENDING, (event, data) => {
    console.log('Buffer appending:', data.type);
  });

  // 播放事件
  hls.on(Hls.Events.FRAG_LOADING, (event, data) => {
    console.log('Fragment loading:', data.frag);
  });

  hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
    console.log('Fragment loaded');
  });

  hls.on(Hls.Events.FRAG_PARSING_DATA, (event, data) => {
    console.log('Fragment parsing data');
  });

  // 错误处理
  hls.on(Hls.Events.ERROR, (event, data) => {
    console.error('Error:', data);
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          console.error('Network error, trying to recover');
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.error('Media error, trying to recover');
          hls.recoverMediaError();
          break;
        default:
          console.error('Fatal error, destroying HLS instance');
          hls.destroy();
          break;
      }
    }
  });
}
```

### 3.3 质量选择和自适应码率

```jsx
import React, { useState, useEffect } from 'react';

function QualitySelector({ hls, levels }) {
  const [currentLevel, setCurrentLevel] = useState(-1);

  useEffect(() => {
    if (hls) {
      const handleLevelSwitched = (event, data) => {
        setCurrentLevel(data.level);
      };

      hls.on(Hls.Events.LEVEL_SWITCHED, handleLevelSwitched);

      return () => {
        hls.off(Hls.Events.LEVEL_SWITCHED, handleLevelSwitched);
      };
    }
  }, [hls]);

  const handleLevelChange = (levelIndex) => {
    if (hls) {
      hls.currentLevel = levelIndex; // -1 = 自动
      setCurrentLevel(levelIndex);
    }
  };

  return (
    <div className="quality-selector">
      <select 
        value={currentLevel}
        onChange={(e) => handleLevelChange(parseInt(e.target.value))}
      >
        <option value={-1}>Auto</option>
        {levels.map((level, index) => (
          <option key={index} value={index}>
            {level.height}p ({Math.round(level.bitrate / 1000)} Kbps)
          </option>
        ))}
      </select>
    </div>
  );
}

export default QualitySelector;
```

### 3.4 字幕和多音轨

```jsx
import React, { useState, useEffect } from 'react';

function SubtitleSelector({ hls, subtitleTracks }) {
  const [currentSubtitle, setCurrentSubtitle] = useState(-1);

  useEffect(() => {
    if (hls) {
      const handleSubtitleTracksUpdated = (event, data) => {
        console.log('Subtitle tracks updated:', data.tracks);
      };

      hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, handleSubtitleTracksUpdated);

      return () => {
        hls.off(Hls.Events.SUBTITLE_TRACKS_UPDATED, handleSubtitleTracksUpdated);
      };
    }
  }, [hls]);

  const handleSubtitleChange = (trackIndex) => {
    if (hls) {
      hls.subtitleTrack = trackIndex; // -1 = 关闭
      setCurrentSubtitle(trackIndex);
    }
  };

  return (
    <div className="subtitle-selector">
      <select 
        value={currentSubtitle}
        onChange={(e) => handleSubtitleChange(parseInt(e.target.value))}
      >
        <option value={-1}>Off</option>
        {subtitleTracks.map((track, index) => (
          <option key={index} value={index}>
            {track.lang || track.name || `Track ${index}`}
          </option>
        ))}
      </select>
    </div>
  );
}

function AudioTrackSelector({ hls, audioTracks }) {
  const [currentAudio, setCurrentAudio] = useState(0);

  const handleAudioChange = (trackIndex) => {
    if (hls) {
      hls.audioTrack = trackIndex;
      setCurrentAudio(trackIndex);
    }
  };

  return (
    <div className="audio-selector">
      <select 
        value={currentAudio}
        onChange={(e) => handleAudioChange(parseInt(e.target.value))}
      >
        {audioTracks.map((track, index) => (
          <option key={index} value={index}>
            {track.lang || track.name || `Audio ${index}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SubtitleSelector, AudioTrackSelector };
```

### 3.5 使用 React Hooks

```jsx
// src/hooks/useHlsPlayer.js
import { useState, useRef, useEffect, useCallback } from 'react';
import Hls from 'hls.js';

function useHlsPlayer(src) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [audioTracks, setAudioTracks] = useState([]);
  const [subtitleTracks, setSubtitleTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初始化 HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const initHls = async () => {
      try {
        setLoading(true);
        setError(null);

        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: process.env.NODE_ENV === 'development',
            enableWorker: true,
            lowLatencyMode: false,
          });

          hlsRef.current = hls;

          hls.loadSource(src);
          hls.attachMedia(video);

          // 事件监听
          hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            setLevels(data.levels);
            setLoading(false);
          });

          hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (event, data) => {
            setAudioTracks(data.tracks);
          });

          hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, (event, data) => {
            setSubtitleTracks(data.tracks);
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            setCurrentLevel(data.level);
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error('Fatal HLS error:', data);
              setError(data);
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // 原生 HLS 支持（如 Safari）
          video.src = src;
          setLoading(false);
        } else {
          throw new Error('HLS is not supported in this browser');
        }
      } catch (err) {
        console.error('Error initializing HLS:', err);
        setError(err);
        setLoading(false);
      }
    };

    initHls();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src]);

  // 视频事件监听
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // 播放控制方法
  const play = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  const setVolumeValue = useCallback((value) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }, []);

  const setLevel = useCallback((level) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  }, []);

  const setAudioTrack = useCallback((trackIndex) => {
    if (hlsRef.current) {
      hlsRef.current.audioTrack = trackIndex;
    }
  }, []);

  const setSubtitleTrack = useCallback((trackIndex) => {
    if (hlsRef.current) {
      hlsRef.current.subtitleTrack = trackIndex;
    }
  }, []);

  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    levels,
    currentLevel,
    audioTracks,
    subtitleTracks,
    loading,
    error,
    play,
    pause,
    togglePlay,
    seek,
    setVolume: setVolumeValue,
    toggleMute,
    setLevel,
    setAudioTrack,
    setSubtitleTrack,
  };
}

export default useHlsPlayer;
```

## 4. 进阶使用

### 4.1 直播流和 DVR 功能

```jsx
// src/components/LivePlayer.jsx
import React from 'react';
import Hls from 'hls.js';
import useHlsPlayer from '../hooks/useHlsPlayer';

function LivePlayer({ src, enableDvr }) {
  const {
    videoRef,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    loading,
    error,
  } = useHlsPlayer(src);

  const isDvrAvailable = duration && isFinite(duration);

  const goToLive = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration;
    }
  };

  if (loading) return <div>Loading live stream...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="live-player">
      <video ref={videoRef} playsInline className="live-video" />

      <div className="live-controls">
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <div className="live-indicator">
          <span className="live-badge">LIVE</span>
        </div>

        {enableDvr && isDvrAvailable && (
          <>
            <div className="dvr-controls">
              <span className="time">
                {Math.max(0, Math.floor(currentTime - duration))}s (DVR)
              </span>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => seek(parseFloat(e.target.value))}
              />
            </div>
            <button onClick={goToLive}>Go Live</button>
          </>
        )}
      </div>
    </div>
  );
}

export default LivePlayer;
```

### 4.2 自定义配置和性能优化

```jsx
import Hls from 'hls.js';

const optimizedConfig = {
  // 基础配置
  enableWorker: true,
  enableSoftwareAES: true,

  // 缓冲配置
  maxBufferLength: 30,           // 最多缓冲30秒
  maxBufferSize: 60 * 1000 * 1000, // 60MB 缓冲
  maxBufferHole: 0.5,
  highBufferWatchdogPeriod: 3,
  nudgeOffset: 0.1,
  nudgeMaxRetry: 3,

  // 片段加载
  maxFragLookUpTolerance: 0.2,
  startLevel: -1,               // 自动选择起始质量
  testBandwidth: true,
  startPosition: -1,

  // 自适应码率
  abrEwmaFastLive: 3.0,
  abrEwmaSlowLive: 9.0,
  abrEwmaFastVoD: 3.0,
  abrEwmaSlowVoD: 9.0,
  abrBandWidthFactor: 0.8,
  abrBandWidthUpFactor: 0.7,

  // 高级
  maxLoadingDelay: 4,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: Infinity,
  liveDurationInfinity: false,
  enableSTBBuffer: false,
  forceKeyFrameOnDiscontinuity: true,
  progressive: false,
  capLevelToPlayerSize: false,
  capLevelOnFPSDrop: false,
};

function createOptimizedHlsPlayer(src, videoElement) {
  const hls = new Hls(optimizedConfig);
  hls.loadSource(src);
  hls.attachMedia(videoElement);
  return hls;
}

export { optimizedConfig, createOptimizedHlsPlayer };
```

### 4.3 自定义播放器 UI

```jsx
// src/components/CustomVideoPlayer.jsx
import React from 'react';
import useHlsPlayer from '../hooks/useHlsPlayer';
import PlayerControls from './PlayerControls';
import QualitySelector from './QualitySelector';
import { SubtitleSelector, AudioTrackSelector } from './SubtitleSelector';

function CustomVideoPlayer({ src, poster }) {
  const {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    levels,
    currentLevel,
    audioTracks,
    subtitleTracks,
    loading,
    error,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setLevel,
    setAudioTrack,
    setSubtitleTrack,
  } = useHlsPlayer(src);

  if (loading) {
    return (
      <div className="video-container loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="video-container error">
        <p>Error loading video: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        crossOrigin="anonymous"
        className="video-player"
      />

      <div className="video-overlay">
        <PlayerControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          onPlayPause={togglePlay}
          onSeek={seek}
          onVolumeChange={setVolume}
          onToggleMute={toggleMute}
        />

        <div className="extra-controls">
          {levels.length > 0 && (
            <QualitySelector levels={levels} />
          )}
          
          {audioTracks.length > 0 && (
            <AudioTrackSelector audioTracks={audioTracks} />
          )}
          
          {subtitleTracks.length > 0 && (
            <SubtitleSelector subtitleTracks={subtitleTracks} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomVideoPlayer;
```

### 4.4 错误处理和重试机制

```jsx
// src/utils/errorHandler.js
import Hls from 'hls.js';

function setupErrorHandling(hls, maxRetries = 3) {
  let retryCount = 0;
  let isRecovering = false;

  const resetRetryCount = () => {
    retryCount = 0;
  };

  hls.on(Hls.Events.ERROR, (event, data) => {
    console.error('HLS Error:', data);

    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          if (retryCount < maxRetries) {
            console.log(`Network error, retrying (${retryCount + 1}/${maxRetries})...`);
            retryCount++;
            setTimeout(() => {
              hls.startLoad();
            }, 2000 * retryCount); // 递增重试延迟
          } else {
            console.error('Max retries reached, giving up');
            hls.destroy();
          }
          break;

        case Hls.ErrorTypes.MEDIA_ERROR:
          if (!isRecovering) {
            isRecovering = true;
            console.log('Media error, trying to recover');
            hls.recoverMediaError();

            // 重置恢复标志
            setTimeout(() => {
              isRecovering = false;
            }, 5000);
          }
          break;

        default:
          console.error('Fatal error, cannot recover');
          hls.destroy();
          break;
      }
    } else {
      // 非致命错误
      console.warn('Non-fatal error:', data);
      if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
        console.log('Buffer stalled, trying to recover');
        hls.nextLevel = hls.currentLevel - 1; // 降低质量
      }
    }
  });

  // 成功恢复后重置重试计数
  hls.on(Hls.Events.FRAG_LOADED, resetRetryCount);
  hls.on(Hls.Events.LEVEL_LOADED, resetRetryCount);

  return {
    resetRetryCount,
    getRetryCount: () => retryCount,
  };
}

export { setupErrorHandling };
```

## 5. 实际应用

### 5.1 完整的视频门户网站播放器

```jsx
// src/components/VideoPortalPlayer.jsx
import React, { useState } from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';

function VideoPortalPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const videoPlaylist = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      url: 'https://example.com/videos/intro/index.m3u8',
      thumbnail: 'https://example.com/thumbnails/intro.jpg',
      duration: '15:32',
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      url: 'https://example.com/videos/advanced-js/index.m3u8',
      thumbnail: 'https://example.com/thumbnails/advanced-js.jpg',
      duration: '24:15',
    },
    {
      id: 3,
      title: 'Building Responsive UIs',
      url: 'https://example.com/videos/responsive-ui/index.m3u8',
      thumbnail: 'https://example.com/thumbnails/responsive-ui.jpg',
      duration: '18:42',
    },
  ];

  return (
    <div className="video-portal">
      <header className="portal-header">
        <h1>Video Portal</h1>
        <button onClick={() => setShowPlaylist(!showPlaylist)}>
          {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
        </button>
      </header>

      <div className="portal-content">
        <div className="main-player">
          {selectedVideo ? (
            <CustomVideoPlayer
              src={selectedVideo.url}
              poster={selectedVideo.thumbnail}
            />
          ) : (
            <div className="no-video-selected">
              <p>Select a video from the playlist</p>
            </div>
          )}
        </div>

        {showPlaylist && (
          <aside className="playlist-sidebar">
            <h3>Playlist</h3>
            <ul className="video-list">
              {videoPlaylist.map((video) => (
                <li
                  key={video.id}
                  className={`video-item ${selectedVideo?.id === video.id ? 'active' : ''}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                  <div className="video-info">
                    <h4>{video.title}</h4>
                    <span className="video-duration">{video.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}

export default VideoPortalPlayer;
```

### 5.2 多语言教育平台

```jsx
// src/components/EducationPlayer.jsx
import React, { useState } from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';
import { SubtitleSelector, AudioTrackSelector } from './SubtitleSelector';

function EducationPlayer({ courseData }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [notes, setNotes] = useState('');
  const [activeNote, setActiveNote] = useState(null);

  const lesson = courseData.lessons[currentLesson];

  const saveNote = () => {
    if (activeNote !== null) {
      console.log('Saving note at timestamp:', activeNote);
      setNotes('');
      setActiveNote(null);
    }
  };

  const addNoteAtCurrentTime = (timestamp) => {
    setActiveNote(timestamp);
  };

  return (
    <div className="education-player">
      <div className="player-section">
        {lesson && (
          <CustomVideoPlayer
            src={lesson.videoUrl}
            poster={lesson.thumbnail}
          />
        )}
      </div>

      <div className="content-section">
        <div className="lesson-info">
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
        </div>

        <div className="notes-section">
          <h3>Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Take notes while watching..."
          />
          <div className="note-controls">
            <button onClick={saveNote} disabled={!activeNote}>
              Save Note
            </button>
          </div>
        </div>

        <div className="lesson-navigation">
          <button
            disabled={currentLesson === 0}
            onClick={() => setCurrentLesson(prev => prev - 1)}
          >
            Previous Lesson
          </button>
          <span>
            Lesson {currentLesson + 1} of {courseData.lessons.length}
          </span>
          <button
            disabled={currentLesson === courseData.lessons.length - 1}
            onClick={() => setCurrentLesson(prev => prev + 1)}
          >
            Next Lesson
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationPlayer;
```

### 5.3 活动直播平台

```jsx
// src/components/LiveEventPlayer.jsx
import React, { useState, useEffect } from 'react';
import Hls from 'hls.js';
import LivePlayer from './LivePlayer';

function LiveEventPlayer({ eventData }) {
  const [isLive, setIsLive] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    // 模拟实时观众计数
    const interval = setInterval(() => {
      setViewerCount(prev => Math.max(1000, prev + Math.floor(Math.random() * 10) - 5));
    }, 3000);

    // 模拟直播状态
    setIsLive(true);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          user: 'You',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="live-event">
      <header className="event-header">
        <div className="event-info">
          <h1>{eventData.title}</h1>
          <div className="live-indicator">
            <span className="live-badge">{isLive ? 'LIVE' : 'OFFLINE'}</span>
            <span className="viewer-count">{viewerCount} watching</span>
          </div>
        </div>
      </header>

      <div className="event-content">
        <div className="player-area">
          <LivePlayer src={eventData.streamUrl} enableDvr={true} />
        </div>

        <aside className="chat-sidebar">
          <div className="chat-header">
            <h3>Live Chat</h3>
          </div>

          <div className="chat-messages">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="chat-message">
                <span className="message-user">{msg.user}</span>
                <span className="message-text">{msg.text}</span>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={!isLive}
            />
            <button type="submit" disabled={!isLive}>Send</button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default LiveEventPlayer;
```

## 6. 常见问题

### 6.1 播放问题

**问题：视频无法加载或播放**

解决方案：
1. 检查视频 URL 是否正确
2. 确认浏览器支持 HLS
3. 检查 CORS 设置
4. 验证 HLS 流格式是否正确

```jsx
// 检查支持情况
if (Hls.isSupported()) {
  console.log('HLS.js is supported');
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  console.log('Native HLS is supported');
} else {
  console.error('HLS is not supported');
}

// 检查 CORS
const checkCors = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (err) {
    console.error('CORS error:', err);
    return false;
  }
};
```

### 6.2 性能问题

**问题：视频卡顿或缓冲频繁**

解决方案：
1. 优化 HLS 配置
2. 降低起始质量
3. 增加缓冲时间
4. 检查网络连接

```jsx
const performanceConfig = {
  maxBufferLength: 60,          // 增加缓冲
  startLevel: 0,                // 从最低质量开始
  abrBandWidthFactor: 0.6,      // 更保守的带宽估计
  capLevelToPlayerSize: true,   // 根据播放器大小限制质量
};
```

### 6.3 兼容性问题

**问题：在某些浏览器中无法播放**

解决方案：
1. 提供降级方案
2. 使用多种视频格式
3. 检查编解码器支持

```jsx
function getVideoSource(video) {
  if (Hls.isSupported()) {
    return { type: 'hls', url: video.hlsUrl };
  } else if (video.canPlayType('video/mp4')) {
    return { type: 'mp4', url: video.mp4Url };
  } else if (video.canPlayType('video/webm')) {
    return { type: 'webm', url: video.webmUrl };
  }
  return { type: 'fallback', url: video.downloadUrl };
}
```

## 7. 性能优化

### 7.1 播放器优化

- **使用 Web Workers**：启用多线程处理
- **智能缓冲**：根据网络条件调整缓冲
- **自适应码率**：自动选择最佳质量
- **预加载**：提前加载下一个视频

```jsx
const optimizedHlsConfig = {
  enableWorker: true,
  maxBufferLength: 30,
  abrBandWidthFactor: 0.8,
  capLevelToPlayerSize: true,
};
```

### 7.2 网络优化

- **CDN 集成**：使用内容分发网络
- **缓存策略**：合理设置缓存头
- **断点续传**：支持从断点继续
- **多 CDN 备份**：提供备用源

```jsx
// 多源支持
const sources = [
  'https://cdn1.example.com/video/index.m3u8',
  'https://cdn2.example.com/video/index.m3u8',
  'https://cdn3.example.com/video/index.m3u8',
];

// 自动切换到可用源
let currentSourceIndex = 0;
const hls = new Hls();
hls.on(Hls.Events.ERROR, (event, data) => {
  if (data.fatal && data.type === Hls.ErrorTypes.NETWORK_ERROR) {
    if (currentSourceIndex < sources.length - 1) {
      currentSourceIndex++;
      hls.loadSource(sources[currentSourceIndex]);
    }
  }
});
```

## 8. 学习资源

### 8.1 官方资源

- **HLS.js GitHub**：[https://github.com/video-dev/hls.js/](https://github.com/video-dev/hls.js/)
- **HLS.js 文档**：[https://hlsjs.com/docs/](https://hlsjs.com/docs/)
- **HLS 规范**：[https://datatracker.ietf.org/doc/html/rfc8216](https://datatracker.ietf.org/doc/html/rfc8216)
- **Mozilla MediaSource**：[https://developer.mozilla.org/en-US/docs/Web/API/MediaSource](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource)

### 8.2 社区资源

- **HLS.js 演示**：[https://hlsjs.com/demo/](https://hlsjs.com/demo/)
- **Stack Overflow**：[https://stackoverflow.com/questions/tagged/hls.js](https://stackoverflow.com/questions/tagged/hls.js)
- **Video.js 集成**：[https://videojs.com/](https://videojs.com/)
- **Shaka Player**：[https://github.com/shaka-project/shaka-player](https://github.com/shaka-project/shaka-player)

### 8.3 推荐教程

- **HLS.js 入门教程**：[https://hlsjs.com/docs/getting-started/](https://hlsjs.com/docs/getting-started/)
- **MSE 深入讲解**：[https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/Examples](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/Examples)
- **视频流最佳实践**：[https://web.dev/fast-playback-with-media-source/](https://web.dev/fast-playback-with-media-source/)

## 9. 最佳实践

### 9.1 代码组织

- **组件化设计**：将播放器功能拆分为多个组件
- **Hook 复用**：使用自定义 Hook 管理播放器逻辑
- **错误处理**：全面的错误捕获和恢复机制
- **事件管理**：合理的事件监听和清理

### 9.2 用户体验

- **加载状态**：提供清晰的加载指示
- **错误反馈**：友好的错误信息
- **控制直观**：简单易用的播放控制
- **响应式**：适配各种屏幕尺寸

### 9.3 性能考虑

- **懒加载**：需要时才加载播放器
- **资源清理**：及时释放资源
- **质量选择**：提供用户可控的质量选项
- **网络感知**：根据网络条件调整行为

## 10. 总结

HLS.js 是一个强大而灵活的 JavaScript 库，使得在现代浏览器中播放高质量 HLS 视频变得简单。它提供了丰富的功能和良好的自定义能力，适合各种应用场景。

关键要点：
1. **从基础开始**：理解 HLS 和 MSE 的基本概念
2. **组件化设计**：使用 React 组件化构建播放器
3. **全面的事件处理**：利用 HLS.js 提供的事件系统
4. **性能优化**：合理配置以获得最佳性能
5. **错误处理**：提供健壮的错误恢复机制
6. **用户体验优化**：提供直观的控制和反馈

希望这份文档能够帮助你快速入门和掌握 HLS.js，为你的项目提供出色的视频播放体验！
