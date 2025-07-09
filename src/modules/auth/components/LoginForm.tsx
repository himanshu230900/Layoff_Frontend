import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Input } from '@/components';
import { loginAsync } from '../store/authSlice';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = t('forms.validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('forms.validation.invalidEmail');
    }
    
    if (!formData.password.trim()) {
      errors.password = t('forms.validation.required');
    } else if (formData.password.length < 8) {
      errors.password = t('forms.validation.passwordTooShort');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(loginAsync(formData));
      
      if (loginAsync.fulfilled.match(result)) {
        // Success is handled by the slice
        localStorage.setItem('user', JSON.stringify(result.payload.user));
        localStorage.setItem('access_token', result.payload.token);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Demo login function
  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@layoffapp.com',
      password: 'password123'
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('auth.login')}
        </h2>
        <p className="text-gray-600 mt-2">
          Access your job search dashboard
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          label={t('auth.email')}
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          placeholder="Enter your email"
          required
        />

        <Input
          type="password"
          name="password"
          label={t('auth.password')}
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          placeholder="Enter your password"
          required
        />

        <Button
          type="submit"
          loading={isLoading}
          className="w-full"
          size="lg"
        >
          {t('auth.login')}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleDemoLogin}
          className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
        >
          Fill demo credentials
        </button>
      </div>

      <div className="mt-4 text-center">
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-500 transition-colors"
        >
          {t('auth.forgotPassword')}
        </a>
      </div>
    </div>
  );
};

export { LoginForm }; 