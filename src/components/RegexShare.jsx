import LZString from 'lz-string';

function RegexShare({ shareUrl, pattern, flags, testString, origin, onShare }) {
  return (
    <div className="share">
      <button
        aria-label="Share this page"
        className="share-button"
        onClick={() => {
          const data = {
            pattern,
            flags,
            testString,
          };
          const compressedData = encodeURIComponent(
            LZString.compressToBase64(JSON.stringify(data))
          );
          if (compressedData.length >= 2048) {
            alert(
              'Your input is too long. Please reduce the length of your inputs (regex and/or test string) to share.'
            );
            return;
          }
          onShare(compressedData);
        }}
      >
        Share
      </button>
      {shareUrl && (
        <div className="share-url">
          This URL captures and preserves the current state of the Regex app:{' '}
          <a href={`${origin}?json=${shareUrl}`}>
            {`${origin}?json=${shareUrl}`}
          </a>
        </div>
      )}
    </div>
  );
}

export default RegexShare;
