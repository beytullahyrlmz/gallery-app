import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// FOTOĞRAFLAR
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import photo3 from "./assets/photo3.jpg";
import photo4 from "./assets/photo4.jpg";
import photo5 from "./assets/photo5.jpg";
import photo6 from "./assets/photo6.jpg";

export default function App() {
  const images = [
    { original: photo1, thumbnail: photo1 },
    { original: photo2, thumbnail: photo2 },
    { original: photo3, thumbnail: photo3 },
    { original: photo4, thumbnail: photo4 },
    { original: photo5, thumbnail: photo5 },
    { original: photo6, thumbnail: photo6 },
  ];

  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [slideInterval, setSlideInterval] = useState(3000);
  const [thumbnailPosition, setThumbnailPosition] = useState("bottom");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("gallerySettings"));
    if (saved) {
      setShowThumbnails(saved.showThumbnails);
      setShowNav(saved.showNav);
      setSlideInterval(saved.slideInterval);
      setThumbnailPosition(saved.thumbnailPosition);
      setDarkMode(saved.darkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "gallerySettings",
      JSON.stringify({
        showThumbnails,
        showNav,
        slideInterval,
        thumbnailPosition,
        darkMode,
      })
    );
  }, [showThumbnails, showNav, slideInterval, thumbnailPosition, darkMode]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "0",
        backgroundColor: darkMode ? "#121212" : "#f0f0f0",
        color: darkMode ? "#ffffff" : "#000000",
        transition: "0.3s",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Interaktywny Pokaz Slajdów
      </h1>

      {/* AYARLAR */}
      <div
       style={{
         width: "100%",
         maxWidth: "1200px",
         margin: "0 auto 10px",
         padding: "10px",
         borderRadius: "10px",
         background: darkMode ? "#1e1e1e" : "#ffffff",
        }}

      >
        <label>
          <input
            type="checkbox"
            checked={showThumbnails}
            onChange={() => setShowThumbnails(!showThumbnails)}
          />{" "}
          Miniatury
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={showNav}
            onChange={() => setShowNav(!showNav)}
          />{" "}
          Strzałki nawigacyjne
        </label>
        <br />

        <label>
          Tryb ciemny{" "}
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
        <br />

        <label>
          Czas slajdu (ms):
          <input
            type="number"
            value={slideInterval}
            onChange={(e) => setSlideInterval(Number(e.target.value))}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </label>
        <br />

        <label>
          Pozycja miniatur:
          <select
            value={thumbnailPosition}
            onChange={(e) => setThumbnailPosition(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="bottom">Dół</option>
            <option value="left">Lewa</option>
            <option value="right">Prawa</option>
            <option value="top">Góra</option>
          </select>
        </label>
      </div>

      {/* GALERİ */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <ImageGallery
          items={images}
          showThumbnails={showThumbnails}
          showNav={showNav}
          autoPlay
          slideInterval={slideInterval}
          thumbnailPosition={thumbnailPosition}
          showFullscreenButton
          showPlayButton
        />
      </div>
    </div>
  );
}
