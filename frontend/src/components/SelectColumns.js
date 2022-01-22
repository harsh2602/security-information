import React from 'react';
import useAppContext from '../hooks/useAppContext';

/**
 * assuming the columns are static,
 * else would have to manage it in the AppContext
 * via the response from the api
 */
const allColumns = [
  'id',
  'type',
  'severity',
  'kill_chain_phase',
  'timestamp',
  'attacker.id',
  'attacker.ip',
  'attacker.name',
  'attacker.port',
  'decoy.id',
  'decoy.name',
  'decoy.group',
  'decoy.ip',
  'decoy.port',
  'decoy.type',
];

const SelectColumns = () => {
  const { columns, dispatch } = useAppContext();

  const renderTable = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((o) => o.selected)
      .map((o) => o.value);

    dispatch({
      type: 'OPTION_CLICKED',
      payload: {
        columns: selectedOptions,
      },
    });
  };

  return (
    <form>
      <div>
        <div>
          <label htmlFor='columns'>
            Select/Unselect columns to display in the table(for multiple options
            use Cmd + P or Ctrl + P):
          </label>
        </div>
        <select name='columns' value={columns} multiple onChange={renderTable}>
          {allColumns.map((column, index) => (
            <option key={`${column}_${index}`}>{column}</option>
          ))}
        </select>
      </div>
    </form>
  );
};
export default SelectColumns;
