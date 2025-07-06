function HighLineText({
  text,
  highLight,
}: {
  text: string;
  highLight: string;
}) {
  if (!highLight.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highLight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highLight.toLowerCase() ? (
          <span key={index} className="font-bold">
            {part}
          </span>
        ) : (
         part
        )
      )}
    </span>
  );
}

export default HighLineText;