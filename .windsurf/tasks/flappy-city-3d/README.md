# Flappy City 3D - Implementation Task Guide

project_overview:
  name: Flappy City 3D
  vision: Award-winning 3D Flappy Bird with Japanese aesthetic
  style: Studio Ghibli meets Jet Set Radio
  technology: Three.js, Vite, Web Audio API
  repository: https://github.com/Manas-Kandi/flappy-game.git

task_structure:
  format: TOON (Token-Oriented Object Notation)
  total_tasks: 8
  execution_order: Sequential (1 → 2 → 3 → 4 → 5 → 6 → 7 → 8)
  completion_criteria: Each task ends with git commit and push

design_philosophy:
  code_style: Minimal, elegant, performant
  visual_aesthetic: Japanese-inspired with neon accents
  color_palette: Sunset gradient (coral pink to deep purple)
  architecture: Modular ES6 classes
  performance_target: 60fps on all devices

task_sequence[8]:
  task_01:
    file: task-01-project-foundation.md
    focus: Initialize project with Vite and Three.js
    deliverables[5]:
      - npm project with dependencies
      - Vite configuration
      - HTML structure with UI overlays
      - Module stubs (Scene, Bird, City, GameState, Controls)
      - Main.js entry point with game loop
    
    completion_indicator: npm run dev starts successfully
  
  task_02:
    file: task-02-scene-atmosphere.md
    focus: Scene setup with gradient sky and lighting
    deliverables[5]:
      - PerspectiveCamera with smooth follow
      - Multi-light system (ambient, directional, hemisphere, rim)
      - Custom shader gradient sky sphere
      - Post-processing with bloom
      - Exponential fog for depth
    
    completion_indicator: Dreamy sunset atmosphere renders at 60fps
  
  task_03:
    file: task-03-origami-bird.md
    focus: Origami-inspired bird with physics
    deliverables[5]:
      - Low-poly bird geometry (body, wings, tail, eyes)
      - Cel-shaded material (MeshToonMaterial)
      - Physics system (gravity, flap, velocity)
      - Wing flap animation
      - Rotation tilt based on velocity
    
    completion_indicator: Bird flaps and falls with smooth animation
  
  task_04:
    file: task-04-procedural-city.md
    focus: Procedural city generation with obstacles
    deliverables[6]:
      - 4 building types with varied heights
      - Building pairs with randomized gaps
      - Neon accent strips with emissive glow
      - Scrolling system with object pooling
      - Sphere-AABB collision detection
      - Difficulty progression system
    
    completion_indicator: Buildings scroll with passable gaps and accurate collision
  
  task_05:
    file: task-05-game-state-ui.md
    focus: Game state machine and UI system
    deliverables[6]:
      - State machine (MENU, PLAYING, GAME_OVER, PAUSED)
      - Responsive UI with Japanese typography
      - Score tracking with localStorage
      - Animated UI transitions
      - High score persistence
      - Loading screen
    
    completion_indicator: Full game flow from menu to game over works
  
  task_06:
    file: task-06-controls-mobile.md
    focus: Universal controls and mobile optimization
    deliverables[5]:
      - Controls class (keyboard, mouse, touch, gamepad)
      - Flap cooldown system
      - Haptic feedback for mobile
      - Device detection and adaptive quality
      - Accessibility features
    
    completion_indicator: All input methods work, 60fps on mobile
  
  task_07:
    file: task-07-audio-system.md
    focus: Spatial audio and music system
    deliverables[5]:
      - AudioManager with Web Audio API
      - Spatial audio with PannerNode
      - Procedural sound effects (flap, score, collision)
      - Lo-fi hip hop background music
      - Volume controls and persistence
    
    completion_indicator: All sounds play with spatial positioning
  
  task_08:
    file: task-08-polish-deploy.md
    focus: Final polish and deployment
    deliverables[6]:
      - Particle systems (trail, burst, impact, ambient)
      - Juice effects (screen shake, slow motion, squash/stretch)
      - Performance optimization
      - Production build configuration
      - Deployment to hosting
      - README documentation
    
    completion_indicator: Game deployed and accessible online

execution_guidelines:
  for_llm_implementer[8]:
    - Read entire task file before starting
    - Follow TOON format specifications exactly
    - Maintain aesthetic consistency across tasks
    - Reference previous task context sections
    - Test each deliverable before committing
    - Write clear, commented code
    - Use exact git commit messages provided
    - Push to repository after each task
  
  context_retention:
    - Each task includes "context_from_previous_tasks" section
    - Maintain color palette throughout all tasks
    - Keep architectural patterns consistent
    - Reference established constants and conventions
  
  anti_hallucination_measures[5]:
    - Specific implementation details provided
    - Exact class structures and method signatures
    - Clear validation criteria for each task
    - Fallback approaches for complex features
    - Testing checklists to verify correctness
  
  code_quality_standards:
    - ES6+ modern JavaScript
    - JSDoc comments for public methods
    - Descriptive variable names
    - Modular architecture
    - Performance-conscious implementations

success_metrics:
  technical[5]:
    - 60fps on desktop and mobile
    - No console errors
    - Smooth animations
    - Accurate collision detection
    - Responsive controls
  
  aesthetic[5]:
    - Japanese-inspired visual style
    - Sunset gradient sky
    - Neon-lit buildings
    - Cel-shaded bird
    - Dreamy atmosphere
  
  gameplay[4]:
    - Fair and challenging difficulty
    - Satisfying flap mechanics
    - Clear visual feedback
    - Engaging progression

final_deliverable:
  game_features[10]:
    - 3D graphics with Three.js
    - Procedural city generation
    - Origami-inspired bird
    - Spatial audio system
    - Lo-fi hip hop music
    - Particle effects
    - Screen shake and juice
    - Mobile-optimized
    - High score persistence
    - Deployed to web
  
  artistic_achievement:
    - Award-winning Japanese aesthetic
    - Studio Ghibli atmosphere
    - Jet Set Radio neon style
    - Minimalist UI design
  
  technical_excellence:
    - Modular ES6 architecture
    - 60fps performance
    - Mobile-first design
    - Accessible controls
    - Production-ready code

repository_structure:
  after_completion:
    root[6]:
      - package.json
      - vite.config.js
      - index.html
      - README.md
      - .gitignore
      - dist/ (build output)
    
    src[7]:
      - main.js
      - Scene.js
      - Bird.js
      - City.js
      - GameState.js
      - Controls.js
      - AudioManager.js
      - style.css

getting_started:
  for_implementer[5]:
    step_1: Read this README completely
    step_2: Start with task-01-project-foundation.md
    step_3: Complete each task sequentially
    step_4: Test thoroughly before moving to next task
    step_5: Celebrate completion of task-08!
  
  estimated_time:
    per_task: 1-2 hours
    total_project: 8-16 hours
    complexity: Intermediate to Advanced

support_resources:
  documentation[4]:
    - Three.js docs: https://threejs.org/docs/
    - Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
    - Vite docs: https://vitejs.dev/
    - TOON format: https://github.com/toon-format/toon
  
  inspiration:
    - Studio Ghibli films (atmosphere)
    - Jet Set Radio (neon aesthetic)
    - Monument Valley (impossible architecture)
    - Persona 5 (UI design)

notes:
  - Each task is self-contained with full specifications
  - Context sections ensure continuity between tasks
  - Git workflow enforces incremental progress
  - Testing criteria validate each implementation
  - Final result is portfolio-worthy game

good_luck:
  message: |
    This is a comprehensive guide to building a beautiful,
    award-winning 3D game. Take your time, follow the tasks
    sequentially, and enjoy the creative process.
    
    The result will be a stunning piece of interactive art
    that showcases technical skill and artistic vision.
    
    Happy coding! 🎮✨
