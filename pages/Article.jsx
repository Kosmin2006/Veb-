import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:3000/api/news/${id}`);
      const article = await res.json();

      if (article) {
        article.image = `http://localhost:3000/${article.image}`;
      }

      setNews(article);
    }

    load();
  }, [id]);

  if (!news) return <p>Завантаження...</p>;

  return (
    <div className="article-page">

      <button
        className="back-btn"
        onClick={() => {
          if (window.history.length > 2) navigate(-1);
          else navigate("/news");
        }}
      >
        ← Назад
      </button>

      <h1 className="article-title">{news.title}</h1>

      <p className="article-date">
        {new Date(news.date).toLocaleDateString("uk-UA")}
      </p>

      <div className="article-card">
        <img src={news.image} alt={news.title} />
        <div className="article-text">
          <p>{news.text}</p>
        </div>
      </div>

    </div>
  );
}






