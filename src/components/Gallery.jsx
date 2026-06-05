import { useEffect, useMemo, useState } from 'react';

function Gallery({ galleryItems }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = galleryItems[activeIndex] || galleryItems[0];

  const instagramPosts = useMemo(
    () => [
      'https://www.instagram.com/p/DPR50OsjGE8/',
      'https://www.instagram.com/p/CqYvZaQpR8x/',
    ],
    []
  );

  useEffect(() => {
    const scriptSrc = 'https://www.instagram.com/embed.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process();
        return true;
      }
      return false;
    };

    const handleLoad = () => processEmbeds();

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = scriptSrc;
      script.onload = handleLoad;
      document.body.appendChild(script);
    } else {
      if (!processEmbeds()) {
        existingScript.addEventListener('load', handleLoad);
      }
    }

    const retry = window.setInterval(() => {
      if (processEmbeds()) {
        window.clearInterval(retry);
      }
    }, 400);

    const timeout = window.setTimeout(() => {
      processEmbeds();
      window.clearInterval(retry);
    }, 2000);

    return () => {
      window.clearInterval(retry);
      window.clearTimeout(timeout);
      if (existingScript) {
        existingScript.removeEventListener('load', handleLoad);
      }
    };
  }, [instagramPosts]);

  const setIndex = (index) => {
    if (index < 0) {
      setActiveIndex(galleryItems.length - 1);
    } else if (index >= galleryItems.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Gallery</p>
          <h2>Inspiration from recent studio work.</h2>
          <p>Enjoy a rotating selection of premium nail artistry paired with live Instagram inspiration.</p>
        </div>
        <div className="gallery-layout">
          <div className="gallery-carousel">
            <div className="carousel-card">
              <img src={activeItem.image} alt={activeItem.caption} />
              <figcaption>{activeItem.caption}</figcaption>
              <div className="carousel-controls">
                <button type="button" onClick={() => setIndex(activeIndex - 1)} className="btn btn-secondary">
                  Prev
                </button>
                <span>{`${activeIndex + 1}/${galleryItems.length}`}</span>
                <button type="button" onClick={() => setIndex(activeIndex + 1)} className="btn btn-primary">
                  Next
                </button>
              </div>
            </div>
            <div className="carousel-thumb-list">
              {galleryItems.map((item, idx) => (
                <button
                  key={item.image}
                  type="button"
                  className={`carousel-thumb ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <img src={item.image} alt={item.caption} />
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-embeds">
            <div className="instagram-embed-copy">
              <p className="eyebrow">Instagram</p>
              <h3>Live salon moments.</h3>
              <p>See styling details, nail care tips, and fresh looks from our feed.</p>
            </div>
            {instagramPosts.map((url) => (
              <blockquote
                key={url}
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <a href={url} target="_blank" rel="noreferrer noopener">
                  View this post on Instagram
                </a>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
