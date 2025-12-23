# React Frontend - BeyondChats Article Manager

Phase 3 of the BeyondChats Technical Product Manager Assignment.

## Features

- Modern, responsive UI design
- Article listing with filtering (All, Original, Enhanced)
- Beautiful card-based layout
- Display of article metadata (author, date)
- Reference citations for enhanced articles
- Loading states and error handling
- Mobile-responsive design

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment

The `.env` file should already be configured. If not:

```bash
echo "VITE_API_URL=http://localhost:8000/api" > .env
```

### Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Features Showcase

### Filtering
- **All Articles**: Shows all articles (original + enhanced)
- **Original**: Shows only original articles
- **Enhanced**: Shows only AI-enhanced articles with references

### Article Cards
- Badge indicating article type (Original or Enhanced)
- Title and metadata (author, date)
- Content preview
- Link to original article
- References section (for enhanced articles)

### Responsive Design
- Adapts to mobile, tablet, and desktop screens
- Touch-friendly interface
- Optimized for all device sizes

## Technologies Used

- React 18
- Vite 7
- Modern CSS (Grid, Flexbox)
- Fetch API for HTTP requests

## UI Preview

![BeyondChats Article Manager](https://github.com/user-attachments/assets/13a8d798-57f5-4338-9660-2821d53c2eb7)

## Project Structure

```
react-frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styling
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/
│   └── vite.svg         # Static assets
├── index.html           # HTML template
└── vite.config.js       # Vite configuration
```

## API Integration

The frontend connects to the Laravel backend API at `http://localhost:8000/api` by default.

Endpoints used:
- `GET /api/articles` - Fetch all articles
- Displays both original and enhanced articles
- Filters articles based on `is_updated` field
