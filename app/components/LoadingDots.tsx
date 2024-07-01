function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <div className="dot bg-gray-200 w-2.5 h-2.5 rounded-full"></div>
      <div className="dot bg-gray-200 w-2.5 h-2.5 rounded-full"></div>
      <div className="dot bg-gray-200 w-2.5 h-2.5 rounded-full"></div>
      <style jsx>{`
        .dot {
          animation: pulse 1.5s infinite;
        }
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes pulse {
          0%, 100% {
            background-color: #e5e7eb; /* gray-200 */
          }
          50% {
            background-color: #6b7280; /* gray-700 */
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingDots;
