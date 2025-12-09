import { Link } from "react-router-dom";

export default function NewsCard({ article, compact }) {
  return (
    <div className={`news-card ${compact ? "horizontal" : "vertical"}`}>

      <div className="news-img-wrapper">
        <img
          src={article.image}
          alt={article.title}
        />
      </div>

      <div className="news-content">
        <h3>{article.title}</h3>

        <p className="date">
          {new Date(article.date).toLocaleDateString("uk-UA")}
        </p>

        {/*  Текст є в ОБОХ режимах */}
        <p className="news-text">
          {compact
            ? article.text.substring(0, 160) + "..."
            : article.text}
        </p>

        <Link className="read-more" to={`/article/${article.id}`}>
          Читати далі →
        </Link>
      </div>

    </div>
  );
}







