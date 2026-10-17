import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/*
  Imagem ou vídeo com fallback: se o arquivo ainda não existir,
  mostra um placeholder com o nome do arquivo esperado (ou o `fallback` passado).
  Vídeos com `autoPlayInView` só tocam quando aparecem na tela.
*/
export default function Media({ type = "image", src, poster, alt = "", className = "", fallback, autoPlayInView = false, ...rest }) {
  const [failed, setFailed] = useState(!src);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlayInView) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.25 });
    io.observe(video);
    return () => io.disconnect();
  }, [autoPlayInView, failed]);

  if (failed) {
    // fallback={null} = não mostrar nada
    if (fallback !== undefined) return fallback;
    return (
      <div className={`media-ph ${className}`} role="img" aria-label={alt}>
        <Icon name={type === "video" ? "play" : "image"} size={22} />
        <span>{src?.replace("/media/", "")}</span>
      </div>
    );
  }

  if (type === "video") {
    return (
      <video
        ref={videoRef}
        className={className}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={!autoPlayInView}
        onError={() => setFailed(true)}
        aria-label={alt}
        {...rest}
      />
    );
  }

  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} {...rest} />;
}
