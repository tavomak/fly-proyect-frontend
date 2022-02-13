import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AlertMessage = ({ type, message, block }) => {
  let component;
  switch (type) {
    case 'danger':
      component = <img src="/emoti-sad.png" alt="sad" width="30" />;
      break;
    case 'success':
      component = <img src="/emoti-happy.png" alt="sad" width="30" />;
      break;
    case 'info':
      component = <img src="/emoti-celebrate.png" alt="sad" width="30" />;
      break;
    case 'warning':
      component = <img src="/alert-icon.png" alt="sad" width="30" />;
      break;
    default:
      component = null;
  }
  return (
    <div className={`alert-${type}--icon alert alert-${type} ${block ? '' : styles.width}`}>
      <ul className="d-flex align-items-center mb-0">
        <li className="me-3">
          { component }
        </li>
        <li>
          <p className="font-weight-bold mb-0" role="alert">
            {message}
          </p>
        </li>
      </ul>
    </div>
  );
};

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
