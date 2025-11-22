# Task 06: Controls System & Mobile Optimization

context_from_previous_tasks:
  game_state_machine: Complete with state transitions
  ui_system: Responsive design with animations
  bird_physics: Flap mechanics implemented
  city_scrolling: Active and collision-ready

controls_philosophy:
  principle: Universal one-button input across all devices
  goal: Instant response with satisfying feedback
  accessibility: Support keyboard, mouse, touch simultaneously
  feel: Tight, responsive, arcade-like precision

input_methods[4]:
  keyboard:
    primary_key: Space
    alternative_keys: ArrowUp, W
    behavior: Single flap on keydown
    repeat_prevention: Ignore held keys
  
  mouse:
    trigger: Left click anywhere on canvas
    behavior: Single flap per click
    cursor: Custom pointer cursor on canvas
  
  touch:
    trigger: Tap anywhere on screen
    behavior: Single flap per tap
    multi_touch: Ignore, only process first touch
    prevention: Prevent default to avoid scrolling
  
  gamepad:
    optional: true
    trigger: A button or any face button
    behavior: Single flap on button press

controls_class_structure:
  constructor:
    parameters: gameState, bird
    initialize[4]:
      - Store references to game state and bird
      - Bind event listeners
      - Initialize input state tracking
      - Set up flap cooldown timer
  
  properties:
    is_flap_ready: boolean (cooldown tracking)
    flap_cooldown_duration: 0.15 seconds
    last_flap_time: timestamp
    active_touches: Set (track touch IDs)
  
  methods[6]:
    handleFlap():
      purpose: Process flap input with state checking
      logic[4]:
        - Check if game state is PLAYING
        - Check if flap cooldown expired
        - Call bird.flap()
        - Reset cooldown timer
      
      feedback:
        - Trigger haptic feedback on mobile
        - Play flap sound effect
        - Animate UI score pulse
    
    onKeyDown(event):
      purpose: Handle keyboard input
      behavior:
        - Check if valid flap key
        - Prevent default browser behavior
        - Route to handleFlap() or state change
    
    onMouseClick(event):
      purpose: Handle mouse clicks
      behavior:
        - Check if click on canvas
        - Route to handleFlap() or state change
    
    onTouchStart(event):
      purpose: Handle touch input
      behavior:
        - Prevent default scrolling
        - Track touch ID
        - Route to handleFlap() or state change
    
    enable():
      purpose: Activate all input listeners
      use_case: Game start or resume
    
    disable():
      purpose: Deactivate all input listeners
      use_case: Game pause or menu

mobile_optimization_strategy:
  touch_handling:
    passive_listeners: false (need preventDefault)
    touch_action: none (CSS to prevent gestures)
    tap_delay_removal: touch-action: manipulation
  
  viewport_configuration:
    meta_tag:
      viewport: width=device-width, initial-scale=1.0
      user_scalable: no
      maximum_scale: 1.0
      minimum_scale: 1.0
    
    purpose: Prevent zoom and ensure full-screen experience
  
  performance_optimizations[5]:
    - Reduce particle effects on mobile
    - Lower shadow quality on mobile
    - Decrease post-processing intensity
    - Use lower pixel ratio (1.5 max on mobile)
    - Simplify building geometry on low-end devices
  
  device_detection:
    method: Check user agent or touch capability
    categories[3]:
      - mobile: Touch-enabled, smaller screen
      - tablet: Touch-enabled, medium screen
      - desktop: Mouse/keyboard, large screen
    
    adaptive_settings:
      mobile:
        pixel_ratio: 1.5
        shadow_map_size: 1024
        bloom_strength: 0.2
        max_buildings: 4
      
      desktop:
        pixel_ratio: 2.0
        shadow_map_size: 2048
        bloom_strength: 0.3
        max_buildings: 6

haptic_feedback_implementation:
  support_check:
    - Check for navigator.vibrate API
    - Fallback gracefully if not supported
  
  vibration_patterns:
    flap:
      duration: 10ms
      pattern: [10]
      trigger: On successful flap
    
    collision:
      duration: 200ms
      pattern: [50, 30, 50]
      trigger: On game over
    
    score:
      duration: 15ms
      pattern: [15]
      trigger: On passing building

input_state_management:
  cooldown_system:
    purpose: Prevent input spam
    implementation:
      - Track last flap timestamp
      - Compare current time to last flap + cooldown
      - Only process if cooldown expired
    
    visual_feedback:
      - Brief flash on bird on successful flap
      - Ignore indicator if input during cooldown
  
  state_based_routing:
    MENU:
      - Any input starts game
      - No flap processing
    
    PLAYING:
      - Process flap inputs
      - Ignore menu/restart inputs
    
    GAME_OVER:
      - Wait 1 second before accepting restart
      - Any input after delay restarts game
      - No flap processing

accessibility_enhancements[4]:
  keyboard_navigation:
    - Tab to focus canvas
    - Enter/Space to interact
    - Escape to pause (if implemented)
  
  screen_reader_support:
    - ARIA labels on interactive elements
    - Announce score changes
    - Announce game state changes
  
  reduced_motion:
    - Check prefers-reduced-motion media query
    - Reduce animation intensity if preferred
    - Maintain gameplay but simplify effects
  
  high_contrast_mode:
    - Detect system preference
    - Increase UI contrast
    - Simplify visual effects

performance_monitoring:
  fps_tracking:
    - Monitor frame rate in real-time
    - Adjust quality if FPS drops below 50
    - Display FPS counter in debug mode
  
  adaptive_quality:
    thresholds[3]:
      - fps < 50: Reduce shadow quality
      - fps < 40: Disable bloom effect
      - fps < 30: Simplify building geometry
    
    recovery:
      - Monitor for sustained improvement
      - Gradually restore quality settings

event_listener_management:
  registration:
    timing: On Controls class instantiation
    options:
      passive: false (need preventDefault)
      capture: false
  
  cleanup:
    purpose: Prevent memory leaks
    implementation:
      - Store listener references
      - Remove on game destroy
      - Use AbortController for easy cleanup

testing_scenarios[8]:
  - Space key triggers flap in PLAYING state
  - Mouse click triggers flap in PLAYING state
  - Touch tap triggers flap on mobile
  - Multiple rapid inputs respect cooldown
  - Input in MENU state starts game
  - Input in GAME_OVER state restarts game
  - Haptic feedback works on supported devices
  - Performance adapts to device capabilities

debug_tools:
  input_visualizer:
    - Show input events in console (debug mode)
    - Display cooldown timer visually
    - Show touch points on screen
  
  performance_overlay:
    - FPS counter
    - Draw call count
    - Active object count
    - Memory usage

git_workflow:
  commit_message: |
    feat: implement universal controls and mobile optimization
    
    - Create Controls class handling keyboard, mouse, touch, gamepad
    - Implement flap cooldown system (150ms) to prevent spam
    - Add haptic feedback for flap, collision, and score events
    - Build state-based input routing (MENU, PLAYING, GAME_OVER)
    - Optimize for mobile with adaptive quality settings
    - Configure viewport for full-screen mobile experience
    - Add device detection and performance-based quality adjustment
    - Implement accessibility features (keyboard nav, reduced motion)
    
    Input philosophy: Universal one-button control
    Mobile: Touch-optimized with haptic feedback
    Performance: Adaptive quality maintains 60fps
    Accessibility: Keyboard navigation and reduced motion support
  
  commands[3]:
    - git add src/Controls.js src/main.js index.html
    - git commit -m "feat: implement universal controls and mobile optimization\n\n- Create Controls class handling keyboard, mouse, touch, gamepad\n- Implement flap cooldown system (150ms) to prevent spam\n- Add haptic feedback for flap, collision, and score events\n- Build state-based input routing (MENU, PLAYING, GAME_OVER)\n- Optimize for mobile with adaptive quality settings\n- Configure viewport for full-screen mobile experience\n- Add device detection and performance-based quality adjustment\n- Implement accessibility features (keyboard nav, reduced motion)\n\nInput philosophy: Universal one-button control\nMobile: Touch-optimized with haptic feedback\nPerformance: Adaptive quality maintains 60fps\nAccessibility: Keyboard navigation and reduced motion support"
    - git push origin main

next_task_context:
  focus: Audio system with spatial sound and music
  controls_complete: All input methods working
  mobile_ready: Touch controls and performance optimized
  accessibility: Keyboard and reduced motion support added
