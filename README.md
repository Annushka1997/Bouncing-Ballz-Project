# Bouncing Ballz Project 

This project creates an interactive canvas where users can add circles that fall under the influence of gravity, and bounce off the bottom edge of the canvas. Each circle has customizable colors and shadow effects.

# Features

 1. Circle Creation: Click on the canvas to create a new circle.
 2. Color Customization: Select colors for the circle and its shadow.
 3. Gravity and Bouncing: Circles fall and bounce off the bottom edge of the canvas with damping.
 4. Clear Circles: Button to clear all circles from the canvas.
 5. Background Animation: Dynamic background with animated color boxes.

# Installation

1. Clone the repository:

https://github.com/Annushka1997/Bouncing-Ballz-Project

2. Open index.html in your browser.

# Usage

 1. Initialize Background Animation: Automatically starts when the page is loaded.
 2. Create Circles: Click on the canvas area to create a new circle. You can create up to 15 circles.
 3. Customize Circle and Shadow Colors: Use the provided controls to select colors.
 4. Clear Circles: Click the "Clear Circles" button to remove all circles.

# Code Overview 

## Main Functions

 1. initializeBackgroundAnimation: Creates a background animation with moving color boxes.
 2. initializeCanvas: Sets up the canvas and handles click events for creating circles.
 3. initializeControls: Sets up event listeners for the clear button.
 4. createCircle: Creates a new circle with specified properties and adds it to the array.
 5. updateCircleCount: Updates the display of the current number of circles.
 6. tick: The main animation loop that updates and draws the circles.
 7. updateCircles: Updates the position and velocity of each circle.
 8. drawCircles: Renders the circles on the canvas.
 9. getRandomColor: Generates a random color string.
