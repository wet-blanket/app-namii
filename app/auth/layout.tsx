export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form Container (50% on desktop, 100% on mobile) */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative"
        style={{
          backgroundColor: "#000000",
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
          imageRendering: "pixelated",
        }}
      >
        <div className="w-full max-w-xs relative z-10">{children}</div>
      </div>

      {/* Right Column - Empty Container (50% on desktop, hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p className="text-primary-100">Content will go here</p>
          </div>
        </div>

        {/* Decorative geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-primary-400 rounded-lg rotate-12 opacity-30"></div>
        <div className="absolute top-40 right-32 w-12 h-12 border-2 border-primary-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 border-2 border-primary-400 transform rotate-45 opacity-25"></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 border-2 border-primary-300 rounded-lg opacity-30"></div>
      </div>
    </div>
  );
}
