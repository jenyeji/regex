import FlagsInput from './Flags';

function RegexInput({ pattern, flags, error, onRegexUpdate, onFlagUpdate }) {
  return (
    <div className="regex-input">
      <label>
        {' '}
        Regex Pattern{' '}
        <input
          type="text"
          name="regex-pattern"
          value={pattern}
          style={{ color: error ? 'red' : 'black' }}
          onChange={(e) => {
            onRegexUpdate(e.target.value);
          }}
        />
        <div className="input-error">
          {error ? `Input Error: ${error}` : ''}
        </div>
      </label>
      <FlagsInput flags={flags} onFlagUpdate={onFlagUpdate} />
    </div>
  );
}

export default RegexInput;
