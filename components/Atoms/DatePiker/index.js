import DatePiker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import PropTypes from 'prop-types';

registerLocale('es', es);

const DatePikerAtom = () => (
  <div>
    <li className="mx-2">
      <span>
        <DatePiker placeholderText="Selecciona una fecha" className="border-0 text-center" locale="es" />
      </span>
    </li>

  </div>
);
DatePikerAtom.defaultProps = {
  data: {},
};
DatePikerAtom.propTypes = {
  data: PropTypes.shape({
    options: {},
    series: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default DatePikerAtom;
