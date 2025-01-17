import { useState, useEffect } from 'react';
import RegexInput from './RegexInput';
import RegexResult from './RegexResult';
import RegexTestString from './RegexTestString';
import useDebounce from '../hooks/useDebounce';
import LZString from 'lz-string';

function encodeRegexState(pattern, testString, flags) {
  const data = {
    pattern,
    testString,
    flags,
  };
  const compressedData = LZString.compressToBase64(JSON.stringify(data));
  return encodeURIComponent(compressedData);
}

function decodeRegexState(encodedData) {
  const compressedData = decodeURIComponent(encodedData);
  const decompressedData = LZString.decompressFromBase64(compressedData);
  return JSON.parse(decompressedData);
}

export default function RegexWrapper() {
  const [error, setError] = useState(null);
  const [pattern, setPattern] = useState('[A-Z]');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    `This is a simplified version of RegExr.com, developed by Jennifer Suratna. You can modify the text or regex pattern and select any combination of flags.`
  );
  const [result, setResult] = useState(null);
  const [shareUrl, setShareUrl] = useState(null);

  const debouncedPattern = useDebounce(pattern, 300);
  const debouncedTestString = useDebounce(testString, 300);

  useEffect(() => {
    setShareUrl(null);
    const res = getResult(debouncedPattern, debouncedTestString, flags);
    setResult(res);
  }, [debouncedPattern, debouncedTestString, flags]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const json = params.get('json') || null;
    if (json) {
      const data = decodeRegexState(json);
      setPattern(data.pattern);
      setFlags(data.flags);
      setTestString(data.testString);
    }
  }, []);

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
      <div className="share">
        <button
          aria-label="Share this page"
          onClick={() => {
            const encodedData = encodeRegexState(pattern, testString, flags);
            setShareUrl(encodedData);
          }}
        >
          Share
        </button>
        {shareUrl && (
          <div className="share-url">
            Shared URL:{' '}
            <a
              href={`${window.location.origin}?json=${shareUrl}`}
            >{`${window.location.origin}?json=${shareUrl}`}</a>
          </div>
        )}
      </div>
    </div>
  );
}
