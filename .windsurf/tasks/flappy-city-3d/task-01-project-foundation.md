# Task 01: Project Foundation & Architecture

project_context:
  name: Flappy City 3D
  vision: Award-winning Japanese aesthetic meets modern 3D web gaming
  style_inspiration: Studio Ghibli meets Jet Set Radio
  technical_approach: Minimal, elegant, performant
  repository: https://github.com/Manas-Kandi/flappy-game.git

design_philosophy:
  visual_style: Cel-shaded low-poly with vibrant colors
  color_palette: Sunset gradient sky (coral pink to deep purple)
  atmosphere: Dreamy urban landscape at golden hour
  bird_design: Origami-inspired geometric bird with paper-fold aesthetic
  city_aesthetic: Stylized skyscrapers with neon accents and rooftop gardens

technical_requirements:
  framework: Three.js r160+
  build_tool: Vite for instant dev server and optimized builds
  structure: Modular ES6 classes for maintainability
  performance_target: 60fps on mid-range devices
  code_philosophy: Clean, commented, minimal dependencies

file_structure:
  root_files[4]: package.json,vite.config.js,index.html,.gitignore
  src_directory:
    main_entry: main.js
    modules[5]: Scene.js,Bird.js,City.js,GameState.js,Controls.js
    styles: style.css
  assets_directory:
    placeholder: Create empty directory for future assets

implementation_steps[6]:
  step_01:
    action: Initialize npm project with Vite and Three.js
    commands[3]:
      - npm init -y
      - npm install three vite --save
      - npm install --save-dev vite
    
  step_02:
    action: Create package.json scripts
    scripts:
      dev: vite
      build: vite build
      preview: vite preview
    
  step_03:
    action: Create vite.config.js
    config:
      base: ./
      build_output: dist
      public_dir: public
    
  step_04:
    action: Create index.html with minimal structure
    requirements[4]:
      - Full viewport canvas container
      - Loading screen overlay
      - Score display UI
      - Game over modal (hidden by default)
    styling:
      font: Japanese-inspired geometric sans-serif
      ui_position: Absolute positioned overlays
      canvas: Full screen with pointer-events
    
  step_05:
    action: Create src/main.js entry point
    responsibilities[4]:
      - Import Three.js and modules
      - Initialize scene manager
      - Set up animation loop
      - Handle window resize
    structure:
      imports: ES6 module imports
      initialization: Async init function
      game_loop: RequestAnimationFrame with delta time
    
  step_06:
    action: Create basic module stubs
    files[5]:
      Scene.js:
        purpose: Manage Three.js scene, camera, renderer, lighting
        exports: SceneManager class
      Bird.js:
        purpose: Bird model, physics, animation
        exports: Bird class
      City.js:
        purpose: Procedural city generation and scrolling
        exports: CityGenerator class
      GameState.js:
        purpose: Game state machine and score tracking
        exports: GameState class
      Controls.js:
        purpose: Input handling (keyboard, mouse, touch)
        exports: Controls class

code_style_guidelines:
  naming_convention: camelCase for variables, PascalCase for classes
  comments: JSDoc style for all public methods
  constants: UPPER_SNAKE_CASE at top of files
  organization: Group related functionality, separate concerns
  error_handling: Try-catch for async operations

git_workflow:
  branch: main
  commit_message_format: |
    feat: initialize project foundation with Vite and Three.js
    
    - Set up npm project with Vite build tool
    - Configure Three.js r160+ as core dependency
    - Create modular file structure for game components
    - Add basic HTML structure with UI overlays
    - Implement main.js entry point with game loop
    - Create module stubs for Scene, Bird, City, GameState, Controls
    
    Architecture follows Japanese game design principles:
    minimalist code, maximum artistic impact
  
  commands[3]:
    - git add .
    - git commit -m "feat: initialize project foundation with Vite and Three.js\n\n- Set up npm project with Vite build tool\n- Configure Three.js r160+ as core dependency\n- Create modular file structure for game components\n- Add basic HTML structure with UI overlays\n- Implement main.js entry point with game loop\n- Create module stubs for Scene, Bird, City, GameState, Controls\n\nArchitecture follows Japanese game design principles:\nminimalist code, maximum artistic impact"
    - git push origin main

validation_checklist[6]:
  - npm install runs without errors
  - npm run dev starts Vite dev server
  - Browser shows blank canvas (no errors in console)
  - All module files exist and export classes
  - File structure matches specification exactly
  - Git commit pushed successfully

next_task_context:
  focus: Implement Scene.js with camera, lighting, and atmosphere
  dependencies: This task must complete successfully first
  continuity: Maintain color palette and aesthetic vision
