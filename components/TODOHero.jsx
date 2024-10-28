function TODOHero({ todos_completed = 0, total_todos = 0 }) {
  return (
    <section className="todohero_section">
      <div className="hero_message">
        <p className="text_large">🎉 Task Done!</p>
        <p className="text_small">Keep it up! You're doing great.</p>
      </div>
      <div className="hero_progress">
        <span>{todos_completed}</span>/<span>{total_todos}</span>
      </div>
    </section>
  );
}

export default TODOHero;
