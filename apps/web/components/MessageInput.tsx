interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MessageInput({ value, onChange }: MessageInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste the patient message here..."
      className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm"
    />
  );
}

