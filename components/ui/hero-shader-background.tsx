'use client';

export default function HeroShaderBackground() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#050810]" />
      
      {/* Animated blob 1 - simulating blue/cyan shader mix */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(27, 95, 214, 0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'blob-float-1 20s infinite alternate ease-in-out',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Animated blob 2 - simulating soft highlights */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(120, 150, 255, 0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'blob-float-2 25s infinite alternate ease-in-out',
          mixBlendMode: 'screen',
        }}
      />

      {/* Grid overlay for geometric texture */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
        }}
      />

      {/* Vignette veil to ensure text readability around edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,8,16,0.6) 100%)',
        }}
      />

      {/* Safe embedded CSS for the floating animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob-float-1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 15%) scale(1.1); }
          100% { transform: translate(-5%, 5%) scale(0.95); }
        }
        @keyframes blob-float-2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, -15%) scale(1.1); }
          100% { transform: translate(5%, -5%) scale(0.95); }
        }
      `}} />
    </div>
  );
}
