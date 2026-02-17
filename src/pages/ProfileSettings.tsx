import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.api';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { User, Mail, Shield } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.updateProfile({ name });
      setSuccess('Profil mis à jour avec succès');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Échec de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Photo de profil</h2>
        <AvatarUpload />
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Nom complet
            </label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{user?.name || 'Non défini'}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <p className="text-gray-900">{user?.email}</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Shield className="w-4 h-4" />
              Rôle
            </label>
            <p className="text-gray-900 capitalize">{user?.role?.toLowerCase()}</p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {editing ? (
              <>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
                <Button
                  onClick={() => {
                    setEditing(false);
                    setName(user?.name || '');
                    setError('');
                  }}
                  variant="outline"
                >
                  Annuler
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>
                Modifier le profil
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
