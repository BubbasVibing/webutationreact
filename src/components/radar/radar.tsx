import { useEffect, useRef } from 'react';
import './radar.css';
import FacebookIcon from '../../assets/facebook.svg';
import LinkedinIcon from '../../assets/linkedin.svg';
import InstagramIcon from '../../assets/instagram.svg';
import TwitterIcon from '../../assets/twitter.svg';
import TiktokIcon from '../../assets/tiktok.svg';

const Radar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Radar animation
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.4; // Position radar to align with CTA button
    
    // Force circular appearance by using a consistent scaling factor
    // Use a percentage of viewport width, capped to maintain circular aspect ratio
    const aspectRatio = window.innerWidth / window.innerHeight;
    const scaleFactor = aspectRatio > 1.5 ? 0.55 : 0.65; // Maximum reasonable size
    const maxRadius = Math.min(window.innerWidth, window.innerHeight) * scaleFactor;
    
    // Start angle from 0 (right side) to Math.PI (left side)
    let angle = 0;
    let circles: { radius: number; opacity: number; }[] = [];

    for (let i = 0; i < 4; i++) {
      circles.push({
        radius: maxRadius * (0.3 + 0.2 * i), // Wider spacing between circles
        opacity: 0.15 - i * 0.03
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw semi-circles in the bottom half - ensure consistent aspect ratio
      circles.forEach(circle => {
        ctx.beginPath();
        // Draw the bottom half of the circle (semi-circle)
        ctx.arc(centerX, centerY, circle.radius, 0, Math.PI, false);
        ctx.strokeStyle = `rgba(54, 98, 174, ${circle.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      
      // Add radar glow effect at the bottom
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius * 0.5
      );
      gradient.addColorStop(0, 'rgba(54, 98, 174, 0.15)');
      gradient.addColorStop(1, 'rgba(54, 98, 174, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.8, 0, Math.PI, false);
      ctx.fill();
      
      // Draw radar beam (clockwise from right to left - 180 degrees in bottom half)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      
      // Calculate beam position for the bottom half of the circle
      // Angle ranges from 0 (right) to PI (left)
      const beamX = centerX + Math.cos(angle) * maxRadius * 1.2;
      const beamY = centerY + Math.sin(angle) * maxRadius * 1.2;
      
      ctx.lineTo(beamX, beamY);
      
      // Create gradient for beam - more consistent color
      const beamGradient = ctx.createLinearGradient(centerX, centerY, beamX, beamY);
      beamGradient.addColorStop(0, 'rgba(54, 98, 174, 0.8)');
      beamGradient.addColorStop(1, 'rgba(54, 98, 174, 0.5)');
      
      ctx.strokeStyle = beamGradient;
      ctx.lineWidth = 4; // Thicker, more consistent line
      ctx.stroke();
      
      // Add a larger pulsing circle at the beam end
      ctx.beginPath();
      ctx.arc(beamX, beamY, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(54, 98, 174, 0.8)';
      ctx.fill();

      // Update animation with consistent speed
      angle += 0.008;
      
      // Reset when we complete a half circle (0 to PI)
      if (angle >= Math.PI) {
        angle = 0;
      }
      
      // Update circles
      circles = circles.map(circle => {
        return {
          ...circle,
          radius: circle.radius + 0.3
        };
      }).filter(circle => circle.radius < maxRadius * 1.8);
      
      if (circles.length < 4) {
        circles.unshift({
          radius: maxRadius * 0.3,
          opacity: 0.15
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="radar-container">
      <canvas ref={canvasRef} className="radar-animation"></canvas>
      <div className="social-icons">
        <div className="icon facebook"><img src={FacebookIcon} alt="Facebook" /></div>
        <div className="icon linkedin"><img src={LinkedinIcon} alt="LinkedIn" /></div>
        <div className="icon instagram"><img src={InstagramIcon} alt="Instagram" /></div>
        <div className="icon twitter"><img src={TwitterIcon} alt="Twitter" /></div>
        <div className="icon tiktok"><img src={TiktokIcon} alt="TikTok" /></div>
      </div>
    </div>
  );
};

export default Radar;
