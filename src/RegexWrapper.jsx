import { useState, useEffect } from 'react';
import RegexInput from './RegexInput';
import RegexResult from './RegexResult';
import RegexTestString from './RegexTestString';

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

      const info = {
        match: match[0],
        start: startIndex,
        end: endIndex - 1,
      };

      res.push(
        <span
          tabIndex="0"
          id={JSON.stringify(info)}
          style={{ backgroundColor: 'yellow', color: 'black' }}
        >
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
      <RegexTestString
        testString={testString}
        onTestStringUpdate={setTestString}
      />
      <RegexResult result={result} />
    </div>
  );
}
