import { business, services } from "../data";
import { defaultMessage, waLink } from "../lib/whatsapp";
import Icon from "./Icon";
import Logo from "./Logo";

// Dados estruturados para o Google (negócio local de climatização)
const schema = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: business.name,
  telephone: business.phoneDisplay,
  areaServed: business.region,
  openingHours: "Mo-Sa 08:00-18:00",
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
};

export default function Footer() {
  return (
    <footer className="footer dark">
      <div className="footer__top">
        <div>
          <Logo />
          <p>Conserto, manutenção e higienização de ar-condicionado com diagnóstico de precisão.</p>
        </div>
        <ul>
          <li><Icon name="chat" size={16} /> <a href={waLink(defaultMessage)} target="_blank" rel="noopener">{business.phoneDisplay}</a></li>
          <li><Icon name="clock" size={16} /> {business.hours}</li>
          <li><Icon name="pin" size={16} /> {business.region}</li>
          <li><Icon name="instagram" size={16} /> <a href={business.instagram} target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {business.name}</span>
        <a href={business.credit.href} target="_blank" rel="noopener">{business.credit.label}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </footer>
  );
}
