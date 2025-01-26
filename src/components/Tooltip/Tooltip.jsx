import './tooltip.css';

function Tooltip({ children, customClasses, id, role }) {
  return (
    <span
      className={`${customClasses.join(' ')} tooltiptext`}
      id={id}
      role={role}
    >
      {children}
    </span>
  );
}

export default Tooltip;
