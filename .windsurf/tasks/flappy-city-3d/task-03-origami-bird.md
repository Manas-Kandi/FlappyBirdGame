# Task 03: Origami Bird with Physics & Animation

context_from_previous_tasks:
  scene_configured: true
  lighting_system: Golden hour with rim lighting
  camera_setup: Smooth follow behavior ready
  aesthetic: Japanese-inspired dreamy atmosphere

bird_design_philosophy:
  inspiration: Traditional origami crane meets modern geometry
  visual_style: Low-poly with visible facets suggesting paper folds
  color_scheme: Gradient from white to soft pink with cel-shading
  animation_principle: Subtle wing flutter and body tilt
  scale: Proportional to city buildings (not too small)

bird_geometry:
  body:
    type: Custom BufferGeometry or ConeGeometry
    shape: Elongated teardrop suggesting aerodynamic form
    segments: 8 (low-poly aesthetic)
    scale: [1, 1.5, 1]
    color: 0xffffff (white) with gradient shader
  
  wings[2]:
    left_wing:
      geometry: PlaneGeometry with custom shape
      position: [-0.6, 0, 0]
      rotation_axis: z-axis
      animation: Flap between -15° and 15°
    
    right_wing:
      geometry: PlaneGeometry with custom shape
      position: [0.6, 0, 0]
      rotation_axis: z-axis
      animation: Flap between -15° and 15° (opposite phase)
  
  tail:
    geometry: PlaneGeometry triangular
    position: [0, 0, -0.8]
    purpose: Visual balance and direction indicator
  
  eyes[2]:
    geometry: SphereGeometry
    radius: 0.08
    color: 0x000000
    position: [±0.2, 0.3, 0.5]
    purpose: Character and personality

material_setup:
  cel_shading_approach:
    type: MeshToonMaterial
    color: 0xffffff
    gradient_map: Custom 3-tone gradient texture
    emissive: 0xffe4e1 (subtle glow)
    emissive_intensity: 0.2
  
  alternative_shader:
    vertex_shader: Standard with position pass
    fragment_shader: Custom cel-shading with rim light
    uniforms:
      baseColor: vec3(1.0, 0.95, 0.95)
      rimColor: vec3(1.0, 0.7, 0.8)
      rimPower: 2.0

physics_system:
  constants:
    GRAVITY: -25.0
    FLAP_STRENGTH: 8.0
    MAX_FALL_SPEED: -15.0
    MAX_RISE_SPEED: 10.0
    ROTATION_SPEED: 3.0
    TERMINAL_VELOCITY: 20.0
  
  state_variables:
    velocity: Vector3(0, 0, 0)
    rotation_target: 0
    is_flapping: false
    flap_cooldown: 0.15 seconds
  
  update_logic:
    gravity_application:
      - velocity.y += GRAVITY * deltaTime
      - velocity.y = clamp(velocity.y, MAX_FALL_SPEED, MAX_RISE_SPEED)
    
    position_update:
      - position.y += velocity.y * deltaTime
      - Clamp position.y to playable area
    
    rotation_behavior:
      - rotation_target = velocity.y * 0.1 (tilt based on velocity)
      - rotation.z = lerp(rotation.z, rotation_target, ROTATION_SPEED * deltaTime)
      - Clamp rotation between -45° and 30°

animation_system:
  wing_flap:
    trigger: On user input (flap action)
    duration: 0.2 seconds
    animation:
      - Wings rotate outward to 15° over 0.1s
      - Wings return to 0° over 0.1s
      - Use sine wave for smooth motion
    
    idle_flutter:
      - Subtle continuous animation when not flapping
      - Small oscillation ±3° at 2Hz frequency
      - Adds life to bird when stationary
  
  body_bob:
    type: Sine wave vertical offset
    amplitude: 0.05
    frequency: 3.0
    purpose: Breathing/floating effect

bird_class_structure:
  constructor:
    parameters: scene
    initialize[5]:
      - Create bird mesh group
      - Build geometry (body, wings, tail, eyes)
      - Apply cel-shaded materials
      - Set initial position [0, 8, 0]
      - Add to scene
  
  methods[6]:
    flap():
      purpose: Apply upward force and trigger wing animation
      behavior:
        - Set velocity.y = FLAP_STRENGTH
        - Trigger wing flap animation
        - Play flap sound (placeholder for now)
    
    update(deltaTime):
      purpose: Update physics and animations
      steps[4]:
        - Apply gravity to velocity
        - Update position based on velocity
        - Update rotation based on velocity
        - Animate wings and body bob
    
    reset():
      purpose: Reset bird to starting position and state
      resets: position, velocity, rotation
    
    getPosition():
      returns: Vector3 of current position
    
    getBounds():
      returns: Bounding box for collision detection
      type: Box3 or sphere radius
    
    destroy():
      purpose: Clean up resources
      actions: Remove from scene, dispose geometries

collision_detection_prep:
  bounding_volume:
    type: Sphere
    radius: 0.7
    center: bird.position
    purpose: Simple and fast collision checks
  
  helper_visualization:
    debug_mode: Show wireframe sphere in development
    toggle: Via URL parameter ?debug=true

integration_with_controls:
  input_events:
    - Space key: Call bird.flap()
    - Mouse click: Call bird.flap()
    - Touch tap: Call bird.flap()
  
  cooldown_handling:
    - Prevent multiple flaps within 0.15s
    - Visual feedback on successful flap

visual_polish[4]:
  - Smooth rotation transitions with lerp
  - Wing animation synchronized with physics
  - Subtle emissive glow for magical feel
  - Shadow casting enabled for depth

testing_criteria[5]:
  - Bird visible in scene at starting position
  - Flap input causes upward movement
  - Gravity pulls bird down naturally
  - Wings animate smoothly on flap
  - Rotation tilts based on velocity direction

git_workflow:
  commit_message: |
    feat: create origami-inspired bird with cel-shading and physics
    
    - Design low-poly bird geometry with body, wings, tail, eyes
    - Implement MeshToonMaterial for cel-shaded aesthetic
    - Add physics system with gravity, flap force, and velocity
    - Create wing flap animation with smooth sine wave motion
    - Implement rotation tilt based on vertical velocity
    - Add subtle body bob and idle wing flutter
    - Set up sphere collision bounds for future collision detection
    
    Design: Origami crane aesthetic with paper-fold geometry
    Animation: Fluid wing flaps and dynamic body rotation
    Physics: Responsive and satisfying flap mechanics
  
  commands[3]:
    - git add src/Bird.js src/main.js
    - git commit -m "feat: create origami-inspired bird with cel-shading and physics\n\n- Design low-poly bird geometry with body, wings, tail, eyes\n- Implement MeshToonMaterial for cel-shaded aesthetic\n- Add physics system with gravity, flap force, and velocity\n- Create wing flap animation with smooth sine wave motion\n- Implement rotation tilt based on vertical velocity\n- Add subtle body bob and idle wing flutter\n- Set up sphere collision bounds for future collision detection\n\nDesign: Origami crane aesthetic with paper-fold geometry\nAnimation: Fluid wing flaps and dynamic body rotation\nPhysics: Responsive and satisfying flap mechanics"
    - git push origin main

next_task_context:
  focus: Procedural city generation with stylized buildings
  bird_ready: Physics and animation complete
  collision_bounds: Sphere collision ready for obstacles
  aesthetic_continuity: Maintain cel-shaded low-poly style
