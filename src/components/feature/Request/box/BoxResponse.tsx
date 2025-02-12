interface BoxResponseProps {
    response: string;
}

const BoxResponse: React.FC<BoxResponseProps> = ({ response }) => {
  return (
    <div>
      <code>{response}</code>
    </div>
  );
};

export default BoxResponse;