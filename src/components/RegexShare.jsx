import LZString from 'lz-string';

function RegexShare({ shareUrl, pattern, flags, testString, origin, onShare }) {
  return (
    <div className="share">
      <button
        aria-label="Share this page"
        onClick={() => {
          const data = {
            pattern,
            flags,
            testString,
          };
          const compressedData = encodeURIComponent(
            LZString.compressToBase64(JSON.stringify(data))
          );
          onShare(compressedData);
        }}
      >
        Share
      </button>
      {shareUrl && (
        <div className="share-url">
          Shared URL:{' '}
          <a href={`${origin}?json=${shareUrl}`}>
            {`${origin}?json=${shareUrl}`}
          </a>
        </div>
      )}
    </div>
  );
}

export default RegexShare;
