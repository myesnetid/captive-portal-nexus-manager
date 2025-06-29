import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { APP_CONFIG } from '@/config/app';
import type { SiteSettings, BannerSettings } from '@/types/api';

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(APP_CONFIG.defaultSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    setLoading(true);
    setError(null);

    // Try to load from API first, fallback to localStorage, then defaults
    const response = await apiService.getSiteSettings();
    
    if (response.success && response.data) {
      setSettings(response.data);
      localStorage.setItem('siteSettings', JSON.stringify(response.data));
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem('siteSettings');
      if (stored) {
        try {
          setSettings(JSON.parse(stored));
        } catch {
          setSettings(APP_CONFIG.defaultSettings);
        }
      }
    }

    setLoading(false);
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    setLoading(true);
    setError(null);

    const response = await apiService.updateSiteSettings(newSettings);
    
    if (response.success && response.data) {
      setSettings(response.data);
      localStorage.setItem('siteSettings', JSON.stringify(response.data));
    } else {
      // Fallback to localStorage only
      setSettings(newSettings);
      localStorage.setItem('siteSettings', JSON.stringify(newSettings));
      setError(response.error || 'Failed to save settings to server');
    }

    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
    reloadSettings: loadSettings
  };
};

export const useBannerSettings = () => {
  const [banners, setBanners] = useState<BannerSettings['banners']>([
    {
      id: '1',
      type: 'text',
      title: 'STOP JUDI ONLINE',
      subtitle: 'Judi Online Merusak Masa Depan Anda',
      bgColor: 'bg-red-500',
      isActive: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBannerSettings = async () => {
    setLoading(true);
    setError(null);

    const response = await apiService.getBannerSettings();
    
    if (response.success && response.data) {
      setBanners(response.data.banners);
      localStorage.setItem('bannerSettings', JSON.stringify(response.data));
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem('bannerSettings');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setBanners(data.banners || banners);
        } catch {
          // Keep default banners
        }
      }
    }

    setLoading(false);
  };

  const updateBannerSettings = async (newBanners: BannerSettings['banners']) => {
    setLoading(true);
    setError(null);

    const settings: BannerSettings = {
      banners: newBanners,
      autoSlide: true,
      slideInterval: 3000
    };

    const response = await apiService.updateBannerSettings(settings);
    
    if (response.success && response.data) {
      setBanners(response.data.banners);
      localStorage.setItem('bannerSettings', JSON.stringify(response.data));
    } else {
      // Fallback to localStorage only
      setBanners(newBanners);
      localStorage.setItem('bannerSettings', JSON.stringify(settings));
      setError(response.error || 'Failed to save banner settings to server');
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBannerSettings();
  }, []);

  return {
    banners,
    loading,
    error,
    updateBannerSettings,
    reloadBannerSettings: loadBannerSettings
  };
};
