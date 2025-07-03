# node-factory-pattern-boilerplate
�� Node.js API Boilerplate with Factory Pattern


## �� Architecture

This boilerplate follows the **Factory Pattern** and **Layered Architecture**:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and orchestrate operations
- **Repositories**: Manage data access and database operations
- **Models**: Define database schemas and data structures
- **DTOs**: Ensure type safety for data validation
- **Factories**: Create and configure service instances

## 🔐 Authentication

The API includes JWT-based authentication with:

- **Access Tokens**: Short-lived tokens for API access (1 hour)
- **Refresh Tokens**: Long-lived tokens for token renewal (7 days)
- **Password Encryption**: PBKDF2 with salt generation
- **Protected Routes**: Middleware-based route protection

### API Endpoints

#### Public Routes
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token

#### Protected Routes
- `GET /api/v1/users` - Get user profile
- `PUT /api/v1/users` - Update user profile
- `DELETE /api/v1/users` - Delete user account

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload

### Adding New Features

1. **Create a new model** in `src/models/`
2. **Add repository** in `src/repositories/`
3. **Create service** in `src/services/`
4. **Add controller** in `src/controllers/`
5. **Define routes** in `src/routes/`
6. **Update factory** in `src/utils/factory/`

## 🔒 Security Features

- JWT token authentication
- Password hashing with PBKDF2
- CORS configuration
- Input validation with DTOs
- Environment variable management

## 📦 Dependencies

### Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT implementation
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### Development Dependencies
- `typescript` - Type safety
- `nodemon` - Development server with hot reload
- `ts-node-dev` - TypeScript execution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Coding! ��**
