import React from 'react';
import { Link } from 'react-router-dom';
import { CaretRight, House } from '@phosphor-icons/react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  items,
  className = ''
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <House className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <CaretRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              {item.path && index !== items.length - 1 ? (
                <Link
                  to={item.path}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-900">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs; 