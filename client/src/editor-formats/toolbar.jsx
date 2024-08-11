const CustomToolbar = () => {
  const ConfirmButton = () => <i className="fa-solid fa-check"></i>;

  return (
    <div className="custom-toolbar">
      <select
        className="ql-header"
        defaultValue=""
        onChange={(e) => e.persist()}
      >
        <option value="1" />
        <option value="2" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
      <button className="ql-link" />
      <button className="ql-confirm">
        <ConfirmButton />
      </button>
    </div>
  );
};

export default CustomToolbar;
