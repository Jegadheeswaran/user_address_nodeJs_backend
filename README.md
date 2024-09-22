# User Address Node.js Backend

This is a Node.js backend application that allows users to register with their name and addresses. It uses PostgreSQL as the database and is built with TypeScript.

## Technologies

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Zod (for validation)
- dotenv (for environment variables)
- CORS (for cross-origin requests)

## Steps to run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jegadheeswaran/user_address_nodeJs_backend.git
2. **Navigate to the project directory:**
3. **Install dependencies:**
   ```bash
   npm install
4. **Create a .env file from .env.example file:**
   ```bash
   cp .env.example .env
5. **Set up your environment variables:**
6. **Compile the TypeScript files:**
   ```bash
   npx tsc
7. **Run database migrations**
   ```bash
   node dist/migration/createTable.js
8. **Run the application:**
   ```bash
   node src/index.js
