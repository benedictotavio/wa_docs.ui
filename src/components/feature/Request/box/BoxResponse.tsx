interface BoxResponseProps {
  response: string | object;
  statusCode?: number;
}

const BoxResponse: React.FC<BoxResponseProps> = ({ response, statusCode }) => {
  return (
    response && (
      <div>
        <div className="d-flex justify-content-end">
          <h5>
            Status: <span className="text-success">{statusCode}</span>
          </h5>
        </div>
        <code>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </code>
      </div>
    )
  );
};

export default BoxResponse;