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
  return (
    <div
      className="regex-result"
      dangerouslySetInnerHTML={{ __html: result }}
    ></div>
  );
}

export default function RegexWrapper() {
  const [error, setError] = useState(null);
  const [pattern, setPattern] = useState('[A-Z]');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    `RegExr was created by gskinner.com.

Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & JavaScript flavors of RegEx are supported. Validate your expression with Tests mode.

The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community and view patterns you create or favorite in My Patterns.

Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.
`
  );
  const [result, setResult] = useState(null);

  useEffect(() => {
    const str = getResult(pattern, testString, flags);
    setResult(str);
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
    let res = '';
    let index = 0;
    for (const match of matches) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;
      if (index < startIndex) {
        const prev = testString.substring(index, startIndex);
        res += prev;
      }
      res += `<span style='color: black; background-color: yellow'>${match[0]}</span>`;
      index = endIndex;
    }
    if (index < text.length) {
      res += text.substring(index);
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
