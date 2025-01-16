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
          aria-label="Regex pattern"
          style={{ color: error ? 'red' : 'unset' }}
          onChange={(e) => {
            onRegexUpdate(e.target.value);
          }}
        />
      </label>
      <FlagsInput flags={flags} onFlagUpdate={onFlagUpdate} />
    </div>
  );
}

export default RegexInput;
