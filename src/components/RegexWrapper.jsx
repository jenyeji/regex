import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';
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
import ModalDialog from './ModalDialog/ModalDialog';

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
        onRegexUpdate={(val) =>
          dispatch(updatePattern(DOMPurify.sanitize(val)))
        }
        onFlagUpdate={(val) => dispatch(updateFlags(DOMPurify.sanitize(val)))}
      />
      <RegexTestString
        testString={testString}
        onTestStringUpdate={(val) =>
          dispatch(updateTestString(DOMPurify.sanitize(val)))
        }
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
      <ModalDialog
        title="Share Your Link"
        customStyles={['share-url']}
        isOpen={shareUrl}
        showCloseButton={true}
        onClose={() => dispatch(setShareUrl(null))}
      >
        This URL captures and preserves the current state of the Regex app:{' '}
        <a href={`${origin}?json=${shareUrl}`} aria-label="Share Regex Link">
          {`${origin}?json=${shareUrl}`}
        </a>
      </ModalDialog>
    </div>
  );
}
