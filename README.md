# Pong Game 🎮

A classic Pong game built with HTML, CSS, and JavaScript. Play against a computer AI opponent with smooth gameplay and realistic physics.

## Features

✅ **Player vs Computer**: Control the left paddle while the computer controls the right
✅ **Multiple Control Options**: 
  - Move mouse up/down to control paddle
  - Use Arrow Keys (Up/Down) for precise control
✅ **Intelligent AI**: Computer opponent tracks the ball with intelligent prediction
✅ **Realistic Physics**: 
  - Ball bounces off walls
  - Paddle collision with spin effect
  - Ball speed increases based on hit position
✅ **Real-time Scoreboard**: Track your score and computer's score
✅ **Game Controls**:
  - **Space Bar**: Start/Pause game
  - **R Key**: Reset game and scores
✅ **Neon Styling**: Modern dark theme with glowing green paddles and yellow ball

## How to Play

1. Open `index.html` in your web browser
2. Press **Space** to start the game
3. Move your left paddle using:
   - **Mouse Y-position** OR
   - **Arrow Keys (Up/Down)** OR
   - **W/S keys**
4. Score points by getting the ball past the computer's paddle
5. Press **Space** to pause/resume
6. Press **R** to reset the game

## Game Rules

- The ball bounces off the top and bottom walls
- The ball bounces off both paddles with variable angles based on hit position
- Score a point when the ball passes your opponent's paddle
- First player to a certain score wins (or play indefinitely!)

## Files

- **index.html** - Game structure and canvas element
- **style.css** - Styling with neon theme
- **script.js** - Game logic, physics, and AI

## Game Mechanics

### Ball Physics
- Ball moves with constant velocity until hitting walls or paddles
- Hitting near the edge of a paddle creates a steeper angle
- Hitting the center creates a flatter angle
- Ball bounces off top/bottom walls

### Computer AI
- Tracks the ball's Y position
- Moves toward the ball with a 5 pixel/frame speed
- Leaves a small dead zone (±35 pixels) for more realistic gameplay

### Collision Detection
- Rectangle-circle collision for paddle hits
- Rectangle collision for wall bounces
- Accurate ball positioning to prevent tunneling

## Difficulty

The computer AI is calibrated for a balanced, challenging game. You can adjust the difficulty by modifying these values in `script.js`:

- `computer.speed` - Change from 5 to make AI faster/slower
- The dead zone in `updateComputerMovement()` - Adjust ±35 value

## Browser Compatibility

Works on all modern browsers supporting:
- HTML5 Canvas
- ES6 JavaScript
- CSS3

## Future Enhancements

- [ ] Difficulty levels
- [ ] Sound effects
- [ ] Ball trail effect
- [ ] Paddle trail effect
- [ ] Two-player mode
- [ ] Power-ups
- [ ] Leaderboard

## License

Free to use and modify!

---

**Enjoy the game! 🏓**