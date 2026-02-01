const DatePicker = ({ selectedDate, max, onChange }) => (
  <div className="mt-6">
    <label className="text-sm font-medium text-gray-700">
      View tasks for date:
    </label>
    <input
      type="date"
      value={selectedDate}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      className="ml-3 border px-2 py-1 rounded"
    />
  </div>
);

export default DatePicker;
