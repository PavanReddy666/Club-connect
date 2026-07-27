# 🎓 ClubConnect — College Club Management & Recruitment System

<div align="center">

![Java](https://img.shields.io/badge/Java-25-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![H2 Database](https://img.shields.io/badge/H2-Database-0000BB?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A full-stack web application for managing college clubs, events, and membership recruitment with role-based access control.**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [API Reference](#-api-reference) · [Screenshots](#-screenshots)

</div>

---

## 📋 Overview

ClubConnect is a comprehensive platform designed for college campuses to streamline the management of student clubs. It provides a centralized system where **students** can discover and apply to clubs, **coordinators** can manage their clubs and events, and **admins** can oversee the entire ecosystem — all secured with JWT-based authentication and role-based authorization.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login with JWT tokens
- Role-based access control (Student, Coordinator, Admin)
- Protected routes with automatic token management
- Session persistence via localStorage

### 👨‍🎓 Student Portal
- Browse and discover all available clubs
- View detailed club information and member lists
- Apply to join clubs with a single click
- Track application status (Pending / Approved / Rejected)
- Personal dashboard with membership overview

### 🧑‍💼 Coordinator Dashboard
- Create and manage clubs
- Organize and schedule events for clubs
- Review, approve, or reject student membership applications
- View club analytics and member lists

### 🛡️ Admin Panel
- System-wide dashboard with statistics
- Manage all users (view, promote, delete)
- Oversee and manage all clubs across the platform
- Approve or reject newly created clubs

### 🌐 Public Pages
- Landing page with platform overview
- Browse clubs without authentication
- View upcoming events across all clubs
- Club detail pages with event listings

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Java 25** | Core programming language |
| **Spring Boot 3.2.4** | Application framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Database ORM |
| **H2 Database** | Persistent file-based database |
| **JWT (jjwt 0.11.5)** | Token-based authentication |
| **Lombok** | Boilerplate reduction |
| **Maven** | Build & dependency management |

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |

---

## 🚀 Getting Started

### Prerequisites

- **Java 25** (or compatible JDK)
- **Node.js** (v18+ recommended)
- **npm** (v9+)
- **Maven** (or use the included Maven wrapper)

### 1. Clone the Repository

```bash
git clone https://github.com/partheevg03/Club-connect.git
cd Club-connect
```

### 2. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The backend API will start at **`http://localhost:8080`**.

> **Note:** The H2 database is file-based and will persist data across server restarts. Data is stored in `backend/data/clubdb`.

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server will start at **`http://localhost:5173`**.

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`.

### Default Accounts (Seeded Data)

The application seeds default accounts on first startup via `DataSeeder.java`:

| Role | Email | Password |
|---|---|---|
| Admin | *(check DataSeeder.java)* | *(check DataSeeder.java)* |

> You can also register new accounts through the `/register` page.

---

## 📁 Project Structure

```
Club-connect/
├── backend/                          # Spring Boot Backend
│   ├── pom.xml                       # Maven configuration
│   ├── data/                         # H2 persistent database files
│   └── src/main/java/com/clubmanagement/
│       ├── ClubManagementApplication.java   # Entry point
│       ├── config/
│       │   ├── SecurityConfig.java          # Spring Security config
│       │   ├── CorsConfig.java              # CORS configuration
│       │   └── DataSeeder.java              # Initial data seeding
│       ├── controller/
│       │   ├── AuthController.java          # Login & register endpoints
│       │   ├── ClubController.java          # Club CRUD operations
│       │   ├── EventController.java         # Event management
│       │   ├── ApplicationController.java   # Membership applications
│       │   └── AdminController.java         # Admin operations
│       ├── service/
│       │   ├── AuthService.java
│       │   ├── ClubService.java
│       │   ├── EventService.java
│       │   ├── ApplicationService.java
│       │   └── AdminService.java
│       ├── repository/
│       │   ├── UserRepository.java
│       │   ├── ClubRepository.java
│       │   ├── EventRepository.java
│       │   └── ApplicationRepository.java
│       ├── entity/
│       │   ├── User.java
│       │   ├── Club.java
│       │   ├── Event.java
│       │   ├── Application.java
│       │   └── enums/
│       │       ├── Role.java                # STUDENT, COORDINATOR, ADMIN
│       │       ├── ClubStatus.java          # PENDING, APPROVED, REJECTED
│       │       └── ApplicationStatus.java   # PENDING, APPROVED, REJECTED
│       ├── dto/                             # Request/Response DTOs
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── AuthResponse.java
│       │   ├── ClubRequest.java
│       │   ├── ClubResponse.java
│       │   ├── EventRequest.java
│       │   ├── EventResponse.java
│       │   ├── ApplicationRequest.java
│       │   ├── ApplicationResponse.java
│       │   └── UserResponse.java
│       └── security/
│           ├── JwtUtil.java                 # JWT token generation/validation
│           ├── JwtAuthFilter.java           # JWT authentication filter
│           └── UserDetailsServiceImpl.java  # Custom UserDetailsService
│
└── frontend/                         # React + Vite Frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx                  # App entry point
        ├── App.jsx                   # Root component with routing
        ├── index.css                 # Global styles
        ├── api/                      # API service layer
        │   ├── axios.js              # Axios instance with interceptors
        │   ├── authApi.js            # Auth API calls
        │   ├── clubApi.js            # Club API calls
        │   ├── eventApi.js           # Event API calls
        │   ├── applicationApi.js     # Application API calls
        │   └── adminApi.js           # Admin API calls
        ├── components/               # Reusable components
        │   ├── Navbar.jsx            # Navigation bar
        │   ├── Sidebar.jsx           # Dashboard sidebar
        │   ├── PrivateRoute.jsx      # Auth-protected route wrapper
        │   └── UI.jsx                # Shared UI components
        ├── contexts/
        │   └── AuthContext.jsx       # Authentication context provider
        └── pages/
            ├── LandingPage.jsx       # Home/landing page
            ├── LoginPage.jsx         # User login
            ├── RegisterPage.jsx      # User registration
            ├── ClubsPage.jsx         # Browse all clubs
            ├── ClubDetailPage.jsx    # Individual club details
            ├── EventsPage.jsx        # Browse all events
            ├── student/
            │   └── StudentDashboard.jsx
            ├── coordinator/
            │   ├── CoordinatorDashboard.jsx
            │   ├── CreateClubPage.jsx
            │   └── CreateEventPage.jsx
            └── admin/
                ├── AdminDashboard.jsx
                ├── ManageUsersPage.jsx
                └── ManageClubsPage.jsx
```

---

## 📡 API Reference

### Base URL: `http://localhost:8080/api`

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |

### Clubs
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/clubs` | List all clubs | ❌ |
| `GET` | `/clubs/{id}` | Get club details | ❌ |
| `POST` | `/clubs` | Create a new club | 🔒 Coordinator |
| `GET` | `/clubs/my-clubs` | Get coordinator's clubs | 🔒 Coordinator |

### Events
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/events` | List all events | ❌ |
| `POST` | `/events` | Create a new event | 🔒 Coordinator |
| `GET` | `/events/club/{clubId}` | Get events by club | ❌ |

### Applications (Membership)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/applications` | Apply to join a club | 🔒 Student |
| `GET` | `/applications/my` | Get user's applications | 🔒 Student |
| `GET` | `/applications/club/{clubId}` | Get club applications | 🔒 Coordinator |
| `PUT` | `/applications/{id}/approve` | Approve an application | 🔒 Coordinator |
| `PUT` | `/applications/{id}/reject` | Reject an application | 🔒 Coordinator |

### Admin
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/admin/users` | List all users | 🔒 Admin |
| `GET` | `/admin/clubs` | List all clubs | 🔒 Admin |
| `DELETE` | `/admin/users/{id}` | Delete a user | 🔒 Admin |

---

## 🔒 Role-Based Access

```
┌─────────────────────────────────────────────────────┐
│                    ClubConnect                       │
├──────────┬──────────────┬───────────────────────────┤
│  Student │  Coordinator │         Admin             │
├──────────┼──────────────┼───────────────────────────┤
│ Browse   │ Everything   │ Everything a              │
│ clubs    │ a Student    │ Coordinator can do        │
│          │ can do       │                           │
│ Apply to │              │ Manage all users          │
│ clubs    │ Create &     │                           │
│          │ manage clubs │ Manage all clubs          │
│ Track    │              │                           │
│ apps     │ Create       │ System-wide               │
│          │ events       │ dashboard                 │
│ Personal │              │                           │
│ dashboard│ Review       │ Approve/reject            │
│          │ applications │ clubs                     │
└──────────┴──────────────┴───────────────────────────┘
```

---

## ⚙️ Configuration

### Backend (`application.properties`)

| Property | Default | Description |
|---|---|---|
| `server.port` | `8080` | Backend server port |
| `spring.datasource.url` | `jdbc:h2:file:./data/clubdb` | H2 database location |
| `spring.h2.console.enabled` | `true` | Enable H2 web console |
| `spring.h2.console.path` | `/h2-console` | H2 console URL path |
| `jwt.secret` | *(configured)* | JWT signing secret |
| `jwt.expiration` | `86400000` | Token expiry (24 hours) |

### Frontend (`vite.config.js`)

The frontend is configured to proxy API requests to the backend at `http://localhost:8080`.

---

## 🗄️ Database

This project uses **H2 Database** in file-based mode for persistent storage.

- **Console URL:** `http://localhost:8080/h2-console`
- **JDBC URL:** `jdbc:h2:file:./data/clubdb`
- **Username:** `sa`
- **Password:** *(empty)*

### Entity Relationship

```
User (1) ──── (N) Application (N) ──── (1) Club
                                            │
User (1) ──── (N) Club (as coordinator)     │
                                            │
                                       Event (N)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Built with ❤️ by [partheevg03](https://github.com/partheevg03)**

</div>
