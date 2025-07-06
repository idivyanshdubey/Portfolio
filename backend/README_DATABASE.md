# Database Setup for AI Portfolio Backend

This guide will help you set up PostgreSQL for the AI Portfolio backend.

## Prerequisites

1. **PostgreSQL installed and running**
   - Download from: https://www.postgresql.org/download/
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

2. **Python dependencies installed**
   ```bash
   pip install -r requirements.txt
   ```

## Database Configuration

### 1. Create Environment File

Copy the example environment file and configure your database settings:

```bash
cp env.example .env
```

Edit `.env` file with your PostgreSQL credentials:

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_portfolio
DB_USER=postgres
DB_PASSWORD=postgres
```

### 2. Create Database

Connect to PostgreSQL and create the database:

```sql
-- Connect to PostgreSQL as postgres user
psql -U postgres

-- Create database
CREATE DATABASE ai_portfolio;

-- Verify database exists
\l

-- Exit psql
\q
```

### 3. Initialize Database Tables

Run the database initialization script:

```bash
python init_db.py
```

This will:
- Test the database connection
- Create all necessary tables
- Log the results

### 4. Verify Setup

Start the FastAPI server:

```bash
python main.py
```

Check the database health endpoint:
```bash
curl http://localhost:8000/api/health/db
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

## Database Models

The application includes the following models:

### Project Model
- `id`: Primary key
- `title`: Project title
- `description`: Project description
- `image_url`: Project image URL
- `github_url`: GitHub repository URL
- `live_url`: Live demo URL
- `technologies`: Array of technologies used
- `category`: Project category
- `featured`: Whether project is featured
- `metadata`: Additional JSON data

### Blog Post Model
- `id`: Primary key
- `title`: Post title
- `content`: Post content
- `excerpt`: Post excerpt
- `slug`: URL slug
- `author`: Author name
- `tags`: Array of tags
- `featured_image`: Featured image URL
- `published`: Publication status
- `metadata`: Additional JSON data

### Chat Models
- `ChatSession`: Chat session information
- `ChatMessage`: Individual chat messages

## Troubleshooting

### Connection Issues

1. **Check PostgreSQL is running:**
   ```bash
   # Windows
   net start postgresql-x64-15
   
   # Linux/Mac
   sudo systemctl status postgresql
   ```

2. **Verify credentials:**
   ```bash
   psql -U postgres -h localhost -p 5432 -d ai_portfolio
   ```

3. **Check firewall settings** (if using remote database)

### Common Errors

1. **"password authentication failed"**
   - Verify username/password in `.env`
   - Check PostgreSQL authentication settings

2. **"connection refused"**
   - Ensure PostgreSQL is running
   - Check host/port settings

3. **"database does not exist"**
   - Create the database: `CREATE DATABASE ai_portfolio;`

### Reset Database

To reset the database:

```sql
-- Drop and recreate database
DROP DATABASE ai_portfolio;
CREATE DATABASE ai_portfolio;
```

Then run:
```bash
python init_db.py
```

## Development

### Adding New Models

1. Create model file in `models/` directory
2. Import model in `database.py` init_db function
3. Run `python init_db.py` to create new tables

### Database Migrations

For production, consider using Alembic for database migrations:

```bash
# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Add new model"

# Apply migration
alembic upgrade head
```

## Production Notes

1. **Change default passwords** in production
2. **Use environment variables** for sensitive data
3. **Enable SSL** for database connections
4. **Set up proper backup** procedures
5. **Configure connection pooling** for high traffic 