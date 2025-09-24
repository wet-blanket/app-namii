export default function PersonalInformationForm({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const handleSubmit = () => {
    // validate + save...
    onComplete?.();
  };

  return (
    <div>
      Personal Information Form
      <button onClick={handleSubmit} className="mt-4 text-sm underline">
        Continue
      </button>
    </div>
  );
}
