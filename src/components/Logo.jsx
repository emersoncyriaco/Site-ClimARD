import { media } from "../data";

// Selo + marca no mesmo estilo do logo (CLIM branco, ARD azul)
export default function Logo() {
  return (
    <span className="logo">
      <img className="logo__img" src={media.logo} alt="" width="44" height="44" />
      <span className="logo__text">
        <span>CLIM<b>ARD</b></span>
        <small>Ar condicionado</small>
      </span>
    </span>
  );
}
