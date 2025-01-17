function RegexResult({ result }) {
  if (!result || result.length === 0) return null;
  return (
    <div className="regex-result" aria-label="Regex matches">
      {result.map((res, i) => (
        <span key={i}>{res}</span>
      ))}
    </div>
  );
}

export default RegexResult;
