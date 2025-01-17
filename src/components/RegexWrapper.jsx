import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updatePattern,
  updateFlags,
  updateTestString,
  setResult,
  setError,
  setShareUrl,
  decodeRegexState,
} from '../redux/regexSlice';
import RegexInput from './RegexInput';
import RegexResult from './RegexResult';
import RegexTestString from './RegexTestString';
import RegexShare from './RegexShare';
import useDebounce from '../hooks/useDebounce';

export default function RegexWrapper() {
  const dispatch = useDispatch();
  const { pattern, flags, testString, result, error, shareUrl } = useSelector(
    (state) => state.regex
  );

  const debouncedPattern = useDebounce(pattern, 300);
  const debouncedTestString = useDebounce(testString, 300);

  useEffect(() => {
    dispatch(setShareUrl(null));
    const res = getResult(debouncedPattern, debouncedTestString, flags);
    dispatch(setResult(res));
  }, [debouncedPattern, debouncedTestString, flags]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const json = params.get('json');
    if (json) {
      dispatch(decodeRegexState(json));
    }
  }, []);

  function getMatches(regex, text, options) {
    try {
      dispatch(setError(null));
      const re = new RegExp(regex, options);
      const matches = text.matchAll(re);
      return [...matches];
    } catch (err) {
      dispatch(setError(err.message));
      return [];
    }
  }

  function getResult(regex, text, options) {
    const matches = getMatches(regex, text, options);
    const results = [];
    let index = 0;

    for (const match of matches) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      if (index < startIndex) {
        results.push({
          type: 'text',
          value: text.substring(index, startIndex),
        });
      }

      results.push({
        type: 'match',
        match: match[0],
        start: startIndex,
        end: endIndex - 1,
      });

      index = endIndex;
    }

    if (index < text.length) {
      results.push({ type: 'text', value: text.substring(index) });
    }

    return results;
  }

  return (
    <div className="regex-wrapper">
      <RegexInput
        pattern={pattern}
        flags={flags}
        error={error}
        onRegexUpdate={(val) => dispatch(updatePattern(val))}
        onFlagUpdate={(val) => dispatch(updateFlags(val))}
      />
      <RegexTestString
        testString={testString}
        onTestStringUpdate={(val) => dispatch(updateTestString(val))}
      />
      <RegexResult result={result} />
      <RegexShare
        shareUrl={shareUrl}
        pattern={pattern}
        testString={testString}
        flags={flags}
        origin={window.location.origin}
        onShare={(val) => dispatch(setShareUrl(val))}
      />
    </div>
  );
}
