const labels = ['Countdown', 'Celebration', 'Landing', 'Gallery', 'Scrapbook', 'Letter']

export function SceneNav({ current, onSelect }) {
  return (
    <nav className="scene-nav" aria-label="Birthday gift chapters">
      {labels.map((label, index) => (
        <button
          type="button"
          key={label}
          className={`scene-dot ${current === index ? 'is-active' : ''}`}
          onClick={() => onSelect(index)}
          aria-label={`Go to ${label}`}
          aria-current={current === index ? 'step' : undefined}
        >
          <span />
        </button>
      ))}
    </nav>
  )
}
