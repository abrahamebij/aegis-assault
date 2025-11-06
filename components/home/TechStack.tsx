export const TechStack = () => {
  const technologies = [
    { name: "React", color: "#61DAFB" },
    { name: "Phaser 3", color: "#9333EA" },
    { name: "Ethers.js", color: "#3C3C3D" },
    { name: "Solidity", color: "#363636" },
    { name: "Somnia", color: "#8B5CF6" },
    { name: "Amazon Q", color: "#FF9900" },
    { name: "AWS Lambda", color: "#FF9900" },
  ];

  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-6">
          Hackathon Tech Stack
        </h2>
        <p className="text-muted-foreground text-center mb-16 text-lg">
          Powered by industry-leading blockchain and AI technologies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {technologies.map((tech) => (
            <div 
              key={tech.name}
              className="flex flex-col items-center gap-3 transition-smooth hover:-translate-y-2"
            >
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-2xl border-2 transition-smooth hover:border-primary"
                style={{ 
                  borderColor: `${tech.color}40`,
                  backgroundColor: `${tech.color}20`,
                  color: tech.color
                }}
              >
                {tech.name.charAt(0)}
              </div>
              <span className="text-sm font-semibold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
