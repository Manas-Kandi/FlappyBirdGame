# Task 04: Procedural City Generation & Scrolling

context_from_previous_tasks:
  scene_atmosphere: Sunset gradient sky with golden hour lighting
  bird_complete: Origami bird with physics and cel-shading
  collision_system: Sphere bounds ready for obstacle detection
  aesthetic: Japanese-inspired low-poly with vibrant colors

city_design_philosophy:
  inspiration: Jet Set Radio meets Monument Valley
  visual_style: Geometric skyscrapers with impossible architecture
  color_palette: Neon accents (cyan, magenta, yellow) on dark buildings
  rooftop_details: Gardens, antennas, helipads for visual interest
  spacing: Varied gaps creating challenging but fair gameplay

building_types[4]:
  skyscraper_tall:
    height_range: [15, 25]
    width: 3
    depth: 3
    color: 0x2a2a4a (dark blue-gray)
    accent_color: 0x00ffff (cyan neon)
    features: Vertical neon strips, rooftop antenna
  
  skyscraper_short:
    height_range: [8, 15]
    width: 4
    depth: 4
    color: 0x3a3a5a (medium blue-gray)
    accent_color: 0xff00ff (magenta neon)
    features: Rooftop garden, horizontal neon bands
  
  tower_thin:
    height_range: [20, 30]
    width: 2
    depth: 2
    color: 0x1a1a3a (very dark blue)
    accent_color: 0xffff00 (yellow neon)
    features: Spire top, scattered window lights
  
  platform_wide:
    height_range: [5, 10]
    width: 6
    depth: 4
    color: 0x4a4a6a (light blue-gray)
    accent_color: 0xff6b9d (hot pink)
    features: Helipad, multiple levels

obstacle_pair_structure:
  concept: Buildings create gaps for bird to fly through
  gap_configuration:
    min_gap_height: 4.5
    max_gap_height: 6.5
    gap_center_y_range: [5, 12]
    horizontal_spacing: 8.0
  
  composition:
    bottom_building:
      height: gap_center_y - gap_height/2
      position_y: height/2
    
    top_building:
      height: 25 - (gap_center_y + gap_height/2)
      position_y: gap_center_y + gap_height/2 + height/2
    
    visual_connection:
      - Matching building types for aesthetic cohesion
      - Complementary neon colors
      - Aligned architectural details

building_geometry_generation:
  base_structure:
    type: BoxGeometry
    segments: 1 (flat faces for low-poly)
    material: MeshToonMaterial with cel-shading
  
  neon_accents:
    technique: Emissive material strips
    geometry: Thin BoxGeometry overlays
    material:
      type: MeshBasicMaterial
      color: accent_color
      emissive: accent_color
      emissive_intensity: 2.0
    
    patterns[3]:
      vertical_strips: 3-5 strips along building height
      horizontal_bands: 2-3 bands wrapping building
      edge_highlights: Corner and edge lighting
  
  rooftop_details:
    antenna:
      geometry: CylinderGeometry
      height: 2.0
      radius: 0.1
      material: Emissive with glow
    
    garden:
      geometry: BoxGeometry (flat green plane)
      color: 0x4a7c59 (muted green)
      decoration: Small cube "trees"
    
    helipad:
      geometry: CircleGeometry
      color: 0xffff00 (yellow)
      marking: Cross pattern with lines

procedural_generation_system:
  pool_management:
    concept: Reuse building pairs for performance
    pool_size: 6 pairs
    recycling: When building exits left, reset and place right
  
  spawn_logic:
    trigger: When rightmost building x < SPAWN_THRESHOLD
    position_x: Last building x + HORIZONTAL_SPACING
    randomization[3]:
      - Building type selection
      - Gap height and center position
      - Neon accent color variation
  
  difficulty_progression:
    gap_reduction:
      formula: gap_height = MAX_GAP - (score * 0.05)
      min_gap: 4.0
      max_gap: 6.5
    
    speed_increase:
      formula: scroll_speed = BASE_SPEED + (score * 0.02)
      max_speed: 6.0

scrolling_system:
  constants:
    BASE_SCROLL_SPEED: 3.0
    DESPAWN_X: -15.0
    SPAWN_X: 40.0
    INITIAL_BUILDINGS: 5
  
  update_logic:
    - Move all buildings left by scroll_speed * deltaTime
    - Check if building passed bird (score increment)
    - Check if building x < DESPAWN_X (recycle)
    - Check if need to spawn new building

city_generator_class_structure:
  constructor:
    parameters: scene
    initialize[4]:
      - Create building pool
      - Generate initial building pairs
      - Set up material library
      - Initialize spawn position tracker
  
  methods[7]:
    generateBuilding(type, height, position):
      purpose: Create single building with details
      returns: Group containing building and accents
    
    createBuildingPair(x_position):
      purpose: Generate top and bottom buildings with gap
      steps[4]:
        - Randomize gap parameters
        - Select building types
        - Create both buildings
        - Add to scene and tracking array
    
    update(deltaTime, birdPosition):
      purpose: Scroll buildings and manage spawning
      behavior:
        - Move all buildings left
        - Check for scoring
        - Recycle off-screen buildings
        - Spawn new buildings as needed
    
    checkCollision(birdBounds):
      purpose: Detect if bird hits any building
      returns: boolean
      method: Sphere-box intersection test
    
    reset():
      purpose: Clear all buildings and regenerate
      use_case: Game restart
    
    getScore():
      returns: Current score based on passed buildings
    
    destroy():
      purpose: Clean up all resources

collision_detection_implementation:
  algorithm:
    type: Sphere-AABB intersection
    bird_sphere: Radius 0.7 centered on bird position
    building_boxes: AABB for each building mesh
  
  optimization:
    - Only check buildings near bird (x range ±5)
    - Early exit on first collision found
    - Cache building bounds on creation
  
  precision:
    tolerance: 0.9 (multiply bird radius for forgiveness)
    purpose: Make game feel fair, not punishing

visual_enhancements[5]:
  - Randomize building heights within type ranges
  - Vary neon accent patterns per building
  - Add subtle rotation to some buildings (0-5°)
  - Emit particles from rooftop gardens (optional)
  - Cast shadows from buildings onto each other

performance_optimization[4]:
  - Merge static geometries where possible
  - Use instanced rendering for repeated elements
  - Limit active buildings to visible range
  - Dispose geometries when recycling buildings

testing_criteria[6]:
  - Buildings spawn continuously as bird moves
  - Gaps are consistently passable
  - Collision detection is accurate and fair
  - Buildings scroll smoothly at 60fps
  - Neon accents glow properly with bloom
  - Score increments when passing building pairs

git_workflow:
  commit_message: |
    feat: implement procedural city generation with neon-lit buildings
    
    - Create 4 building types with varied heights and styles
    - Generate building pairs with randomized gaps for gameplay
    - Add neon accent strips with emissive materials and glow
    - Implement rooftop details (antennas, gardens, helipads)
    - Build scrolling system with building pool and recycling
    - Add sphere-AABB collision detection for bird vs buildings
    - Implement difficulty progression (narrower gaps, faster speed)
    - Optimize with object pooling and instanced rendering
    
    Visual style: Jet Set Radio meets Monument Valley
    Architecture: Impossible geometry with vibrant neon accents
    Performance: 60fps with 5+ active building pairs
  
  commands[3]:
    - git add src/City.js src/main.js
    - git commit -m "feat: implement procedural city generation with neon-lit buildings\n\n- Create 4 building types with varied heights and styles\n- Generate building pairs with randomized gaps for gameplay\n- Add neon accent strips with emissive materials and glow\n- Implement rooftop details (antennas, gardens, helipads)\n- Build scrolling system with building pool and recycling\n- Add sphere-AABB collision detection for bird vs buildings\n- Implement difficulty progression (narrower gaps, faster speed)\n- Optimize with object pooling and instanced rendering\n\nVisual style: Jet Set Radio meets Monument Valley\nArchitecture: Impossible geometry with vibrant neon accents\nPerformance: 60fps with 5+ active building pairs"
    - git push origin main

next_task_context:
  focus: Game state machine and UI integration
  city_ready: Procedural generation and collision detection complete
  scoring_system: Building pass tracking implemented
  difficulty: Progressive challenge system active
