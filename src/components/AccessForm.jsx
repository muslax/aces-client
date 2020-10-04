import React from 'react'
import PropTypes from 'prop-types'

const AccessForm = ({ access, errorMessage, onSubmit }) => (
  <div className="w-full">
    <div className="w-full max-w-xs mx-auto py-16">
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
        {/* <h3 className="text-xl">Masukkan kode</h3> */}
        <div className="mb-4">
          <label className="block text-md font-semibold mb-2" htmlFor="accessCode">
            Masukkan kode akses
          </label>
          <input type="text" id="accessCode" name="accessCode" required autoComplete="off"
          className="appearance-none border rounded w-full py-2 px-3 text-xl text-blue-700 leading-tight focus:outline-none focus:border-purple-500" />
        </div>
        {errorMessage && <p className="text-red-500 my-3">{errorMessage}</p>}
        <div className="flex items-center justify-between">
          <button className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Masuk
          </button>
        </div>

      </form>
      </div>
    </div>
)

export default AccessForm

AccessForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
