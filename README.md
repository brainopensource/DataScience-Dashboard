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
npm start
```

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
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── models/       # Data models and schemas
│   │   │   ├── services/     # Business logic
│   │   │   └── utils/        # Utility functions
│   │   ├── data/            # DuckDB database files
│   │   ├── scripts/         # Utility scripts
│   │   └── tests/           # Test suite
│   └── frontend/
│       └── electron-react-app/
│           ├── src/         # React source code
│           └── public/      # Static assets
└──
```

### Adding New Features
1. Define schema in `backend/app/models/schema.py`
2. Create service in `backend/app/services/`
3. Add API endpoints in `backend/app/api/routes/`
4. Update frontend components as needed

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