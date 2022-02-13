import { CSSTransition } from 'react-transition-group';
import closeX from 'assets/brand/closeX.svg';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Modal = ({
  title, subtitle, children, onClick, showModal, size,
}) => (
  <CSSTransition
    in={showModal}
    timeout={300}
    classNames="alert"
    unmountOnExit
  >
    <div className={styles.modal}>
      <div className={`${size === 'sm' ? styles.sm : styles.md} ${size === 'lg' ? styles.lg : ''} ${size === 'xl' ? styles.xl : ''}  bg-white shadow m-auto p-3 border-0`} style={{ borderRadius: '16px' }}>
        <div className="modal-header py-2 border-0 d-flex justify-content-between align-items-center mb-2 mt-2">
          <div>
            <h5 className={`${styles.modalTitle} display-font mb-1`}>{title}</h5>
            {subtitle && (
            <p className={`${styles.modalSubtitle}`}>{subtitle}</p>
            )}
          </div>
          <a href="!#" data-testid="printed-username" className={`p-0 ${styles.close}`} onClick={onClick}>
            <span aria-hidden="true" className="p-0">
              <img src={closeX} alt="Cuenta" width="16" />
            </span>
          </a>
        </div>
        <div className="modal-body p-0 px-3">
          {children}
        </div>
      </div>
    </div>
  </CSSTransition>
);

Modal.defaultProps = {
  title: '',
  subtitle: '',
  children: null,
  size: '',
  onClick: undefined,
};

Modal.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
  size: PropTypes.string,
};

export default Modal;
