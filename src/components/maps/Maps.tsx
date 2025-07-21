"use client";

export default function Maps() {
  return (
    <div className="w-full h-[450px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20463.91499986558!2d30.76876855!3d50.51195815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce3d1b5ed4df%3A0x5f2c1df263f01c9d!2z0JHRg9GA0LPQviwg0JHQtdGA0LXQvNCw0YDQug!5e0!3m2!1suk!2sua!4v1721540999603!5m2!1suk!2sua"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
