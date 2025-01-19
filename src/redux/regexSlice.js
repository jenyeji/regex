import { createSlice } from '@reduxjs/toolkit';
import LZString from 'lz-string';

const initialState = {
  pattern: '[A-Z]',
  flags: 'g',
  testString: `This is a simplified version of RegExr.com, developed by Jennifer Suratna. You can modify the text or regex pattern and select any combination of flags.

Examples:

Email matching:
- pattern: [a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
- flags: global

test@gmail.com

Phone number:
- pattern: ^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*$
- flags: global, multiline

123-456-7890`,
  result: null,
  error: null,
  shareUrl: null,
};

const regexSlice = createSlice({
  name: 'regex',
  initialState,
  reducers: {
    updatePattern(state, action) {
      state.pattern = action.payload;
    },
    updateFlags(state, action) {
      state.flags = action.payload;
    },
    updateTestString(state, action) {
      state.testString = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setShareUrl(state, action) {
      state.shareUrl = action.payload;
    },
    decodeRegexState(state, action) {
      const data = JSON.parse(
        LZString.decompressFromBase64(decodeURIComponent(action.payload))
      );
      state.pattern = data.pattern;
      state.flags = data.flags;
      state.testString = data.testString;
    },
  },
});

export const {
  updatePattern,
  updateFlags,
  updateTestString,
  setResult,
  setError,
  setShareUrl,
  decodeRegexState,
} = regexSlice.actions;

export default regexSlice.reducer;
