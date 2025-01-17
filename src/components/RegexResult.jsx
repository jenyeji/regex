function RegexResult({ result }) {
  if (!result || result.length === 0) return null;
  return (
    <div className="regex-result" aria-label="Regex matches">
      {result.map((item, index) => {
        if (item.type === 'text') {
          return <span key={index}>{item.value}</span>;
        }

        if (item.type === 'match') {
          return (
            <span
              key={index}
              tabIndex="0"
              id={JSON.stringify({
                match: item.match,
                start: item.start,
                end: item.end,
              })}
              style={{ backgroundColor: 'yellow', color: 'black' }}
            >
              {item.match}
            </span>
          );
        }

        return null; // Fallback for unexpected data
      })}
    </div>
  );
}

export default RegexResult;
