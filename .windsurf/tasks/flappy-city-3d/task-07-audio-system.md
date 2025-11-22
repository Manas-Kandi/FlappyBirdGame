# Task 07: Audio System with Spatial Sound & Music

context_from_previous_tasks:
  game_complete: All core mechanics functional
  controls_ready: Input system with haptic feedback
  aesthetic_established: Japanese-inspired neon city at sunset
  performance_optimized: 60fps on mobile and desktop

audio_philosophy:
  inspiration: Jet Set Radio meets Persona 5 soundscapes
  music_style: Lo-fi hip hop with Japanese city pop influences
  sound_design: Crisp, satisfying, arcade-like feedback
  spatial_audio: 3D positioned sounds for immersion
  mixing: Balanced levels that enhance without overwhelming

audio_architecture:
  web_audio_api: Use native Web Audio API for performance
  audio_context: Single shared AudioContext
  sound_categories[3]:
    - sfx: Short sound effects (flap, score, collision)
    - music: Background music loop
    - ambient: City ambience and wind sounds
  
  volume_controls:
    master_volume: 0.7
    music_volume: 0.6
    sfx_volume: 0.8
    ambient_volume: 0.3

sound_effects_specification[5]:
  flap:
    description: Crisp whoosh sound
    technique: Synthesized or short sample
    duration: 0.1s
    pitch_variation: ±2 semitones per flap
    spatial: Positioned at bird location
    fallback: Simple oscillator sweep
  
  score:
    description: Bright chime or bell
    technique: Synthesized bell tone
    duration: 0.3s
    pitch: High frequency (800-1200Hz)
    spatial: Positioned at passed building
    fallback: Simple sine wave tone
  
  collision:
    description: Deep impact with reverb
    technique: Noise burst with filter
    duration: 0.5s
    pitch: Low frequency (100-200Hz)
    spatial: Positioned at collision point
    fallback: Noise burst
  
  menu_select:
    description: Soft click or beep
    technique: Short sine wave
    duration: 0.05s
    pitch: Medium frequency (400Hz)
    spatial: Non-spatial (UI sound)
    fallback: Simple beep
  
  ambient_wind:
    description: Gentle wind whoosh
    technique: Filtered noise loop
    duration: Loop continuously
    volume: Very low (0.2)
    spatial: Non-spatial background
    fallback: Optional, can omit

music_system:
  background_music:
    style: Lo-fi hip hop instrumental
    tempo: 85-95 BPM
    mood: Chill, dreamy, nostalgic
    structure: Seamless loop
    duration: 60-120 seconds
  
  implementation_options[2]:
    option_1_synthesized:
      approach: Generate music with Tone.js or Web Audio
      pros: No file loading, procedural variation
      cons: More complex implementation
    
    option_2_sample:
      approach: Use royalty-free lo-fi track
      pros: Professional sound, simple implementation
      cons: File size and loading time
      recommended: Use option 2 for time efficiency
  
  music_states:
    MENU:
      volume: 0.6
      filter: None
      loop: true
    
    PLAYING:
      volume: 0.5
      filter: Slight low-pass (focus on gameplay)
      loop: true
    
    GAME_OVER:
      volume: 0.3
      filter: Heavy low-pass (muffled)
      fade_out: 2 seconds

spatial_audio_implementation:
  positional_audio:
    technique: Web Audio PannerNode
    distance_model: inverse
    ref_distance: 5
    max_distance: 50
    rolloff_factor: 1
  
  listener_setup:
    position: Camera position
    orientation: Camera forward vector
    update_frequency: Every frame
  
  sound_positioning[3]:
    flap_sound:
      - Position at bird.position
      - Update position if bird moves during sound
    
    score_sound:
      - Position at building center that was passed
      - Static position (building doesn't move after pass)
    
    collision_sound:
      - Position at collision point
      - Static position

audio_manager_class_structure:
  constructor:
    parameters: camera
    initialize[5]:
      - Create AudioContext
      - Create AudioListener attached to camera
      - Load sound buffers
      - Create sound pools for reuse
      - Set up volume controls
  
  properties:
    context: AudioContext
    listener: AudioListener
    sounds: Map of loaded AudioBuffers
    music_source: AudioBufferSourceNode
    is_muted: boolean
    volumes: Object with category volumes
  
  methods[10]:
    loadSound(name, url):
      purpose: Load audio file into buffer
      behavior:
        - Fetch audio file
        - Decode with AudioContext
        - Store in sounds Map
      fallback: Generate synthetic sound if load fails
    
    playSound(name, position, options):
      purpose: Play sound effect with spatial positioning
      parameters:
        name: Sound identifier
        position: Vector3 or null for non-spatial
        options: { volume, pitch, loop }
      
      implementation:
        - Get sound buffer from Map
        - Create AudioBufferSourceNode
        - Create PannerNode if position provided
        - Connect nodes: source -> panner -> destination
        - Apply volume and pitch
        - Start playback
    
    playMusic(loop):
      purpose: Start background music
      behavior:
        - Stop current music if playing
        - Create new source node
        - Set loop property
        - Connect to destination with gain node
        - Start playback
    
    stopMusic(fadeOut):
      purpose: Stop music with optional fade
      behavior:
        - If fadeOut, animate gain to 0
        - Stop source after fade
        - Disconnect nodes
    
    setMusicVolume(volume):
      purpose: Adjust music volume
      behavior: Update gain node value
    
    setSFXVolume(volume):
      purpose: Adjust sound effects volume
      behavior: Update sfx gain node value
    
    mute():
      purpose: Mute all audio
      behavior: Set master gain to 0
    
    unmute():
      purpose: Unmute all audio
      behavior: Restore master gain
    
    synthesizeFlap():
      purpose: Generate flap sound procedurally
      technique:
        - Create OscillatorNode
        - Frequency sweep 200Hz -> 400Hz
        - Quick attack/decay envelope
        - Duration 0.1s
    
    synthesizeScore():
      purpose: Generate score sound procedurally
      technique:
        - Create OscillatorNode (sine wave)
        - Frequency 1000Hz
        - Bell-like envelope (fast attack, slow decay)
        - Duration 0.3s

sound_generation_fallbacks:
  flap_synthesis:
    oscillator_type: sawtooth
    frequency_start: 200
    frequency_end: 400
    duration: 0.1
    envelope: [0, 1, 0.05, 0.3, 0.1, 0]
  
  score_synthesis:
    oscillator_type: sine
    frequency: 1000
    duration: 0.3
    envelope: [0, 1, 0.01, 0.8, 0.29, 0]
  
  collision_synthesis:
    noise_type: white
    filter_frequency: 200
    filter_type: lowpass
    duration: 0.5
    envelope: [0, 1, 0.02, 0.3, 0.48, 0]

audio_integration_points:
  bird_flap:
    trigger: bird.flap() called
    sound: playSound('flap', bird.position, { pitch: random(0.9, 1.1) })
  
  score_increment:
    trigger: gameState.incrementScore()
    sound: playSound('score', buildingPosition, { volume: 0.8 })
  
  collision:
    trigger: gameState.setState('GAME_OVER')
    sound: playSound('collision', bird.position, { volume: 1.0 })
  
  menu_start:
    trigger: gameState.setState('PLAYING')
    sound: playSound('menu_select')
    music: Fade music to playing volume
  
  game_over:
    trigger: gameState.setState('GAME_OVER')
    music: Fade music out over 2 seconds

user_preferences:
  local_storage:
    key: flappy_city_audio_settings
    properties:
      music_enabled: boolean
      sfx_enabled: boolean
      master_volume: number (0-1)
  
  ui_controls:
    location: Settings menu or pause screen
    controls[3]:
      - Music toggle button
      - SFX toggle button
      - Master volume slider
  
  persistence:
    - Load settings on game init
    - Save settings on change
    - Apply settings immediately

performance_considerations[4]:
  - Limit concurrent sounds (max 8 simultaneous)
  - Use sound pooling for frequently played sounds
  - Dispose of finished sound nodes immediately
  - Compress audio files (use MP3 or OGG)

browser_compatibility:
  audio_context_creation:
    - Check for AudioContext or webkitAudioContext
    - Handle autoplay restrictions
    - Resume context on first user interaction
  
  format_support:
    primary: MP3 (universal support)
    fallback: OGG (better quality, smaller size)
    detection: Use canPlayType() to check support

testing_criteria[7]:
  - Flap sound plays on each flap with pitch variation
  - Score sound plays when passing building
  - Collision sound plays on game over
  - Music loops seamlessly without gaps
  - Spatial audio positions sounds correctly in 3D space
  - Volume controls work for all sound categories
  - Audio settings persist across sessions

git_workflow:
  commit_message: |
    feat: implement spatial audio system with lo-fi music
    
    - Create AudioManager class with Web Audio API
    - Implement spatial audio using PannerNode for 3D positioning
    - Generate procedural sound effects (flap, score, collision)
    - Add lo-fi hip hop background music with seamless looping
    - Build volume controls for music, SFX, and master
    - Implement audio settings persistence with localStorage
    - Add mute/unmute functionality
    - Handle browser autoplay restrictions gracefully
    - Optimize with sound pooling and concurrent sound limiting
    
    Audio style: Lo-fi hip hop meets Persona 5 soundscapes
    Spatial audio: 3D positioned sounds for immersion
    Performance: Efficient sound pooling and node cleanup
    Accessibility: Volume controls and mute option
  
  commands[3]:
    - git add src/AudioManager.js src/main.js
    - git commit -m "feat: implement spatial audio system with lo-fi music\n\n- Create AudioManager class with Web Audio API\n- Implement spatial audio using PannerNode for 3D positioning\n- Generate procedural sound effects (flap, score, collision)\n- Add lo-fi hip hop background music with seamless looping\n- Build volume controls for music, SFX, and master\n- Implement audio settings persistence with localStorage\n- Add mute/unmute functionality\n- Handle browser autoplay restrictions gracefully\n- Optimize with sound pooling and concurrent sound limiting\n\nAudio style: Lo-fi hip hop meets Persona 5 soundscapes\nSpatial audio: 3D positioned sounds for immersion\nPerformance: Efficient sound pooling and node cleanup\nAccessibility: Volume controls and mute option"
    - git push origin main

next_task_context:
  focus: Final polish, particle effects, and deployment
  audio_complete: Spatial sound and music system active
  game_functional: All mechanics working with audio feedback
  ready_for_polish: Core game complete, ready for visual enhancements
