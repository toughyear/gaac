import React from 'react';

export enum Status {
  info = 'info',
  success = 'success',
  failure = 'failure',
}

interface Props {
  text: string;
  status: Status;
}

const StatusBox: React.FC<Props> = ({ text, status }: Props) => {
  const color = {
    info: 'bg-indigo-100 border-indigo-400 text-indigo-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    failure: 'bg-red-100 border-red-400 text-red-700',
  };

  return (
    <div className={`rounded border-2 p-2 text-sm ${color[status]}`}>
      {text}
    </div>
  );
};

export default StatusBox;
