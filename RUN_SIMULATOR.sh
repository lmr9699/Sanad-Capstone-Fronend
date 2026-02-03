#!/bin/bash

# SANAD App - Run in Simulator Script
# This script will start the app in the iOS or Android simulator

echo "🚀 Starting SANAD App..."
echo ""

# Navigate to project directory
cd /Users/ajayeb/Desktop/Sanad-Capstone-Fronend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Fix Expo dependencies
echo "🔧 Fixing Expo dependencies..."
npx expo install --fix
echo ""

# Ask user which simulator to use
echo "Which simulator would you like to use?"
echo "1) iOS Simulator"
echo "2) Android Emulator"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "🍎 Starting iOS Simulator..."
        npm run ios
        ;;
    2)
        echo "🤖 Starting Android Emulator..."
        npm run android
        ;;
    *)
        echo "Starting Expo development server (you can choose manually)..."
        npm start
        ;;
esac

echo ""
echo "✅ Done! The app should be starting in the simulator."
