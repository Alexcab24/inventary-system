# 📦 Inventory System

A modern and comprehensive inventory management system built with Next.js 14, TypeScript, and PostgreSQL. Allows companies to efficiently manage products, suppliers, categories, and inventory movements.

<!-- Screenshot: Add a hero image showing the main dashboard or login page -->

## ✨ Features

- 🔐 **Secure authentication** with NextAuth.js
- 🏢 **Multi-tenant** - Support for multiple companies
- 📊 **Interactive dashboard** with charts and statistics
- 🛍️ **Product management** with images and stock control
- 👥 **User management** with roles (admin, user, accountant)
- 🚚 **Complete supplier management**
- 📋 **Product categorization**
- 📈 **Inventory movements** (inbound, outbound, transfer, adjustment)
- 📱 **Responsive design** - Works on all devices
- 🎨 **Modern UI** with Tailwind CSS and custom components
- 🔍 **Advanced search** across all modules
- 📄 **Pagination** for better performance

<!-- Screenshots: Add images showing key features like dashboard, product management, user interface -->

## 🛠️ Technologies

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Static typing
- **Tailwind CSS** - CSS framework
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Recharts** - Charts and visualizations
- **React Icons** - Iconography
- **Zustand** - State management

### Backend
- **Next.js API Routes** - REST API
- **Prisma ORM** - Database
- **PostgreSQL** - Main database
- **NextAuth.js** - Authentication
- **bcryptjs** - Password encryption
- **Cloudinary** - Image storage

### Tools
- **Docker** - Containerization
- **ESLint** - Code linting
- **Preline** - UI components

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventary-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/inventary_db"
   DB_USER=user
   DB_NAME=inventary_db
   DB_PASSWORD=password

   # NextAuth
   AUTH_SECRET="your-super-secure-secret-here"
   AUTH_URL="http://subdomain.localhost:3000"

   # Cloudinary (optional, for image uploads)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Start the database with Docker**
   ```bash
   docker-compose up -d
   ```

5. **Set up the database**
   ```bash
   # Run migrations
   npm run prisma:deploy
   
   # Generate Prisma client
   npx prisma generate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Access the application**
   
   Open your browser and go to: `http://subdomain.localhost:3000`

<!-- Screenshot: Add image showing the login/register page -->

## 📁 Project Structure

```
inventary-system/
├── src/
│   ├── actions/          # Server actions
│   ├── app/             # Pages and layouts (App Router)
│   ├── components/      # Reusable components
│   ├── interfaces/      # TypeScript types
│   ├── lib/            # Utilities and configurations
│   ├── schemas/        # Validation schemas
│   └── utils/          # Utility functions
├── prisma/             # Database schema and migrations
├── public/             # Static files
└── docker-compose.yml  # Docker configuration
```

<!-- Screenshot: Add image showing the project structure in VS Code or file explorer -->

## 🔧 Additional Configuration

### Configure local subdomains

For the multi-tenant system to work correctly, you need to configure local subdomains:

1. **On macOS/Linux**: Edit `/etc/hosts`
   ```
   127.0.0.1 subdomain.localhost
   ```

2. **On Windows**: Edit `C:\Windows\System32\drivers\etc\hosts`
   ```
   127.0.0.1 subdomain.localhost
   ```

<!-- Screenshot: Add image showing the hosts file configuration -->

### Optional environment variables

```env
# For development
NODE_ENV=development

# For production
NODE_ENV=production
```

## 📊 System Usage

### 1. Company Registration
- Go to `/register` to create a new company
- Complete company information
- Create the first administrator user

<!-- Screenshot: Add image showing the company registration form -->

### 2. User Management
- Administrators can create additional users
- Assign roles: admin, user, accountant
- Manage permissions and access

<!-- Screenshot: Add image showing the user management interface -->

### 3. Inventory Setup
- Create product categories
- Add suppliers
- Configure products with initial stock

<!-- Screenshot: Add image showing the product creation form and categories -->

### 4. Daily Operations
- Record inbound/outbound movements
- Monitor low stock
- Generate reports from the dashboard

<!-- Screenshot: Add image showing the dashboard with charts and statistics -->

<!-- Screenshots: Add images showing:
- Main dashboard with cards and charts
- Product listing page with search and filters
- Supplier management interface
- Movement tracking interface
- User profile settings
-->

## 🚀 Deployment

### Production

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start in production**
   ```bash
   npm start
   ```

### Docker (Recommended)

```bash
# Build the image
docker build -t inventary-system .

# Run container
docker run -p 3000:3000 inventary-system
```

<!-- Screenshot: Add image showing successful deployment or Docker container running -->

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 🆘 Support

If you have problems or questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with problem details

## 🔄 Updates

To keep the project updated:

```bash
# Update dependencies
npm update

# Run migrations if there are database changes
npm run prisma:deploy
```

---

**Built with ❤️ using Next.js, TypeScript and PostgreSQL**

<!-- Screenshots to add throughout the README:
1. Login/Register page - Show the authentication interface
2. Main Dashboard - Display the overview with cards and charts
3. Product Management - Show product listing, creation form, and details
4. Supplier Management - Display supplier interface and forms
5. User Management - Show user roles and permissions interface
6. Inventory Movements - Display movement tracking and forms
7. Mobile Responsive - Show how the app looks on mobile devices
8. Database Schema - Screenshot of Prisma schema or database structure
9. Project Structure - VS Code file explorer showing the project layout
10. Deployment - Terminal showing successful build/deployment
-->




