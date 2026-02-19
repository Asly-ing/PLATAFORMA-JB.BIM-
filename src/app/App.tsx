import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Landing } from '@/app/pages/Landing';
import { Courses } from '@/app/pages/Courses';
import { CourseDetails } from '@/app/pages/CourseDetails';
import { Dashboard } from '@/app/pages/Dashboard';
import { Login } from '@/app/pages/Login';
import { Community } from '@/app/pages/Community';
import { MyClasses } from '@/app/pages/MyClasses';
import { ClassRoom } from '@/app/pages/ClassRoom';
import {About} from './pages/About';
import { Libraries } from '@/app/pages/Libraries';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />

              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-classes" element={<MyClasses />} />
              <Route path="/classroom/:courseId/lesson/:lessonId" element={<ClassRoom />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/community" element={<Community />} />
              <Route path="/libraries" element={<Libraries />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}