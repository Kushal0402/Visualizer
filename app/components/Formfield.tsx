type props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: string;
  setState: (value: string) => void;
};

const Formfield = ({
  type,
  title,
  state,
  setState,
  placeholder,
  isTextArea,
}: props) => {
  return (
    <div className="flexStart flex-col w-full gap-4 my-4">
      <label className="w-full text-black/80">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          required
          className="form_field-input"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          required
          className="form_field-input"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default Formfield;
