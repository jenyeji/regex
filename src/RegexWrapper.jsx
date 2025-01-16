import { useState, useEffect } from 'react';

function RegexInput({ pattern, flags, onRegexUpdate, onFlagUpdate }) {
  return (
    <div className="regex-input">
      <label>
        {' '}
        Regex Pattern{' '}
        <input
          type="text"
          name="regex-pattern"
          value={pattern}
          onChange={(e) => onRegexUpdate(e.target.value)}
        />
      </label>
      {/* <FlagsInput flags={flags} onFlagUpdate={onFlagUpdate} /> */}
    </div>
  );
}

function FlagsInput({ flags, onFlagUpdate }) {
  return (
    <>
      <label>
        Flags
        <select name="flags" id="flags" multiple>
          <option value="g">global</option>
          <option value="i">case insensitive</option>
          <option value="s">single line</option>
          <option value="u">unicode</option>
          <option value="y">sticky</option>
        </select>
      </label>
    </>
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

export default function RegexWrapper() {
  const [error, setError] = useState(null);
  const [pattern, setPattern] = useState('[A-Z]');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    `This is a stripped down version of RegExr.com, crafted by Jennifer Suratna following a humbling and insightful interview experience.

Currently, it supports only basic regex patterns with the global flag and a test string.
`
  );
  const [result, setResult] = useState(null);

  useEffect(() => {
    const res = getResult(pattern, testString, flags);
    setResult(res);
  }, [pattern, flags, testString]);

  function getMatches(regex, text, options) {
    try {
      const re = new RegExp(regex, options);
      const matches = text.matchAll(re);
      setError(null);
      return [...matches];
    } catch (err) {
      setError(err);
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
        onRegexUpdate={setPattern}
        onFlagUpdate={setFlags}
      />
      <TestString testString={testString} onTestStringUpdate={setTestString} />
      <RegexResult result={result} />
    </div>
  );
}
