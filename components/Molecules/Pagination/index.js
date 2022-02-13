import PropTypes from 'prop-types';

const Pagination = ({
  pageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageCount,
  pageOptions,
  preGlobalFilteredRows,
  pageSize,
  setPageSize,
}) => (
  <div className="container-fluid px-0">
    <div className="row justify-content-between align-items-center">
      <div className="col-md-6">
        <ul className="d-flex align-items-center">
          <li className="me-4">
            {pageSize && (
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                className="form-select ps-4"
                style={{
                  border: 'none',
                  boxShadow: '0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)',
                  borderRadius: 15,
                  height: 48,
                }}
              >
                {[10, 20, 30, 40, 50].map((itemPageSize) => (
                  <option key={itemPageSize} value={itemPageSize}>
                    Item por pág:
                    {' '}
                    {itemPageSize}
                  </option>
                ))}
              </select>
            )}
          </li>
          <li>
            {preGlobalFilteredRows && pageSize && (
              <p className="mb-0">
                {`${pageSize} de ${
                  preGlobalFilteredRows.length
                }`}
              </p>
            )}
          </li>
        </ul>
      </div>
      <div className="col-md-6 col-xl-4 d-flex justify-content-end">
        {(canNextPage || canPreviousPage) && pageCount > 1 && (
        <div
          className="bg-white d-flex align-items-center justify-content-center mb-4 shadow px-4"
          style={{
            borderRadius: '15px', height: '58px', boxShadow: '0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)',
          }}
        >
          {pageIndex > 2 && (
            <div style={{ width: 43 }}>
              <button
                className="btn btn-pagination--inactive fs-6"
                type="button"
                onClick={() => gotoPage(0)}
              >
                {'<'}
              </button>
            </div>
          )}

          {pageIndex > 1 && (
          <div style={{ width: 43 }}>
            <button
              className="btn btn-pagination--inactive fs-6"
              type="button"
              onClick={() => gotoPage(pageIndex - 2)}
            >
              {pageIndex - 1}
            </button>
          </div>
          )}

          {canPreviousPage && (
          <div style={{ width: 43 }}>
            <button
              className="btn btn-pagination--inactive fs-6"
              type="button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {canPreviousPage && pageIndex}
            </button>
          </div>
          )}

          <button className="btn btn-secondary btn-pagination" type="button" style={{ borderRadius: 5 }}>
            {pageIndex + 1}
          </button>

          {canNextPage && (
          <div style={{ width: 43 }}>
            <button
              className="btn btn-pagination--inactive fs-6"
              type="button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {canNextPage && pageIndex + 2}
            </button>
          </div>
          )}

          {pageIndex + 2 < pageOptions.length && (
          <div style={{ width: 43 }}>
            <button
              className="btn btn-pagination--inactive fs-6"
              type="button"
              onClick={() => gotoPage(pageIndex + 2)}
              disabled={!canNextPage}
            >
              {pageIndex + 3}
            </button>
          </div>
          )}

          {pageIndex + 3 < pageOptions.length && (
          <div style={{ width: 43 }}>
            <button
              className="btn btn-pagination--inactive fs-6"
              type="button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              &gt;
            </button>
          </div>
          )}
        </div>
        )}
      </div>
    </div>
  </div>
);

Pagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  gotoPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default Pagination;
