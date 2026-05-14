import axios from 'axios';
import { Course } from './courseService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  enrolled: number;
  joined: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export const adminUserService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      // Must use credentials if admin routes are protected
      const response = await axios.get(`${API_URL}/admin/users`, { withCredentials: true });
      return response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, { withCredentials: true });
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  getUserCourses: async (id: string): Promise<{ id: number; title: string; enrolled_at: string }[]> => {
    try {
      const response = await axios.get(`${API_URL}/admin/users/${id}/courses`, { withCredentials: true });
      return response.data.courses;
    } catch (error) {
      console.error(`Error fetching courses for user ${id}:`, error);
      throw error;
    }
  },

  enrollUser: async (id: string, courseId: number): Promise<void> => {
    try {
      await axios.post(`${API_URL}/admin/users/${id}/enroll`, { courseId }, { withCredentials: true });
    } catch (error) {
      console.error(`Error enrolling user ${id} in course ${courseId}:`, error);
      throw error;
    }
  },

  unenrollUser: async (id: string, courseId: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}/enroll/${courseId}`, { withCredentials: true });
    } catch (error) {
      console.error(`Error unenrolling user ${id} from course ${courseId}:`, error);
      throw error;
    }
  },

  downloadUsersReport: async (): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/admin/users/export`, {
        withCredentials: true,
        responseType: 'blob', // Important for downloading files
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Extract filename from header if possible, else default
      let fileName = 'Reporte_Usuarios.xlsx';
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition && contentDisposition.indexOf('filename=') !== -1) {
        fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }
};