
# BloodConnect - Blood Donation Management System

A modern web application built with Next.js, TypeScript, and Firebase to connect blood donors with recipients.

## 🚀 Features

- **User Authentication**
  - Donor registration and login
  - Acceptor registration and login
  - Secure password management
  - Role-based access control

- **Donor Management**
  - Profile management
  - Blood type tracking
  - Donation history
  - Availability status

- **Blood Request System**
  - Create blood requests
  - Track request status
  - Match with available donors
  - Emergency request handling

- **Admin Dashboard**
  - User management
  - Request monitoring
  - Statistics and analytics
  - System settings

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Deployment**: Firebase Hosting

## 📁 Project Structure

```
blood-donation-app/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── register/          # Registration pages
│   ├── login/             # Login pages
│   ├── dashboard/         # User dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── theme-provider.tsx # Theme management
│   └── forms/            # Form components
├── hooks/                # Custom React hooks
│   └── use-auth.tsx      # Authentication hook
├── lib/                  # Utility functions
│   └── firebase.ts       # Firebase configuration
├── public/               # Static assets
│   ├── images/          # Image assets
│   ├── icons/           # Icon assets
│   ├── logos/           # Logo assets
│   └── favicon/         # Favicon assets
└── styles/              # Global styles
```

## 🔧 Key Components

### Authentication System
- `hooks/use-auth.tsx`: Manages user authentication state and methods
- `lib/firebase.ts`: Firebase configuration and initialization
- `app/login/page.tsx`: Login page with form validation
- `app/register/page.tsx`: Registration page with role selection

### Admin Dashboard
- `app/admin/page.tsx`: Main admin dashboard
- `app/admin/donors/page.tsx`: Donor management
- `app/admin/requests/page.tsx`: Request management
- `app/admin/appointments/page.tsx`: Appointment scheduling

### Theme System
- `components/theme-provider.tsx`: Handles theme switching
- `app/layout.tsx`: Root layout with theme provider
- `styles/globals.css`: Global styles and theme variables

## 🔐 Security

- Firebase Authentication for user management
- Firestore Security Rules for data access control
- Environment variables for sensitive data
- Role-based access control

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd blood-donation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🔄 Data Flow

1. **User Registration**
   - User fills registration form
   - Data validated and sent to Firebase Auth
   - User profile created in Firestore
   - Redirected to dashboard

2. **Blood Request**
   - Acceptor creates request
   - Request stored in Firestore
   - Admin notified
   - Matched with available donors

3. **Donation Process**
   - Donor accepts request
   - Appointment scheduled
   - Status updated in real-time
   - History recorded

## 🎨 Theme System

The app uses a custom theme system with:
- Light/Dark mode support
- System preference detection
- Smooth transitions
- Persistent theme selection

## 🔒 Security Rules

Firestore security rules ensure:
- Users can only access their own data
- Admins have full access
- Donors can only update their availability
- Acceptors can only manage their requests

## 📱 Responsive Design

- Mobile-first approach
- Responsive layouts
- Touch-friendly interfaces
- Adaptive navigation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- shadcn/ui for beautiful components
- All contributors and supporters 