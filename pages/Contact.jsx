import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Надсилання...");

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("Ваше повідомлення успішно надіслано!");
        form.reset();
      } else {
        setStatus("Помилка при надсиланні.");
      }
    } catch (err) {
      setStatus("Сервер недоступний.");
    }
  }

  return (
    <div className="page">
      <h2>Зв’язатися з нами</h2>

      <p>
        Ми відкриті до співпраці, пропозицій та ваших історій про екологічні ініціативи.
      </p>

      {/* ФОРМА З БЕКЕНДОМ */}
      <form onSubmit={handleSubmit}>
        <label>
          Ваше ім’я:
          <input type="text" name="name" required />
        </label>

        <label>
          Email для відповіді:
          <input type="email" name="email" required />
        </label>

        <label>
          Ваше повідомлення:
          <textarea name="message" rows="5" required></textarea>
        </label>

        <button type="submit">Надіслати</button>
      </form>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      {/* Контактна інформація */}
      <p className="contact-info" style={{ marginTop: "20px" }}>
        <strong>Email:</strong> eco.news.ukraine@gmail.com<br />
        <strong>Instagram:</strong> <a>@eco.news.ukraine</a><br />
        <strong>Телефон:</strong> +38 (050) 000-00-00
      </p>
    </div>
  );
}


