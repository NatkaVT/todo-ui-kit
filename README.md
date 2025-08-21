## Todo Async ()

### Project Description
This is a full-stack Todo application that demonstrates modern React development with server-side data persistence. The project showcases async operations, state management, and real-time data synchronization between frontend and backend.

### Technologies Used

**Frontend Technologies:**
- **React 19.1.0** - main library for user interface
- **@tanstack/react-query** - server state management and caching
- **@tanstack/react-query-devtools** - development tools for React Query
- **Axios** - HTTP client for API requests
- **FontAwesome** - icon library integration

**Backend Technologies:**
- **Express.js 5.1.0** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.14.1** - MongoDB object modeling
- **CORS** - Cross-Origin Resource Sharing

**Development Tools:**
- **React Testing Library** - component testing
- **Jest** - testing framework

### Application Features

**Core Functionality:**
1. **CRUD Operations** - Create, Read, Update, Delete todos
2. **Real-time Sync** - automatic data synchronization with server
3. **Optimistic Updates** - immediate UI updates with server validation
4. **Error Handling** - comprehensive error management
5. **Loading States** - user feedback during async operations

**Todo Management:**
- Add new todos
- Mark todos as completed/incomplete
- Edit todo text via modal
- Delete individual todos
- Delete all todos with confirmation
- Persistent data storage in MongoDB

### Architecture

**Frontend Architecture:**
- **React Query** - server state management
- **Custom Hooks** - reusable logic for API operations
- **Component-based UI** - modular component structure
- **CSS Modules** - scoped styling

**Backend Architecture:**
- **RESTful API** - standard HTTP endpoints
- **MongoDB Schema** - structured data model
- **Express Middleware** - CORS and JSON parsing
- **Error Handling** - comprehensive error responses

### API Endpoints

**Todo Operations:**
- `GET /api/todos` - fetch all todos
- `POST /api/todos` - create new todo
- `PUT /api/todos/:id` - update todo
- `DELETE /api/todos/:id` - delete specific todo
- `DELETE /api/todos` - delete all todos

### Project Structure
```
├── src/
│   ├── components/     # Reusable UI components
│   ├── TodoList.js     # Main todo management component
│   └── App.js          # Application entry point
├── backend/
│   └── server.js       # Express server with MongoDB
└── package.json        # Dependencies and scripts
```

### Implementation Highlights
- **React Query Integration** - efficient server state management
- **Optimistic Updates** - immediate UI feedback
- **Error Boundaries** - graceful error handling
- **MongoDB Integration** - persistent data storage
- **Real-time Synchronization** - automatic data updates
- **Modal-based Editing** - inline todo editing
- **Confirmation Dialogs** - safe deletion operations

This project demonstrates modern full-stack development practices with React Query for efficient server state management, MongoDB for data persistence, and a clean separation between frontend and backend concerns.
