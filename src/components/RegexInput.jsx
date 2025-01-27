import FlagsInput from './Flags';
import Tooltip from './Tooltip/Tooltip';

function RegexInput({ pattern, flags, error, onRegexUpdate, onFlagUpdate }) {
  return (
    <div className="regex-input">
      <label>
        Regex Pattern{' '}
        <span className="tooltip">
          <input
            type="text"
            name="regex-pattern"
            className={`regex-pattern ${error && 'error'}`}
            value={pattern}
            aria-describedby="input-error"
            aria-invalid={error ? 'true' : 'false'}
            onChange={(e) => {
              onRegexUpdate(e.target.value);
            }}
          />
          {error && (
            <Tooltip
              customClasses={['input-error']}
              id="input-error"
              role="alert"
            >
              ⚠️ Input Error: ${error}
            </Tooltip>
          )}
        </span>
      </label>
      <FlagsInput flags={flags} onFlagUpdate={onFlagUpdate} />
    </div>
  );
}

export default RegexInput;
