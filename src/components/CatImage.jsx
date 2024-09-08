import { useEffect, useState } from "react";
import styles from "./CatImage.module.css";
import axios from "axios";

function CatImage() {
  const [catImage, setCatImage] = useState("");
  const [loading, setLoading] = useState(true);
  async function fetchCatImage() {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      setCatImage(response.data[0].url);
    } catch (error) {
      console.error("Ошибка при получении изображения:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(function () {
    fetchCatImage();
  }, []);
  return (
    <div className={styles.catImageContainer}>
      <h1>Random Cat Image</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={catImage} alt="Random Cat" className={styles.catImage} />
      )}
      <button onClick={fetchCatImage} className={styles.catButton}>
        Get Another Cat
      </button>
    </div>
  );
}

export default CatImage;
