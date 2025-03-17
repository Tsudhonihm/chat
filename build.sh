#!/bin/bash

# Exit immediately if any command fails
set -e

# Step 1: Install pyenv to manage Python versions
echo "Installing pyenv..."
curl https://pyenv.run | bash

# Add pyenv to PATH
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# Step 2: Install Python 3.9.18
echo "Installing Python 3.9.18..."
pyenv install 3.9.18
pyenv global 3.9.18

# Step 3: Verify Python version
echo "Python version:"
python --version

# Step 4: Build the frontend
echo "Building frontend..."
if [ ! -d "frontend" ]; then
  echo "Error: 'frontend' directory not found. Please ensure the directory exists."
  exit 1
fi

cd frontend
npm install
npm run build
cd ..

# Step 5: Install Python dependencies for the backend
echo "Installing backend dependencies..."
if [ ! -d "backend" ]; then
  echo "Error: 'backend' directory not found. Please ensure the directory exists."
  exit 1
fi

cd backend
pip install -r requirements.txt

# Step 6: Start the Flask backend in the background (optional for Netlify)
echo "Starting Flask backend..."
python3 -m flask run --port=3000 &
