function Header({ onToggleMenu, menuOpen }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand">
          Glam Nails Studio
        </a>
        <button type="button" className="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={onToggleMenu}>
          ☰
        </button>
        <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
          <a href="#services" onClick={onToggleMenu}>Services</a>
          <a href="#gallery" onClick={onToggleMenu}>Gallery</a>
          <a href="#booking" onClick={onToggleMenu}>Booking</a>
          <a href="#about" onClick={onToggleMenu}>About</a>
          <a href="#contact" onClick={onToggleMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
