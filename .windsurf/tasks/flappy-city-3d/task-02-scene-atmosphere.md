# Task 02: Scene Setup & Atmospheric Rendering

context_from_previous_task:
  project_initialized: true
  modules_created: Scene.js,Bird.js,City.js,GameState.js,Controls.js
  style_direction: Japanese aesthetic with sunset gradient
  color_palette: Coral pink to deep purple gradient sky

scene_objectives:
  primary: Create breathtaking atmospheric 3D scene
  visual_goal: Evoke Studio Ghibli's sky aesthetics
  technical_goal: Optimized rendering pipeline at 60fps
  artistic_goal: Dreamy golden hour urban atmosphere

scene_configuration:
  camera:
    type: PerspectiveCamera
    fov: 75
    position: [0, 8, 20]
    look_at: [0, 8, 0]
    follow_behavior: Smooth lerp following bird with offset
  
  renderer:
    antialias: true
    pixel_ratio: min(window.devicePixelRatio, 2)
    tone_mapping: ACESFilmicToneMapping
    output_encoding: sRGBEncoding
    shadow_map: PCFSoftShadowMap enabled
  
  fog:
    type: FogExp2
    color: 0xffa07a (light coral)
    density: 0.015
    purpose: Depth perception and atmospheric perspective

lighting_setup[4]:
  ambient_light:
    color: 0xffe4e1 (misty rose)
    intensity: 0.6
    purpose: Soft base illumination
  
  directional_light:
    color: 0xffd700 (golden)
    intensity: 0.8
    position: [-10, 20, 10]
    cast_shadow: true
    shadow_map_size: 2048
    purpose: Simulate sunset sun rays
  
  hemisphere_light:
    sky_color: 0xff9a8b (sunset pink)
    ground_color: 0x4a4a6a (cool purple-gray)
    intensity: 0.4
    purpose: Natural sky-ground color bounce
  
  rim_light:
    color: 0xff6b9d (hot pink)
    intensity: 0.3
    position: [10, 15, -10]
    purpose: Artistic rim lighting on bird and buildings

sky_gradient_implementation:
  technique: Custom shader material on large sphere
  gradient_colors[3]:
    top: 0x4a148c (deep purple)
    middle: 0xff6b9d (hot pink)
    bottom: 0xffa07a (coral)
  
  shader_approach:
    vertex_shader: Pass vUv and position
    fragment_shader: Mix colors based on vertical position
    uniforms:
      topColor: vec3
      middleColor: vec3
      bottomColor: vec3
  
  geometry:
    type: SphereGeometry
    radius: 500
    segments: 32
    scale: [-1, 1, 1] (invert normals for inside view)

post_processing_effects:
  bloom:
    enabled: true
    strength: 0.3
    radius: 0.4
    threshold: 0.85
    purpose: Neon glow on city lights
  
  color_correction:
    saturation: 1.1
    contrast: 1.05
    purpose: Enhance vibrant aesthetic

scene_manager_class_structure:
  constructor:
    parameters: containerElement
    initialize[5]:
      - Create scene, camera, renderer
      - Set up lighting system
      - Create sky gradient sphere
      - Configure post-processing
      - Add window resize listener
  
  methods[4]:
    update(deltaTime):
      purpose: Update camera position and animations
      behavior: Smooth camera follow with lerp
    
    resize():
      purpose: Handle window resize events
      updates: Camera aspect ratio and renderer size
    
    render():
      purpose: Render scene with post-processing
      call: composer.render() or renderer.render()
    
    getCameraPosition():
      purpose: Expose camera for other modules
      returns: Vector3

implementation_details:
  imports[3]:
    - import * as THREE from 'three'
    - import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
    - import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
  
  constants:
    CAMERA_FOLLOW_SPEED: 0.05
    CAMERA_OFFSET_Y: 8
    CAMERA_OFFSET_Z: 20
    SKY_SPHERE_RADIUS: 500
  
  optimization_notes[3]:
    - Use object pooling for reusable geometries
    - Minimize draw calls with merged geometries where possible
    - Disable frustum culling for sky sphere

integration_with_main_js:
  initialization:
    - Import SceneManager
    - Create instance with canvas container
    - Store reference for game loop
  
  game_loop_integration:
    - Call sceneManager.update(deltaTime)
    - Call sceneManager.render()
    - Pass camera position to other modules

visual_testing_criteria[4]:
  - Sky shows smooth gradient from purple to coral
  - Lighting creates warm golden hour atmosphere
  - Fog provides depth and dreamy quality
  - Scene renders at 60fps with no stuttering

git_workflow:
  commit_message: |
    feat: implement atmospheric scene with gradient sky and golden hour lighting
    
    - Configure PerspectiveCamera with smooth follow behavior
    - Set up multi-light system (ambient, directional, hemisphere, rim)
    - Create custom shader for sunset gradient sky sphere
    - Implement post-processing with bloom for neon glow
    - Add exponential fog for atmospheric depth
    - Configure shadow mapping for directional light
    
    Visual style: Studio Ghibli-inspired dreamy urban sunset
    Performance: Optimized for 60fps rendering
  
  commands[3]:
    - git add src/Scene.js src/main.js
    - git commit -m "feat: implement atmospheric scene with gradient sky and golden hour lighting\n\n- Configure PerspectiveCamera with smooth follow behavior\n- Set up multi-light system (ambient, directional, hemisphere, rim)\n- Create custom shader for sunset gradient sky sphere\n- Implement post-processing with bloom for neon glow\n- Add exponential fog for atmospheric depth\n- Configure shadow mapping for directional light\n\nVisual style: Studio Ghibli-inspired dreamy urban sunset\nPerformance: Optimized for 60fps rendering"
    - git push origin main

next_task_context:
  focus: Create origami-inspired bird with physics
  scene_ready: Camera and lighting configured
  aesthetic_established: Sunset gradient and golden hour lighting
  performance_baseline: 60fps with scene only
