export default function TableHead() {
  return (
    <tr className="font-brand font-bold">
      <th className="border border-wf-grey p-2 bg-slate-800 text-left w-2/12">
        Setting Name
      </th>
      <th className="border border-wf-grey p-2 bg-slate-800 text-left w-4/12">
        Value
      </th>
      <th className="border border-wf-grey p-2 bg-slate-800 text-left w-2/12">
        Default
      </th>
      <th className="border border-wf-grey p-2 bg-slate-800 text-left w-4/12">
        Description
      </th>
      <th className="border border-wf-grey p-2 bg-slate-800 text-left w-1/12">
        Approved
      </th>
    </tr>
  );
}
