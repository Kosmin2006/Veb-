import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      const res = await fetch("http://localhost:3000/api/news");
      const data = await res.json();

      const withImages = data.map(n => ({
        ...n,
        image: `http://localhost:3000/${n.image}`
      }));

      const lastFour = withImages
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

      setNews(lastFour);
    }

    loadNews();
  }, []);

  return (
    <div className="home">
      <h2>Останні новини</h2>

      <div className="news-grid">
        {news.map(article => (
          <NewsCard
            key={article.id}
            article={article}
            compact={true}
          />
        ))}
      </div>
    </div>
  );
}







