import React from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';
import type { AuthErrorDescription } from '@/utils/authErrors';

interface AuthAlertProps {
  error: AuthErrorDescription | null;
}

export const AuthAlert: React.FC<AuthAlertProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  const isServiceIssue = error.isServiceIssue;
  const Icon = isServiceIssue ? AlertTriangle : XCircle;

  return (
    <div
      role="alert"
      className={`mb-6 rounded-2xl border px-4 py-3 ${
        isServiceIssue
          ? 'border-amber-200 bg-amber-50 text-amber-900'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-semibold">{error.title}</p>
          <p className="text-sm leading-6">{error.details}</p>
        </div>
      </div>
    </div>
  );
};
