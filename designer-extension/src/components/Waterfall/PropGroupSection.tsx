import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import TableHead from './TableHead';

interface Props {
  children: React.ReactNode[];
  header: string;
  description: string;
  defaultOpen: boolean;
}
export default function PropGroupSection({
  children,
  header,
  description,
  defaultOpen,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <div
        className="  text-white font-bold text-3xl sticky top-[51px] w-full"
        onClick={() => setOpen(!open)}
      >
        <div className="p-2 col cursor-pointer border-2 border-slate-600 bg-slate-700">
          <div className="flex justify-between items-center z-50">
            <div>{header}</div>
            <div>
              {open ? (
                <FontAwesomeIcon icon={faChevronCircleUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronCircleDown} />
              )}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <tr>
          <td colSpan={5} className="p-2">
            <div className="text-sm italic">{description}</div>
          </td>
        </tr>
      )}
      {/* {open && <TableHead />} */}
      {open && children}
    </>
  );
}
