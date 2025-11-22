# Task 05: Game State Machine & UI Integration

context_from_previous_tasks:
  scene_complete: Atmospheric sunset sky with lighting
  bird_functional: Physics, animation, and collision bounds
  city_active: Procedural generation with scrolling and collision
  aesthetic: Japanese-inspired with neon accents

game_state_philosophy:
  design_principle: Minimal UI, maximum immersion
  interaction_model: One-button gameplay (tap/click/space to flap)
  feedback_style: Subtle animations and color transitions
  typography: Geometric Japanese-inspired font (Orbitron or similar)

game_states[4]:
  MENU:
    description: Initial state showing title and instructions
    ui_elements[3]:
      - Game title with animated glow
      - "TAP TO START" prompt with pulse animation
      - High score display (subtle, top corner)
    
    scene_behavior:
      - Bird idle at starting position with bob animation
      - City scrolling slowly in background
      - Camera static at starting view
    
    transitions:
      to_PLAYING: On any input (tap, click, space)
  
  PLAYING:
    description: Active gameplay state
    ui_elements[2]:
      - Current score (large, center-top)
      - Subtle distance indicator
    
    scene_behavior:
      - Bird responds to flap inputs
      - City scrolls at game speed
      - Camera follows bird smoothly
      - Collision detection active
    
    transitions:
      to_GAME_OVER: On collision with building or boundaries
  
  GAME_OVER:
    description: End state showing results
    ui_elements[4]:
      - "GAME OVER" message with fade-in
      - Final score (large, emphasized)
      - High score comparison
      - "TAP TO RESTART" prompt
    
    scene_behavior:
      - Bird falls with physics (no input)
      - City stops scrolling
      - Camera zooms out slightly
      - Fade to darker atmosphere
    
    transitions:
      to_MENU: On any input after 1 second delay
  
  PAUSED:
    description: Optional pause state
    ui_elements[2]:
      - "PAUSED" overlay
      - "TAP TO RESUME" prompt
    
    scene_behavior:
      - All game logic frozen
      - Scene remains visible
    
    transitions:
      to_PLAYING: On any input

ui_design_specifications:
  color_scheme:
    primary_text: 0xffffff (white with glow)
    secondary_text: 0xffe4e1 (misty rose)
    accent: 0xff6b9d (hot pink)
    background_overlay: rgba(0, 0, 0, 0.3)
  
  typography:
    title_font:
      family: Orbitron or Exo 2
      size: 72px
      weight: 900
      text_shadow: 0 0 20px rgba(255, 107, 157, 0.8)
    
    score_font:
      family: Orbitron or Exo 2
      size: 48px
      weight: 700
      text_shadow: 0 0 10px rgba(255, 255, 255, 0.5)
    
    body_font:
      family: Orbitron or Exo 2
      size: 24px
      weight: 400
      letter_spacing: 2px
  
  animations[4]:
    title_glow:
      type: Pulsing text shadow
      duration: 2s
      easing: ease-in-out
      loop: infinite
    
    tap_prompt:
      type: Scale pulse
      scale_range: [1.0, 1.1]
      duration: 1s
      easing: ease-in-out
      loop: infinite
    
    score_increment:
      type: Scale bounce
      trigger: On score increase
      duration: 0.3s
      scale_peak: 1.3
    
    game_over_fade:
      type: Opacity fade-in
      duration: 0.5s
      delay: 0.2s
      easing: ease-out

html_structure:
  containers[4]:
    menu_screen:
      id: menu-screen
      classes: screen active
      children[3]:
        - h1.title: "FLAPPY CITY"
        - p.subtitle: "FLY THROUGH THE NEON SKYLINE"
        - p.prompt: "TAP TO START"
    
    game_ui:
      id: game-ui
      classes: screen hidden
      children[2]:
        - div.score-display: "0"
        - div.high-score: "BEST: 0"
    
    game_over_screen:
      id: game-over-screen
      classes: screen hidden
      children[4]:
        - h2.game-over-title: "GAME OVER"
        - p.final-score: "SCORE: 0"
        - p.high-score-message: "NEW HIGH SCORE!" (conditional)
        - p.restart-prompt: "TAP TO RESTART"
    
    loading_screen:
      id: loading-screen
      classes: screen
      children[2]:
        - div.loader: Animated spinner
        - p.loading-text: "LOADING..."

css_styling_approach:
  layout:
    positioning: Absolute with flexbox centering
    z_index_layers[4]:
      - canvas: 1
      - game-ui: 10
      - screens: 20
      - loading: 30
  
  responsive_design:
    breakpoints[2]:
      mobile: max-width 768px
      desktop: min-width 769px
    
    adjustments:
      mobile: Smaller font sizes, compact layout
      desktop: Larger text, more spacing
  
  visual_effects:
    backdrop_blur: 10px on overlays
    gradient_backgrounds: Subtle radial gradients
    border_glow: Box-shadow with neon colors
    transitions: All state changes smoothly animated

game_state_class_structure:
  constructor:
    parameters: none
    initialize[3]:
      - Set initial state to MENU
      - Load high score from localStorage
      - Initialize score to 0
  
  properties:
    current_state: string
    score: number
    high_score: number
    state_change_callbacks: Map
  
  methods[8]:
    setState(newState):
      purpose: Change game state and trigger UI updates
      behavior:
        - Update current_state
        - Call state exit callback
        - Call state enter callback
        - Update UI visibility
    
    incrementScore():
      purpose: Increase score and update display
      behavior:
        - Increment score
        - Update score UI with animation
        - Check for high score
        - Trigger score sound effect
    
    resetScore():
      purpose: Reset score to 0
      use_case: Game restart
    
    getState():
      returns: Current game state
    
    getScore():
      returns: Current score
    
    getHighScore():
      returns: High score from localStorage
    
    saveHighScore():
      purpose: Persist high score to localStorage
      condition: Only if current score > high score
    
    onStateChange(state, callback):
      purpose: Register callback for state transitions
      use_case: Trigger scene changes on state change

ui_controller_integration:
  responsibilities[5]:
    - Show/hide UI screens based on game state
    - Update score display in real-time
    - Animate UI transitions
    - Handle input events and route to game state
    - Manage loading screen visibility
  
  event_listeners[4]:
    click: On document for tap-to-interact
    keydown: Space key for flap
    touchstart: Mobile touch support
    resize: Adjust UI layout
  
  methods[4]:
    showScreen(screenId):
      - Hide all screens
      - Show target screen with fade-in
    
    updateScore(score):
      - Set score text content
      - Trigger scale animation
    
    showGameOver(score, highScore):
      - Display final score
      - Show high score message if applicable
      - Fade in game over screen
    
    hideLoading():
      - Fade out loading screen
      - Enable game interactions

integration_with_main_game_loop:
  state_checks:
    MENU:
      - Update bird idle animation
      - Slow city scroll for ambiance
      - Wait for input to start
    
    PLAYING:
      - Update bird physics
      - Update city scrolling
      - Check collisions
      - Update score on building pass
    
    GAME_OVER:
      - Disable input for 1 second
      - Play game over animation
      - Save high score
      - Wait for restart input
  
  input_routing:
    - Check current state before processing input
    - Route flap input only in PLAYING state
    - Route start/restart input in MENU/GAME_OVER states

local_storage_management:
  high_score:
    key: flappy_city_high_score
    format: integer
    operations[3]:
      - Load on game init
      - Save on game over if score > high_score
      - Clear on explicit reset (optional)
  
  settings:
    key: flappy_city_settings
    format: JSON object
    properties: sound_enabled, music_enabled

accessibility_considerations[4]:
  - High contrast text for readability
  - Large touch targets for mobile
  - Keyboard navigation support
  - Screen reader friendly labels

testing_criteria[6]:
  - Menu screen shows on load
  - Tap starts game and transitions to PLAYING
  - Score increments when passing buildings
  - Collision triggers GAME_OVER state
  - High score persists across sessions
  - All UI animations play smoothly

git_workflow:
  commit_message: |
    feat: implement game state machine and immersive UI system
    
    - Create state machine with MENU, PLAYING, GAME_OVER, PAUSED states
    - Design minimal UI with Japanese-inspired typography (Orbitron)
    - Implement score tracking with localStorage persistence
    - Add animated UI transitions (glow, pulse, fade, bounce)
    - Build responsive layout for mobile and desktop
    - Integrate input routing based on current game state
    - Add high score comparison and display
    - Create loading screen with animated spinner
    
    Design philosophy: Minimal UI, maximum immersion
    Typography: Geometric with neon glow effects
    Interaction: One-button gameplay with clear feedback
  
  commands[3]:
    - git add src/GameState.js src/main.js index.html src/style.css
    - git commit -m "feat: implement game state machine and immersive UI system\n\n- Create state machine with MENU, PLAYING, GAME_OVER, PAUSED states\n- Design minimal UI with Japanese-inspired typography (Orbitron)\n- Implement score tracking with localStorage persistence\n- Add animated UI transitions (glow, pulse, fade, bounce)\n- Build responsive layout for mobile and desktop\n- Integrate input routing based on current game state\n- Add high score comparison and display\n- Create loading screen with animated spinner\n\nDesign philosophy: Minimal UI, maximum immersion\nTypography: Geometric with neon glow effects\nInteraction: One-button gameplay with clear feedback"
    - git push origin main

next_task_context:
  focus: Input controls and mobile optimization
  game_state_ready: State machine managing game flow
  ui_complete: All screens designed and animated
  scoring_system: Score tracking and persistence active
