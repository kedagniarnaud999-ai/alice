import React from 'react';
import { BookOpen } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl p-6 border-2 border-primary-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
