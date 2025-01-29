
// import './App.css'
// import Navbar from './components/Navbar.tsx'
// import Footer from './components/Footer.tsx'
// import Authentication from './components/Authentication.tsx'
// // import { useState } from 'react'
// import { AuthProvider } from './context/authContext.tsx'
// import TaskForm from './components/TaskForm.tsx'
// import { useState } from 'react'

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const aboutText =
//   "Your personal task management solution for better productivity and organization.";
// const quickLinks = [
//   { href: "#features", icon: "fa-star", text: "Features" },
//   { href: "#help", icon: "fa-question-circle", text: "Help Center" },
//   { href: "#contact", icon: "fa-envelope", text: "Contact Us" },
// ];
// const socialLinks = [
//   { href: "#twitter", icon: "twitter" },
//   { href: "#linkedin", icon: "linkedin" },
//   { href: "#github", icon: "github" },
// ];
// const isDark = false;
// // const [isDark, setIsDark] = useState(false);
// const token = localStorage.getItem("Token");
// console.log(token,"token in app .js")

//   return (
//     <>
//     <AuthProvider>
//     <Navbar/>
//     <div>
//       {token ? <TaskForm/> : <Authentication/>}
//       </div>
//       <Footer
//         isDark={isDark}
//         aboutText={aboutText}
//         quickLinks={quickLinks}
//         socialLinks={socialLinks}
//       />
//     </AuthProvider>
//     </>
//   )
// }

// export default App


import './App.css';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Authentication from './components/Authentication.tsx';
import TaskForm from './components/TaskForm.tsx';
import { AuthProvider } from './context/authContext.tsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const token = localStorage.getItem("Token");

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Redirect to TaskForm if logged in, otherwise to Authentication */}
          <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/tasks" element={token ? <TaskForm /> : <Navigate to="/auth" />} />
        </Routes>
        <Footer
          isDark={false}
          aboutText="Your personal task management solution for better productivity and organization."
          quickLinks={[
            { href: "#features", icon: "fa-star", text: "Features" },
            { href: "#help", icon: "fa-question-circle", text: "Help Center" },
            { href: "#contact", icon: "fa-envelope", text: "Contact Us" },
          ]}
          socialLinks={[
            { href: "#twitter", icon: "twitter" },
            { href: "#linkedin", icon: "linkedin" },
            { href: "#github", icon: "github" },
          ]}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;

