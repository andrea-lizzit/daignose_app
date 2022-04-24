# TUM.ai Makeathon 2022: Team dAIgnose
This project is the result of the team dAIgnose (team #03) for the 2022 TUM.ai Makeathon. The team members are:
- Ali Oğuz Can
- Dr. Sarah Homberg
- Andrea Lizzit
- Diego Montero
- Diane Tchibozo

## Challenge: Multi-Class Image Classification
Using the ChestX-ray dataset from NIH Clinical Center, create an AI-driven assistant to help primary care physicians diagnose chest diseases in developing countries.

## installation instructions:
clone this repository
install node dependencies with `npm install`
`npm run dev` to run the program in development mode
you can also package it for your system with electron-forge

## usage instructions:
create a dAIgnosis-files directory in your home
each entry in this directory should have the following structure:
`
├── patient_1_Alice
│   ├── description.txt
│   ├── diag
│   └── images
│       └── im1.png
│       └── im2.png
`

where the "images" directory contains medical (X-ray) images for the patient
when you run daignose_app you see the same structure in the "Database" tab
navigate the tree and click on the name of an image
switch to the diagnosis details tab
the application uses daignose_inference to obtain probabilities for each disease and shows them in an interactive plot, with the image beside.
