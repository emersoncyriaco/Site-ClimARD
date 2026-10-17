import { testimonials } from "../data";
import Icon from "./Icon";

// Só aparece quando houver avaliações reais em data.js
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section className="section reviews light">
      <div className="section__head">
        <span className="eyebrow">Avaliações</span>
        <h2 className="h2">Quem chamou, <em>recomenda.</em></h2>
      </div>
      <div className="reviews__grid">
        {testimonials.map((t) => (
          <figure className="review card" key={t.name + t.text.slice(0, 12)}>
            <div className="review__stars" aria-label={`${t.stars} de 5 estrelas`}>
              {Array.from({ length: t.stars }, (_, i) => <Icon key={i} name="star" size={16} />)}
            </div>
            <blockquote>“{t.text}”</blockquote>
            <figcaption><b>{t.name}</b>{t.place && <small> · {t.place}</small>}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
