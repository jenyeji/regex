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
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDesc"
        className={`modal-dialog ${customStyles.join(' ')}`}
      >
        <div className="modal-header">
          <h2 id="dialogTitle" className="modal-title">
            {title}
          </h2>
          {showCloseButton && <button onClick={onClose}>X</button>}
        </div>
        <div id="dialogDesc" className="modal-content">
          {children}
        </div>
        <div className="modal-footer">
          {showCloseButton && <button onClick={onClose}>Close</button>}
          {showCTA && <button onClick={onSubmitCTA}>{CTAlabel}</button>}
        </div>
      </div>
    </div>
  );
}

export default ModalDialog;
