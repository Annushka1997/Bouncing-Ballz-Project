# Bouncing Ballz Project 

This project creates an interactive canvas where users can add circles that fall under the influence of gravity, and bounce off the bottom edge of the canvas. Each circle has customizable colors and shadow effects.

# Features

## Circle Creation: Click on the canvas to create a new circle.
## Color Customization: Select colors for the circle and its shadow.
## Gravity and Bouncing: Circles fall and bounce off the bottom edge of the canvas with damping.
## Clear Circles: Button to clear all circles from the canvas.
## Background Animation: Dynamic background with animated color boxes.

# Installation

1. Clone the repository:

https://github.com/Annushka1997/Bouncing-Ballz-Project

2. Open index.html in your browser.

# Usage

## Initialize Background Animation: Automatically starts when the page is loaded.
## Create Circles: Click on the canvas area to create a new circle. You can create up to 15 circles.
## Customize Circle and Shadow Colors: Use the provided controls to select colors.
## Clear Circles: Click the "Clear Circles" button to remove all circles.

# Code Overview 

# Main Functions

## initializeBackgroundAnimation: Creates a background animation with moving color boxes.
## initializeCanvas: Sets up the canvas and handles click events for creating circles.
## initializeControls: Sets up event listeners for the clear button.
## createCircle: Creates a new circle with specified properties and adds it to the array.
## updateCircleCount: Updates the display of the current number of circles.
## tick: The main animation loop that updates and draws the circles.
## updateCircles: Updates the position and velocity of each circle.
## drawCircles: Renders the circles on the canvas.
## getRandomColor: Generates a random color string.
