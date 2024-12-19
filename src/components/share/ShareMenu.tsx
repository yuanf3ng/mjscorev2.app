import React from 'react';
import { Copy, MessageCircle, X } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ShareMenuProps {
  onClose: () => void;
  onCopy: () => void;
  onWhatsApp: () => void;
}

export function ShareMenu({ onClose, onCopy, onWhatsApp }: ShareMenuProps) {
  const menuRef = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={menuRef}
        className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share Rankings</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              onCopy();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Copy size={20} className="text-gray-500" />
            <div className="text-left">
              <div className="font-medium">Copy to Clipboard</div>
              <div className="text-sm text-gray-500">Share rankings as text</div>
            </div>
          </button>

          <button
            onClick={() => {
              onWhatsApp();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <MessageCircle size={20} className="text-gray-500" />
            <div className="text-left">
              <div className="font-medium">Share on WhatsApp</div>
              <div className="text-sm text-gray-500">Open WhatsApp with rankings</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}