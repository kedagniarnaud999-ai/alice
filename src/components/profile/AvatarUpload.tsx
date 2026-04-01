import React, { useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.api';
import { AVATAR_BUCKET, supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { User, Camera } from 'lucide-react';

const buildFilePath = (userId: string, fileName: string) => {
  const safeName = fileName.replace(/\s+/g, '-').toLowerCase();
  return `${userId}/${Date.now()}-${safeName}`;
};

export const AvatarUpload: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const avatarSrc = useMemo(() => {
    if (!preview) {
      return null;
    }
    return preview;
  }, [preview]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    setFile(selectedFile);
    setError('');
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file || !user?.id) return;

    setUploading(true);
    setError('');

    try {
      const filePath = buildFilePath(user.id, file.name);
      const { error: uploadError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

      await authService.updateProfile({ avatar: data.publicUrl });
      await refreshUser();
      setPreview(data.publicUrl);
      setFile(null);
    } catch (err: any) {
      setError(err?.message || "Échec de l'upload. Veuillez réessayer.");
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
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <label
            htmlFor="avatar-input"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-600 transition hover:bg-primary-700"
          >
            <Camera className="h-4 w-4 text-white" />
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
          <h3 className="mb-1 font-semibold text-gray-900">Photo de profil</h3>
          <p className="mb-3 text-sm text-gray-600">JPG, PNG ou WebP. Max 5 Mo.</p>

          {file && (
            <div className="flex gap-2">
              <Button onClick={handleUpload} disabled={uploading} size="sm">
                {uploading ? 'Upload...' : 'Enregistrer'}
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                Annuler
              </Button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
    </div>
  );
};
