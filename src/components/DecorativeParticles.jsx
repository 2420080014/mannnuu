export function DecorativeParticles({ count = 16, tone = 'light' }) {
  return (
    <div className={`particles particles-${tone}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            '--particle-x': `${(index * 37) % 100}%`,
            '--particle-y': `${(index * 61) % 100}%`,
            '--particle-delay': `${(index % 7) * 0.65}s`,
            '--particle-size': `${2 + (index % 3)}px`,
          }}
        />
      ))}
    </div>
  )
}
