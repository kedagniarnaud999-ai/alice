import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/services/api.client';
import { Button } from '@/components/ui/Button';
import { User, Camera } from 'lucide-react';

export const AvatarUpload: React.FC = () => {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 Mo');
      return;
    }

    setFile(selectedFile);
    setError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      await apiClient.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFile(null);
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Échec de l\'upload. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(user?.avatar || null);
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {preview ? (
              <img
                src={preview.startsWith('http') ? preview : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${preview}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label
            htmlFor="avatar-input"
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition"
          >
            <Camera className="w-4 h-4 text-white" />
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Photo de profil</h3>
          <p className="text-sm text-gray-600 mb-3">
            JPG, PNG ou WebP. Max 5 Mo.
          </p>

          {file && (
            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={uploading}
                size="sm"
              >
                {uploading ? 'Upload...' : 'Enregistrer'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                Annuler
              </Button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
