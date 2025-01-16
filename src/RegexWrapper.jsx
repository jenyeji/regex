import { useState, useEffect } from 'react';

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

function FlagOption({ flags, flag, label, onFlagUpdate }) {
  return (
    <label>
      <input
        type="checkbox"
        name="flags"
        value={flag}
        checked={flags.includes(flag)}
        onChange={(e) => {
          const newFlags = new Set(flags);
          if (e.target.checked) {
            newFlags.add(flag);
          } else {
            newFlags.delete(flag);
          }
          onFlagUpdate(String([...newFlags].join('')));
        }}
      />{' '}
      {label}
    </label>
  );
}

function FlagsInput({ flags, onFlagUpdate }) {
  const FLAGS = [
    { label: 'global', flag: 'g' },
    { label: 'case insensitive', flag: 'i' },
    { label: 'single line', flag: 's' },
    { label: 'unicode', flag: 'u' },
    { label: 'sticky', flag: 'y' },
  ];
  return (
    <div className="dropdown">
      <button>Flags</button>
      <div className="dropdown-content">
        {FLAGS.map((flag) => {
          return (
            <div key={flag.label}>
              <FlagOption
                flags={flags}
                flag={flag.flag}
                label={flag.label}
                onFlagUpdate={onFlagUpdate}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TestString({ testString, onTestStringUpdate }) {
  return (
    <div className="regex-test-string">
      <textarea
        value={testString}
        onChange={(e) => onTestStringUpdate(e.target.value)}
      ></textarea>
    </div>
  );
}

function RegexResult({ result }) {
  if (!result || result.length === 0) return null;
  return (
    <div className="regex-result">
      {result.map((res, i) => (
        <span key={i}>{res}</span>
      ))}
    </div>
  );
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function RegexWrapper() {
  const [error, setError] = useState(null);
  const [pattern, setPattern] = useState('[A-Z]');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    `This is a simplified version of RegExr.com, developed by Jennifer Suratna. You can modify the text or regex pattern and select any combination of flags.`
  );
  const [result, setResult] = useState(null);

  const debouncedPattern = useDebounce(pattern, 300);
  const debouncedTestString = useDebounce(testString, 300);

  useEffect(() => {
    const res = getResult(debouncedPattern, debouncedTestString, flags);
    setResult(res);
  }, [debouncedPattern, debouncedTestString, flags]);

  function getMatches(regex, text, options) {
    try {
      setError(null);
      const re = new RegExp(regex, options);
      const matches = text.matchAll(re);
      return [...matches];
    } catch (err) {
      setError(err.message);
      return [];
    }
  }

  function getResult(regex, text, options) {
    const matches = getMatches(regex, text, options);
    let res = [];
    let index = 0;
    for (const match of matches) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;
      if (index < startIndex) {
        const prev = testString.substring(index, startIndex);
        res.push(prev);
      }
      res.push(
        <span style={{ backgroundColor: 'yellow', color: 'black' }}>
          {match[0]}
        </span>
      );
      index = endIndex;
    }
    if (index < text.length) {
      res.push(text.substring(index));
    }
    return res;
  }

  return (
    <div className="regex-wrapper">
      <RegexInput
        pattern={pattern}
        flags={flags}
        error={error}
        onRegexUpdate={setPattern}
        onFlagUpdate={setFlags}
      />
      <TestString testString={testString} onTestStringUpdate={setTestString} />
      <RegexResult result={result} />
    </div>
  );
}
