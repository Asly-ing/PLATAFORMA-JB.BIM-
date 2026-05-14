import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Lesson {
  id: number;
  section_id: number;
  title: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  is_preview: boolean;
  position: number;
  created_at: string;
}

export interface Section {
  id: number;
  course_id: number;
  title: string;
  position: number;
  created_at: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  short_description: string;
  description: string;
  instructor_id: number;
  category_id: number;
  level: string;
  image_url: string;
  image_public_id: string;
  preview_video: string;
  price: number;
  discount_price: number;
  status: string;
  duration_minutes: number;
  requirements: string;
  learning_objectives: string;
  created_at: string;
  updated_at: string;
  instructor_name: string;
  category_name: string;
  sections?: Section[];
}

export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  getCourseById: async (id: number | string): Promise<Course> => {
    try {
      const response = await axios.get(`${API_URL}/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/courses/categories`);
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
