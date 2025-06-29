
# Backend Integration Guide

This project is structured to be easily integrated with a backend API. Here's how to connect it:

## Environment Variables

Create a `.env` file in your project root with:

```env
VITE_SITE_NAME="Your Site Name"
VITE_SITE_TITLE="Your Site Tagline"
VITE_PAGE_TITLE="Your Page Title"
VITE_API_URL="http://your-backend-url/api"
VITE_RADIUS_SERVER="127.0.0.1"
```

## Required Backend Endpoints

### Authentication
- `POST /auth/admin/login` - Admin login
- `POST /auth/voucher/login` - Voucher authentication
- `POST /auth/member/login` - Member authentication

### Voucher Management
- `GET /vouchers` - List all vouchers
- `POST /vouchers` - Create new vouchers
- `DELETE /vouchers/:id` - Delete voucher

### Member Management
- `GET /members` - List all members
- `POST /members` - Create new member
- `PUT /members/:id` - Update member
- `DELETE /members/:id` - Delete member

### Settings
- `GET /settings/site` - Get site settings
- `PUT /settings/site` - Update site settings
- `GET /settings/banner` - Get banner settings
- `PUT /settings/banner` - Update banner settings

### File Upload
- `POST /upload/banner` - Upload banner image

## API Response Format

All endpoints should return responses in this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

For errors:

```json
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly error message"
}
```

## Database Schema

### Vouchers Table
```sql
CREATE TABLE vouchers (
  id VARCHAR(36) PRIMARY KEY,
  code VARCHAR(5) UNIQUE NOT NULL,
  type VARCHAR(10) NOT NULL,
  duration INT NOT NULL,
  price INT NOT NULL,
  status ENUM('active', 'used', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  used_at TIMESTAMP NULL,
  user_id VARCHAR(36) NULL
);
```

### Members Table
```sql
CREATE TABLE members (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  package VARCHAR(20) NOT NULL,
  status ENUM('active', 'suspended', 'expired') DEFAULT 'active',
  expiry_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Settings Table
```sql
CREATE TABLE settings (
  key VARCHAR(50) PRIMARY KEY,
  value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Integration with FreeRADIUS

For captive portal functionality, integrate with FreeRADIUS:

1. Configure FreeRADIUS to use MySQL/PostgreSQL backend
2. Set up radcheck, radreply, and radacct tables
3. Implement voucher and member authentication in your backend
4. Use RADIUS clients to authenticate users

## Frontend Fallbacks

The frontend includes localStorage fallbacks for:
- Site settings
- Banner settings
- Basic functionality when backend is unavailable

This ensures the system remains functional during development or temporary backend issues.

## Production Deployment

1. Set up your backend API server
2. Configure environment variables
3. Set up database with proper schemas
4. Configure FreeRADIUS integration
5. Set up file upload handling for banner images
6. Configure CORS for your frontend domain
7. Set up SSL certificates for secure connections

## Development Mode

The system works without a backend for development:
- Settings are stored in localStorage
- Mock data is used for testing
- All functionality remains accessible for UI development
