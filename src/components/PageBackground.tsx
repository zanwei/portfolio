interface PageBackgroundProps {
  color?: string;
  className?: string;
}

export default function PageBackground({ 
  color = "#ffffff", 
  className = "" 
}: PageBackgroundProps) {
  return (
    <div
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ backgroundColor: color }}
    />
  );
} 