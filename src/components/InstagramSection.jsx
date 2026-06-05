import { useEffect } from 'react';

const instagramPosts = [
  'https://www.instagram.com/p/DUVmzZRDHi5/?utm_source=ig_embed&utm_campaign=loading',
  'https://www.instagram.com/p/DQBzNXEDDJK/?utm_source=ig_embed&utm_campaign=loading',
  'https://www.instagram.com/p/DPR50OsjGE8/?utm_source=ig_embed&utm_campaign=loading',
];

function InstagramSection() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="section instagram-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Inspiration</p>
          <h2>Featured looks from our Instagram.</h2>
          <p>See the latest nail art, textures, and bridal styles from @d.m.c_designs.</p>
        </div>
        <div className="instagram-grid">
          {instagramPosts.map((url) => (
            <blockquote
              key={url}
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '16px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
                margin: '0',
                maxWidth: '540px',
                width: '100%',
                padding: '0',
              }}
            >
              <a href={url} target="_blank" rel="noreferrer">
                View this post on Instagram
              </a>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramSection;
