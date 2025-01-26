import FlagsInput from './Flags';

function RegexInput({ pattern, flags, error, onRegexUpdate, onFlagUpdate }) {
  return (
    <div className="regex-input">
      <label>
        {' '}
        Regex Pattern{' '}
        <span className="tooltip">
          <input
            type="text"
            name="regex-pattern"
            className="tooltip"
            value={pattern}
            aria-describedby="input-error"
            aria-invalid={error ? 'true' : 'false'}
            style={{ color: error ? 'red' : 'black' }}
            onChange={(e) => {
              onRegexUpdate(e.target.value);
            }}
          />
          {error && (
            <span
              className="input-error tooltiptext"
              id="input-error"
              role="alert"
            >
              ⚠️ Input Error: ${error}
            </span>
          )}
        </span>
      </label>
      <FlagsInput flags={flags} onFlagUpdate={onFlagUpdate} />
    </div>
  );
}

export default RegexInput;
