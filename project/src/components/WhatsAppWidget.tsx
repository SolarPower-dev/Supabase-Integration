import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget: React.FC = () => {
  const whatsappNumber = '+971501234567';
  const message = encodeURIComponent('Hello! I\'m interested in your solar products.');
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 animate-bounce-subtle"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppWidget;