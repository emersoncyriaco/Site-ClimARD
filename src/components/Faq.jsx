import { faq } from "../data";
import Icon from "./Icon";

export default function Faq() {
  return (
    <section className="section faq alt" id="duvidas">
      <div className="section__head">
        <span className="eyebrow">Dúvidas frequentes</span>
        <h2 className="h2">Perguntas <em>rápidas.</em></h2>
      </div>
      <div className="faq__list">
        {faq.map((item, i) => (
          <details className="faq__item" key={item.q} open={i === 0}>
            <summary>
              <span>{item.q}</span>
              <span className="faq__icon"><Icon name="plus" size={18} /></span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
