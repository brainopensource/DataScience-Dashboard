# React FastAPI Production Data Platform

A modern, full-stack application for managing and analyzing oil and gas production data. Built with React, FastAPI, and DuckDB for efficient data processing and storage.

## 🌟 Features

- **Real-time Data Sync**: Automated synchronization with external production data sources
- **Efficient Data Storage**: DuckDB-based storage system optimized for analytical queries
- **Dynamic Schema Management**: Flexible table definitions with support for multiple data types
- **Advanced Querying**: Powerful filtering, aggregation, and data analysis capabilities
- **Modern UI**: React-based frontend with Electron for desktop deployment
- **RESTful API**: FastAPI backend with comprehensive endpoint documentation

## 🏗 Architecture

### Backend (`/backend`)
- **FastAPI**: Modern, fast web framework for building APIs
- **DuckDB**: Embedded analytical database for efficient data processing
- **Dynamic Schema System**: Flexible table management with Pydantic models
- **Batch Processing**: Efficient data handling with configurable batch sizes
- **Async Operations**: Non-blocking I/O for better performance

### Frontend (`/frontend/electron-react-app`)
- **React**: Modern UI framework
- **Electron**: Desktop application wrapper
- **TypeScript**: Type-safe development
- **Material-UI**: Modern component library

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Windows OS (for Windows-specific builds)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend Setup
```bash
cd frontend/electron-react-app
npm install
```

### Running the Application

#### Development Mode
1. Start the backend server (from the backend directory):
```bash
python run.py
```

2. In a new terminal, start the frontend development server (from the frontend/electron-react-app directory):
```bash
# Start Electron in development mode
npm run electron:dev
```

#### Building the Application

##### Windows Build
To build the Windows executable:

1. Ensure all dependencies are installed:
```bash
cd frontend/electron-react-app
npm install
```

2. Build the application:
```bash
# Build the React application
npm run build

# Package the application for Windows
npm run package:win
```

The packaged application will be available in the `frontend/electron-react-app/release` directory.

##### Development and Build Commands
```bash
# Development
npm run electron:dev    # Start Electron in development mode
npm run start          # Start React development server
npm run test          # Run tests

# Building
npm run build         # Build React application
npm run package:win   # Package for Windows
npm run make         # Create distributables

# Combined commands (Windows)
cmd /k "npm run electron:dev"  # Start development
cmd /k "npm run package:win"   # Package for Windows
cmd /k "npm run build"         # Build React app
```

### Application Structure
- Development files: `frontend/electron-react-app/src/`
- Build output: `frontend/electron-react-app/build/`
- Package output: `frontend/electron-react-app/release/`
- Electron main process: `frontend/electron-react-app/electron/`

### Troubleshooting

#### Common Issues
1. **Port Conflicts**
   - Backend runs on port 8000
   - React dev server runs on port 3000
   - Ensure these ports are available

2. **Build Errors**
   - Clear the `build` and `release` directories
   - Run `npm install` to ensure dependencies are up to date
   - Check Node.js version compatibility

3. **Electron Issues**
   - Ensure all native dependencies are properly installed
   - Check Windows build tools are installed
   - Verify Python environment is properly set up

#### Development Tips
- Use `npm run electron:dev` for hot-reloading during development
- The backend must be running for the application to work
- Check the console for detailed error messages
- Use the React Developer Tools in Electron for debugging

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Key Endpoints
- `POST /sync-data`: Synchronize production data
- `GET /query`: Query production data with filters
- `POST /aggregate`: Aggregate production data
- `GET /wells`: Query well production data

## 🛠 Development

### Project Structure
```
react-fastapi/
├── backend/                      # Backend FastAPI application
│   ├── app/
│   │   ├── api/                 # API routes and endpoints
│   │   │   ├── routes/         # Route definitions
│   │   │   └── dependencies.py # Shared API dependencies
│   │   ├── models/             # Data models and schemas
│   │   │   ├── schema.py      # Table schemas and definitions
│   │   │   └── pydantic.py    # Pydantic models for validation
│   │   ├── services/          # Business logic layer
│   │   │   ├── database_service.py    # Database operations
│   │   │   └── production_service.py  # Production data logic
│   │   ├── utils/             # Utility functions
│   │   │   ├── odata.py       # OData client utilities
│   │   │   └── helpers.py     # Helper functions
│   │   └── main.py            # FastAPI application entry
│   ├── data/                  # Data storage
│   │   └── anp_production.duckdb  # DuckDB database file
│   ├── scripts/               # Utility scripts
│   │   ├── test_endpoints.py  # API testing scripts
│   │   └── setup_back.bat     # Windows setup script
│   ├── tests/                 # Test suite
│   │   ├── conftest.py        # Test configuration
│   │   └── test_*.py         # Test modules
│   ├── requirements.txt       # Python dependencies
│   └── run.py                # Application runner
│
└── frontend/                  # Frontend React application
    └── electron-react-app/    # Electron + React application
        ├── src/
        │   ├── components/    # Reusable React components
        │   │   ├── common/    # Shared components
        │   │   ├── charts/    # Data visualization
        │   │   └── forms/     # Form components
        │   ├── hooks/        # Custom React hooks
        │   ├── pages/        # Page components
        │   │   ├── Dashboard/
        │   │   ├── Production/
        │   │   └── Wells/
        │   ├── services/     # API and business logic
        │   │   ├── api.ts    # API client
        │   │   └── store.ts  # State management
        │   ├── styles/       # Global styles and themes
        │   │   ├── theme.ts  # Material-UI theme
        │   │   └── global.css
        │   ├── types/        # TypeScript type definitions
        │   ├── utils/        # Utility functions
        │   ├── App.tsx       # Root component
        │   └── main.tsx      # Application entry
        ├── public/           # Static assets
        │   ├── icons/        # Application icons
        │   └── index.html    # HTML template
        ├── electron/         # Electron specific code
        │   ├── main.ts       # Main process
        │   └── preload.ts    # Preload scripts
        ├── package.json      # NPM dependencies
        ├── tsconfig.json     # TypeScript configuration
        ├── vite.config.ts    # Vite configuration
        └── .env             # Environment variables
```

### Key Directories Explained

#### Backend
- `app/api/`: Contains all API route definitions and endpoint handlers
- `app/models/`: Defines data schemas and validation models
- `app/services/`: Implements business logic and database operations
- `app/utils/`: Houses utility functions and helper modules
- `data/`: Stores the DuckDB database file and other data assets
- `scripts/`: Contains utility scripts for testing and setup
- `tests/`: Houses the test suite and test configurations

#### Frontend
- `src/components/`: Reusable React components organized by feature
- `src/hooks/`: Custom React hooks for shared logic
- `src/pages/`: Page-level components for different routes
- `src/services/`: API clients and state management
- `src/styles/`: Global styles and Material-UI theme configuration
- `src/types/`: TypeScript type definitions
- `electron/`: Electron-specific code for desktop functionality
- `public/`: Static assets and HTML template

### Adding New Features
1. **Backend**:
   - Define schema in `backend/app/models/schema.py`
   - Create service in `backend/app/services/`
   - Add API endpoints in `backend/app/api/routes/`
   - Add tests in `backend/tests/`

2. **Frontend**:
   - Create components in `frontend/electron-react-app/src/components/`
   - Add pages in `frontend/electron-react-app/src/pages/`
   - Define types in `frontend/electron-react-app/src/types/`
   - Add API services in `frontend/electron-react-app/src/services/`
   - Update theme in `frontend/electron-react-app/src/styles/theme.ts`

## 📊 Data Model

### Production Data
- Field-level monthly production
- Oil and gas production metrics
- Timestamp-based tracking
- Composite primary keys for data integrity

### Well Data
- Well-level daily production
- Multiple production metrics
- Field relationships
- Temporal data management

## 🔒 Security

- Environment-based configuration
- API key authentication (planned)
- CORS protection
- Input validation
- SQL injection prevention

## 🧪 Testing

```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend/electron-react-app
npm test
```

## 📈 Performance

- Batch processing for large datasets
- Efficient indexing
- Async operations
- Optimized queries
- Memory-efficient data handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team. 