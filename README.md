# Perspective Grid Generator

A powerful, interactive tool for creating 1-point, 2-point, and 3-point perspective grids. Perfect for artists, designers, and illustrators who need accurate perspective guidelines for their work.

![Perspective Grid Generator](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Interactive Vanishing Points** - Drag and position up to 3 vanishing points anywhere on the canvas
- **Adjustable Horizon Line** - Easily move the horizon to match your composition
- **1, 2, or 3-Point Perspective** - Toggle vanishing points on/off to create different perspective types
- **Customizable Ray Count** - Control the density of perspective lines (1-32 rays)
- **SVG Export** - Download your perspective grid as a scalable SVG file
- **Pan & Zoom Navigation** - Spacebar + drag or middle mouse button to navigate large canvases
- **Snap to Horizon** - Optional magnetic snapping for precise alignment
- **Keyboard Controls** - WASD keys for fine-tuned vanishing point positioning
- **Edge Indicators** - Visual markers show off-screen vanishing points
- **Responsive Design** - Works on any screen size

## Use Cases

- **Digital Art** - Create perspective guides for architectural drawings, cityscapes, and interior scenes
- **Comic & Manga** - Set up accurate backgrounds for sequential art
- **Concept Art** - Quickly generate perspective grids for environment design
- **Education** - Teaching and learning perspective drawing principles

## How to Use

### Basic Controls

**Mouse:**

- **Click & Drag VP** - Move vanishing points
- **Click & Drag Horizon** - Adjust horizon line height
- **Space + Drag** or **Middle Mouse** - Pan the canvas
- **Alt + Drag VP** - Temporarily disable snap-to-horizon

**Keyboard:**

- **W/A/S/D** - Move selected vanishing point (hold Shift for faster movement)
- **Space** - Enable pan mode

### Creating Different Perspectives

**1-Point Perspective:**

1. Toggle off VP1 and VP2 (left and right)
2. Keep VP3 (vertical) on
3. Position the vertical VP on the horizon line

**2-Point Perspective:**

1. Toggle on VP1 and VP2 (left and right)
2. Toggle off VP3 (vertical)
3. Position both VPs on the horizon line
4. Vertical lines will automatically be parallel

**3-Point Perspective:**

1. Toggle on all three vanishing points
2. Position VP1 and VP2 on the horizon
3. Position VP3 above or below the horizon for upward/downward views

### Exporting Your Grid

1. Set up your perspective grid as desired
2. Click the **Export SVG** button
3. The SVG file will download automatically
4. Import into your favorite art software (Photoshop, Illustrator, Procreate, etc.)

## 🛠️ Technical Details

### Built With

- **Vanilla JavaScript** - No frameworks, pure ES6+ modules
- **HTML5 Canvas** - High-performance rendering
- **SVG Export** - Scalable vector output

**Made with ❤️ for artists, by an artist**

If this tool helps your workflow, consider giving it a ⭐ on GitHub!
