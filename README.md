# **Regex App**

To run the app locally, run `npm install` and then `npm run dev`.

Link to prod: https://regex-seven-opal.vercel.app/

## **Overview**

The Regex App is a lightweight web application designed to simplify the use and testing of regular expressions (regex). Inspired by RegExr.com, the app allows users to test regex patterns against custom test strings with configurable flags. It also provides real-time match visualization and a shareable URL for collaboration.

---

## **Architecture**

### **1. High Level Architecture**

- **Components**:

  - **RegexInput**: Handles user input for the regex pattern and flags.
  - **RegexTestString**: Allows users to input the test string.
  - **RegexResult**: Displays the matches, highlighting them dynamically.
  - **RegexWrapper**: The main container component that orchestrates the logic and manages state.

- **State Management**:

  - **Redux Toolkit**: Used for global state management to handle the regex pattern, flags, test string, error messages, results, and shareable URLs.

- **Hooks**:

  - **Custom Hook** (`useDebounce`): Prevents excessive re-renders by debouncing input changes.

- **Dependencies**:
  - **LZ-String**: Used for compressing and encoding regex state into a shareable URL.

---

### **2. Core Features**

- **Regex Testing**: Users can test patterns against custom strings with support for regex flags.
- **Real-Time Visualization**: Matches are highlighted in the test string dynamically.
- **State Sharing**: Regex configurations (pattern, flags, test string) are encoded into a shareable URL for collaboration.
- **Error Handling**: Real-time feedback for invalid regex patterns.

---

### **3. Directory Structure**

```plaintext
src/
├── components/
├── redux/
├── hooks/
└── App.jsx

```
