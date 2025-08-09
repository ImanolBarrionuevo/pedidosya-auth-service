# PedidosYa Auth Service

## 📝 Description
Microservice that handles user authentication and authorization within the PedidosYa system. Built with NestJS and TypeScript, it provides secure login, JWT token issuance, and role-based access control.

## 🧩 Features
- Secure user login with hashed credentials.
- JWT token generation and validation.
- Role-based access control (RBAC).
- Middleware for protecting routes and verifying user identity.
- Centralized error handling and input validation.

## 🗃️ Database Schema

The following schema defines how authentication-related data is structured:

<p align="center">
  <img src="/der/der.png" width="400" alt="Auth Entity Relationship Diagram">
</p>

The schema above represents the relational model implemented by this service to manage users, roles, and permissions efficiently and securely:

**Entities:**
- **Users**: Stores login credentials and basic identity data. Each user is assigned a single role.
- **Roles**: Defines access levels and permissions within the system.
- **Permissions**: Represents specific actions or access rights.
- **RolePermissions**: Junction table linking roles to permissions (many-to-many).

**Relationships:**
- Each **User** has one **Role**.
- Each **Role** can have zero or many **Permissions**.
- Each **Permission** can be assigned to multiple **Roles**.
- The many-to-many relationship between **Roles** and **Permissions** is managed via the **RolePermissions** table.

## ⚙️ Tech Stack

- **Backend Framework:** NestJS
- **Language:** TypeScript
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Database:** PostgreSQL

## 🚀 Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run start:dev
   ```

3. (Optional) Set up environment variables in a .env file if required.

## 🧪 Testing

To execute unit tests:

   ```bash
   npm run test
   ```

## 🔗 Related Repositories

- 🧍‍♂️ [Person Service](https://github.com/ImanolBarrionuevo/pedidosya-person-service): Manages user personal data and location hierarchy.
- 🖥️ [User UI](https://github.com/ImanolBarrionuevo/pedidosya-user-ui): Frontend interface for user interaction.

## 👨‍💻 Credits

This project was collaboratively developed by Group G as part of the Software Development course at UTN FRVM. All members contributed equally to planning, implementation, and documentation.

**Team Members:**
- [@ImanolBarrionuevo](https://github.com/ImanolBarrionuevo)
- [@tomigambino](https://github.com/tomigambino)
- [@gabrieldiaz8](https://github.com/gabrieldiaz8)
- [@MateoBroilo](https://github.com/MateoBroilo)
- [@LolitoGlezz](https://github.com/LolitoGlezz)
