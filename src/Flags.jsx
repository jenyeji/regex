function FlagOption({ flags, flag, label, onFlagUpdate }) {
  return (
    <label>
      <input
        type="checkbox"
        name="flags"
        value={flag}
        aria-label={`Flag ${label}`}
        tabIndex={0}
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
      <button aria-label="Flags">Flags</button>
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

export default FlagsInput;
