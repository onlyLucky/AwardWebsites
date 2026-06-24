// ===== 特性数据定义 =====
// 定义 animejs 首页展示的 6 个核心特性

export interface Feature {
  id: string
  title: string
  description: string
  code: string
  color: string
}

export const features: Feature[] = [
  {
    id: 'intuitive',
    title: 'Intuitive API',
    description: 'Animate faster with an easy-to-use, yet powerful animation API.',
    code: `animate('.square', {
  rotate: 90,
  loop: true,
  ease: 'inOutExpo',
});`,
    color: 'getting-started',
  },
  {
    id: 'composition',
    title: 'Enhanced transforms',
    description: 'Smoothly blend individual CSS transform properties with a versatile composition API.',
    code: `animate('.shape', {
  x: random(-100, 100),
  y: random(-100, 100),
  rotate: random(-180, 180),
  duration: random(500, 1000),
  composition: 'blend',
});`,
    color: 'animation',
  },
  {
    id: 'scroll',
    title: 'Scroll Observer',
    description: 'Synchronise and trigger animations on scroll with the Scroll Observer API.',
    code: `animate(createDrawable('path'), {
  draw: ['0 0', '0 1', '1 1'],
  delay: stagger(40),
  ease: 'inOut(3)',
  autoplay: onScroll({ sync: true }),
});`,
    color: 'turquoise',
  },
  {
    id: 'staggering',
    title: 'Advanced staggering',
    description: 'Create stunning effects in seconds with the built-in Stagger utility function.',
    code: `const options = {
  grid: [13, 13],
  from: 'center',
};

createTimeline()
  .add('.dot', {
    scale: stagger([1.1, .75], options),
    ease: 'inOutQuad',
  }, stagger(200, options));`,
    color: 'utils',
  },
  {
    id: 'svgUtils',
    title: 'SVG toolset',
    description: 'Morph shapes, follow motion paths, and draw lines easily with the built-in SVG utilities.',
    code: `animate('.car', {
  ...createMotionPath('.circuit'),
});

animate(createDrawable('.circuit'), {
  draw: '0 1',
});

animate('.circuit-a', {
  d: morphTo('.circuit-b'),
});`,
    color: 'svg',
  },
  {
    id: 'draggable',
    title: 'Springs and draggable',
    description: 'Drag, snap, flick and throw HTML elements with the fully-featured Draggable API.',
    code: `createDraggable('.circle', {
  releaseEase: createSpring({
    stiffness: 120,
    damping: 6,
  })
});`,
    color: 'draggable',
  },
  {
    id: 'clockwork',
    title: 'Runs like clockwork',
    description: 'Orchestrate animation sequences and keep callbacks in sync with the powerful Timeline API.',
    code: `createTimeline()
  .add('.tick', {
    y: '-=6',
    duration: 50,
  }, stagger(10))
  .add('.ticker', {
    rotate: 360,
    duration: 1920,
  }, '<');`,
    color: 'timeline',
  },
  {
    id: 'responsive',
    title: 'Responsive animations',
    description: 'Make animations respond to media queries easily with the Scope API.',
    code: `createScope({
  mediaQueries: {
    portrait: '(orientation: portrait)',
  }
})
.add(({ matches }) => {
  const isPortrait = matches.portrait;
  createTimeline().add('.circle', {
    y: isPortrait ? 0 : [-50, 50, -50],
    x: isPortrait ? [-50, 50, -50] : 0,
  }, stagger(100));
});`,
    color: 'green',
  },
]

// ===== 模块数据定义 =====
// 定义 anime.js 的模块化 API 和对应的 bundle size

export interface Module {
  name: string
  size: number
  color: string
}

export const modules: Module[] = [
  { name: 'Timer', size: 5.6, color: 'timer' },
  { name: 'Animation', size: 5.2, color: 'animation' },
  { name: 'Timeline', size: 0.55, color: 'timeline' },
  { name: 'Animatable', size: 0.4, color: 'animatable' },
  { name: 'Draggable', size: 6.41, color: 'draggable' },
  { name: 'Scroll', size: 4.3, color: 'events' },
  { name: 'Scope', size: 0.22, color: 'scope' },
  { name: 'SVG', size: 0.35, color: 'svg' },
  { name: 'Stagger', size: 0.48, color: 'utils' },
  { name: 'Spring', size: 0.52, color: 'easings' },
  { name: 'WAAPI', size: 3.5, color: 'waapi' },
]

// 计算总大小
export const totalSize = modules.reduce((acc, mod) => acc + mod.size, 0)

// ===== 工具箱标签数据 =====
// 复刻源码左侧/右侧工具箱标签切换效果
export const toolboxLabelsLeft: string[] = [
  'Timer',
  'Animation',
  'Timeline',
  'Animatable',
  'Draggable',
  'Scope',
  'Scroll',
  'SVG',
  'Utils',
  'Easings',
  'WAAPI',
  'Spring',
  'Stagger',
  'Motion path',
  'Morph',
  'Draw',
]

export const toolboxLabelsRight: string[] = [
  'CSS transforms',
  'Individual transforms',
  'Function based values',
  'SVG attributes',
  'CSS variables',
  'Color animations',
  'Layout animations',
  'Path animations',
  'Keyframes',
  'Composition',
  'Blend modes',
  'Callbacks',
  'Promises',
  'Await',
  'Sync',
  'Async',
]
