export default function Table({ tabledata }) {
  return (
    <>
      <table className="w-full text-sm text-left border-collapse border">
        <thead className="text-xs text-black uppercase">
          <tr>
            {tabledata.map((e) => (
              <th key={e} scope="col" className="border border-black px-2 py-3">
                {e.th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {tabledata.map((e) => (
              <td key={e} className="border border-black text-black px-2 py-3 break-all">
                {e.td}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}
