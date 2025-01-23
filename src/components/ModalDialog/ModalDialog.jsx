import './modal-dialog.css';

function ModalDialog({
  customStyles = [],
  title,
  isOpen,
  onClose,
  showCloseButton = false,
  showCTA = false,
  CTAlabel,
  onSubmitCTA,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-dialog-overlay">
      <div className={`modal-dialog ${customStyles.join(' ')}`}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          {showCloseButton && (
            <span>
              <button onClick={onClose}>X</button>
            </span>
          )}
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          {showCloseButton && <button onClick={onClose}>Close</button>}
          {showCTA && <button onClick={onSubmitCTA}>{CTAlabel}</button>}
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
