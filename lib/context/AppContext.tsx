"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  phone: string;
  role: 'employee' | 'admin';
  createdAt: string;
}

interface Application {
  id: number;
  name: string;
  phone: string;
  location: string;
  gender: string;
  about: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface HireRequest {
  id: number;
  employerName: string;
  employerPhone: string;
  employerAddress: string;
  employeeId: number;
  employeeName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface AppContextType {
  user: User | null;
  applications: Application[];
  hireRequests: HireRequest[];
  language: 'Oromo' | 'English';
  setUser: (user: User | null) => void;
  setLanguage: (language: 'Oromo' | 'English') => void;
  addApplication: (application: Omit<Application, 'id' | 'createdAt'>) => void;
  addHireRequest: (hireRequest: Omit<HireRequest, 'id' | 'createdAt'>) => void;
  updateApplication: (id: number, updates: Partial<Application>) => void;
  updateHireRequest: (id: number, updates: Partial<HireRequest>) => void;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (name: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'Oromo' | 'English'>('Oromo');
  const [applications, setApplications] = useState<Application[]>([]);
  const [hireRequests, setHireRequests] = useState<HireRequest[]>([]);

  // Save language to localStorage when it changes
  const handleSetLanguage = (newLanguage: 'Oromo' | 'English') => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Mock data for demonstration
  useEffect(() => {
    // Load mock applications
    const mockApplications: Application[] = [
      {
        id: 1,
        name: "Bontu Gudata",
        phone: "0912345678",
        location: "Adama",
        gender: "female",
        about: "I am a dedicated professional with 2 years of experience in hotel service, customer handling, and front-desk management. Passionate about providing quality service and creating memorable guest experiences.",
        images: ["/ho1.jpg", "/hot3.jpg", "/hot2.jpg", "/hot3.jpg"],
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Bayisa Balcha",
        phone: "0923456789",
        location: "Addis Ababa",
        gender: "male",
        about: "Experienced chef with 5 years in kitchen operations and food preparation. Skilled in various cuisines and kitchen management.",
        images: ["/hot2.jpg", "/ho1.jpg"],
        status: "approved",
        createdAt: new Date().toISOString(),
      },
    ];

    // Load mock hire requests
    const mockHireRequests: HireRequest[] = [
      {
        id: 1,
        employerName: "Example Hotel",
        employerPhone: "0911111111",
        employerAddress: "Addis Ababa, Ethiopia",
        employeeId: 1,
        employeeName: "Bontu Gudata",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    ];

    setApplications(mockApplications);
    setHireRequests(mockHireRequests);

    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage as 'Oromo' | 'English');
    }
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your backend
    const mockUsers = [
      { id: 1, name: "Test User", phone: "1234567890", password: "password", role: "employee" as const },
      { id: 2, name: "Admin User", phone: "0987654321", password: "password", role: "admin" as const },
    ];

    const foundUser = mockUsers.find(u => u.phone === phone && u.password === password);
    if (foundUser) {
      const { password: _pw, ...userWithoutPassword } = foundUser;
      // reference to avoid unused var warning
      void _pw;
      const userWithCreatedAt = {
        ...userWithoutPassword,
        createdAt: new Date().toISOString()
      };
      setUser(userWithCreatedAt);
      localStorage.setItem('user', JSON.stringify(userWithCreatedAt));
      return true;
    }
    return false;
  };

  const register = async (name: string, phone: string, _password: string): Promise<boolean> => {
    // Mock registration - in real app, this would call your backend
    // reference to avoid unused var warning
    void _password;
    const newUser: User = {
      id: Date.now(),
      name,
      phone,
      role: 'employee',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addApplication = (application: Omit<Application, 'id' | 'createdAt'>) => {
    const newApplication: Application = {
      ...application,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  const addHireRequest = (hireRequest: Omit<HireRequest, 'id' | 'createdAt'>) => {
    const newHireRequest: HireRequest = {
      ...hireRequest,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setHireRequests(prev => [newHireRequest, ...prev]);
  };

  const updateApplication = (id: number, updates: Partial<Application>) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, ...updates } : app)
    );
  };

  const updateHireRequest = (id: number, updates: Partial<HireRequest>) => {
    setHireRequests(prev => 
      prev.map(req => req.id === id ? { ...req, ...updates } : req)
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      applications,
      hireRequests,
      language,
      setUser,
      setLanguage: handleSetLanguage,
      addApplication,
      addHireRequest,
      updateApplication,
      updateHireRequest,
      login,
      register,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

